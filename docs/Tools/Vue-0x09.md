# Vue Router 实现剖析之三

在[前一篇文章](https://www.yuque.com/littlelane/vue/acpxte)中，我们讲到了 Vue Router 核心概念之一 —— history。history 作为 Vue Router 基础之一，实现了一些对外的 api 接口，算是路由管理的入口了，也对浏览器历史记录做了管理。下面我们就来说说 Vue Router 里面另外一个核心的概念 —— matcher 路由匹配。

<a name="F017M"></a>
## matcher 相关数据结构
第一个系列的文章，我们对 Vue Router 的注册与初始化进行了深入的了解。在介绍 VueRouter 类实现的时候，我们有提到在构造函数中会调用 createMatcher 方法创建 match 匹配函数，这个方法的实现在 src/create-matcher.js 文件。在分析具体代码实现之前，我们先来说一下相关的数据类型，以便大家理解实现逻辑起来更加方便：

```typescript
export type Matcher = {
  match: (raw: RawLocation, current?: Route, redirectedFrom?: Location) => Route;
  addRoutes: (routes: Array<RouteConfig>) => void;
};
```

这里定义了一个名为 Matcher 的数据类型，Matcher 是 Object 类型，包含 match 和 addRoutes 两个属性方法，其中 match 方法会根据传入的 VueRouter 中定义的 Location 和当前的路由历史信息进行匹配得到当前的路由信息对象 route。Location 和 Route 的数据结构是在 flow/declarations.js 中定义的：

```typescript
// Location
declare type Location = {
  _normalized?: boolean;
  name?: string;
  path?: string;
  hash?: string;
  query?: Dictionary<string>;
  params?: Dictionary<string>;
  append?: boolean;
  replace?: boolean;
}
```

Location 数据结构和浏览器提供的 window.location 部分结构有点类似，它们都是对 url 的结构化描述。举个例子：/abc?foo=bar&baz=qux#hello，它的 path 是 /abc，query 是 {foo:'bar',baz:'qux'}。

```typescript
// Route
declare type Route = {
  path: string;
  name: ?string;
  hash: string;
  query: Dictionary<string>;
  params: Dictionary<string>;
  fullPath: string;
  matched: Array<RouteRecord>;
  redirectedFrom?: string;
  meta?: any;
}
```

Route 表示的是路由中的一条线路，它除了描述了类似 Loctaion 的 path、query、hash 这些概念，还有 matched 表示匹配到的所有的 RouteRecord。

addRoutes 最后会变成 VueRouter 提供给外部使用的一个动态配置的路由规则的接口，它主要接受符合 routes 选项要求的数组，RouteConfig 的数据结构如下：

```typescript
declare type RouteConfig = {
  path: string;
  name?: string;
  component?: any;
  components?: Dictionary<any>;
  redirect?: RedirectOption;
  alias?: string | Array<string>;
  children?: Array<RouteConfig>;
  beforeEnter?: NavigationGuard;
  meta?: any;
  props?: boolean | Object | Function;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
}
```

是不是有种似曾相识的感觉，对它就是我们配置的路由数据，只不过在这些配置数据的基础上做了一些处理：

```javascript
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

<a name="4mmCh"></a>
## createMatcher
在了解完了 Location 和 Route 后，我们来看一下 matcher 的创建过程：

```javascript
export function createMatcher (
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  const { pathList, pathMap, nameMap } = createRouteMap(routes)
  // 省略大量逻辑
}
```

createMatcher 接收两个参数：一个是 routes，用户定义的路由配置；一个是 router，它是 new VueRouter() 时返回的实例。再来看一下我们之前举的例子中的配置：

```jsx
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

<a name="RUOx2"></a>
## createRouteMap
createMatcher 函数中其他的逻辑可以先不用看，该方法首先会执行 createRouteMap 逻辑创建路由映射表。createRouteMap 定义在 src/create-route-map.js 文件中：

```javascript
export function createRouteMap (
  routes: Array<RouteConfig>,
  oldPathList?: Array<string>,
  oldPathMap?: Dictionary<RouteRecord>,
  oldNameMap?: Dictionary<RouteRecord>
): {
  pathList: Array<string>;
  pathMap: Dictionary<RouteRecord>;
  nameMap: Dictionary<RouteRecord>;
} {
  // the path list is used to control path matching priority
  const pathList: Array<string> = oldPathList || []
  // $flow-disable-line
  const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
  // $flow-disable-line
  const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)
  
  routes.forEach(route => {
    addRouteRecord(pathList, pathMap, nameMap, route)
  })

  // ensure wildcard routes are always at the end
  for (let i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0])
      l--
      i--
    }
  }
  return {
    pathList,
    pathMap,
    nameMap
  }
}
```

createRouteMap 函数的目标是把用户的路由配置转换成一张路由映射表，它包含 3 个部分：pathList 存储所有的 path；pathMap 表示一个 path 到 RouteRecord 的映射关系；nameMap 表示 name 到 RouteRecord 的映射关系。那么 RouteRecord 到底是什么，先来看一下它的数据结构 flow/declarations.js：

```typescript
declare type RouteRecord = {
  path: string;
  regex: RouteRegExp;
  components: Dictionary<any>;
  instances: Dictionary<any>;
  name: ?string;
  parent: ?RouteRecord;
  redirect: ?RedirectOption;
  matchAs: ?string;
  beforeEnter: ?NavigationGuard;
  meta: any;
  props: boolean | Object | Function | Dictionary<boolean | Object | Function>;
}
```

RouteRecord 包含很多关于路由信息的数据，path 是规范化后的路径，它会根据 parent 的 path 做计算；regex 是一个正则表达式的扩展，它利用了 path-to-regexp 这个工具库，把 path 解析成一个正则表达式的扩展，举个例子：

```javascript
var keys = []
var re = pathToRegexp('/foo/:bar', keys)
// re = /^\/foo\/([^\/]+?)\/?$/i
// keys = [{ name: 'bar', prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '[^\\/]+?' }]
```

components 是一个对象，通常我们在配置中写的 component 实际上会被转换成 {components: route.component}；instances 表示组件的实例，是一个对象类型；parent 表示父的 RouteRecord，因为我们的路由配置经常会配置子路由，所以整个 RouteRecord 也就是一个树型结构。

回到 createRouteMap 函数逻辑，会通过遍历传入的 routes 路由配置数据，调用 addRouteRecord 方法获取所有的路由路径数组 pathList、path 路由映射表 pathMap、name 别名路由映射表 nameMap，接着通过一个循环逻辑将 * 通配符路由配置数据处于 pathList 的尾部，实现最后匹配。最后返回 pathList、pathMap、nameMap 组成的对象。

<a name="ChMEn"></a>
## addRouteRecord
路由映射表的创建是通过遍历 routes 为每一个 route 执行 addRouteRecord 方法生成的，来看一下它的定义：

```javascript
function addRouteRecord (
  pathList: Array<string>,
  pathMap: Dictionary<RouteRecord>,
  nameMap: Dictionary<RouteRecord>,
  route: RouteConfig,
  parent?: RouteRecord,
  matchAs?: string
) {
  const { path, name } = route
  const pathToRegexpOptions: PathToRegexpOptions = route.pathToRegexpOptions || {}
  const normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  )

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive
  }
    
  const record: RouteRecord = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  }
	// 有嵌套子路由就递归增加记录
  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(child => /^\/?$/.test(child.path))) {
        warn(
          false,
          `Named Route '${route.name}' has a default child route. ` +
          `When navigating to this named route (:to="{name: '${route.name}'"), ` +
          `the default child route will not be rendered. Remove the name from ` +
          `this route and use the name of the default child route for named ` +
          `links instead.`
        )
      }
    }
    route.children.forEach(child => {
      const childMatchAs = matchAs
        ? cleanPath(`${matchAs}/${child.path}`)
        : undefined
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
    })
  }
	// 处理别名 alias 逻辑，增加对应的记录
  if (route.alias !== undefined) {
    const aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias]

    aliases.forEach(alias => {
      const aliasRoute = {
        path: alias,
        children: route.children
      }
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/'
      )
    })
  }
	// 更新 pathList 和 pathMap
  if (!pathMap[record.path]) {
    pathList.push(record.path)
    pathMap[record.path] = record
  }
	// 更新 nameMap，并去重
  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      // 省略逻辑
    }
  }
}
```

每次调用 addRouteRecord 方法都会生成一个路由记录的对象，和我们之前说的一样，对象里面的 path 属性值会根据 parent 的 path 和当前路由对象的 path 调用 normalizePath 计算得到：

```javascript
function normalizePath (path: string, parent?: RouteRecord, strict?: boolean): string {
  if (!strict) path = path.replace(/\/$/, '')
  if (path[0] === '/') return path
  if (parent == null) return path
  return cleanPath(`${parent.path}/${path}`)
}
```

regex 属性是一个正则表达式的扩展，它利用了 path-to-regexp 这个工具库，把 path 解析成一个正则表达式的扩展：

```javascript
function compileRouteRegex (path: string, pathToRegexpOptions: PathToRegexpOptions): RouteRegExp {
  const regex = Regexp(path, [], pathToRegexpOptions)
  if (process.env.NODE_ENV !== 'production') {
    const keys: any = Object.create(null)
    regex.keys.forEach(key => {
      warn(!keys[key.name], `Duplicate param keys in route with path: "${path}"`)
      keys[key.name] = true
    })
  }
  return regex
}
```

如果路由配置中有配置 children，也就是嵌套子路由，那么就递归执行 addRouteRecord 方法并把当前的 record 作为 parent 传入，通过深度遍历拿到 route 的完整记录。如果我们在路由配置中配置了 path 属性就往 pathList 和 pathMap 各添加一条记录，如果是我们配置了 name 属性（也就是命名路由）就往 nameMap 添加一条记录。由于 pathList、pathMap、nameMap 都是引用类型，所以在遍历整个 routes 过程中去执行 addRouteRecord 方法，会不断给他们添加数据。当整个 createRouteMap 方法都执行完后，得到的就是 pathList、pathMap 和 nameMap。其中 pathList 记录了路由配置中的所有 path 属性值，而 pathMap 和 nameMap 的作用都是为了通过 path 和 name 快速查到对应的 RouteRecord。

<a name="4CSiu"></a>
## 再看 createMatcher
<a name="a9wnx"></a>
### addRoutes

```javascript
export function createMatcher (
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {	
  // .... 省略创建路由映射表的逻辑 ....
  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
  }
  return {
    match,
    addRoutes
  }
}
```

再回到 createMather 函数，该函数在最后返回了一个由 match 和 addRoutes 方法组成的对象供外界使用！其中 addRoutes 方法的作用是动态添加路由配置，因为在有些开发场景中不能提前把路由写死，需要根据一些条件动态添加路由，addRoutes 的方法通过调用 createRouteMap 并传入新的 routes 配置即可动态添加路由配；

<a name="UPxOm"></a>
### match

```javascript
function match (
raw: RawLocation,
 currentRoute?: Route,
 redirectedFrom?: Location
): Route {
  const location = normalizeLocation(raw, currentRoute, false, router)
  const { name } = location

  // 命名路由处理
  if (name) {
    const record = nameMap[name]
    if (!record) return _createRoute(null, location)
    const paramNames = record.regex.keys
    .filter(key => !key.optional)
    .map(key => key.name)

    if (typeof location.params !== 'object') {
      location.params = {}
    }

    if (currentRoute && typeof currentRoute.params === 'object') {
      for (const key in currentRoute.params) {
        if (!(key in location.params) && paramNames.indexOf(key) > -1) {
          location.params[key] = currentRoute.params[key]
        }
      }
    }

    if (record) {
      location.path = fillParams(record.path, location.params, `named route "${name}"`)
      return _createRoute(record, location, redirectedFrom)
    }
  } else if (location.path) {
    location.params = {}
    for (let i = 0; i < pathList.length; i++) {
      const path = pathList[i]
      const record = pathMap[path]
      if (matchRoute(record.regex, location.path, location.params)) {
        return _createRoute(record, location, redirectedFrom)
      }
    }
  }
  return _createRoute(null, location)
}
```

match 方法接收三个参数：raw 是 RawLocation 类型，它可以是一个 url 字符串，也可以是一个 Location 对象，currentRoute 是 Route 类型，它表示当前的路径，redirectedFrom 和重定向相关。match 方法返回的是一个路径，它的作用是根据传入的 raw 和当前的路径 currentRoute 计算出一个新的路径并返回。

<a name="q8JKL"></a>
### normalizeLocation
在 match 方法中，首先会执行 normalizeLocation 方法，它被定义在 src/util/location.js 文件中：

```javascript
export function normalizeLocation (
  raw: RawLocation,
  current: ?Route,
  append: ?boolean,
  router: ?VueRouter
): Location {
  let next: Location = typeof raw === 'string' ? { path: raw } : raw
  if (next.name || next._normalized) {
    return next
  }
  if (!next.path && next.params && current) {
    next = assign({}, next)
    next._normalized = true
    const params: any = assign(assign({}, current.params), next.params)
    if (current.name) {
      next.name = current.name
      next.params = params
    } else if (current.matched.length) {
      const rawPath = current.matched[current.matched.length - 1].path
      next.path = fillParams(rawPath, params, `path ${current.path}`)
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, `relative params navigation requires a current route.`)
    }
    return next
  }
  const parsedPath = parsePath(next.path || '')
  const basePath = (current && current.path) || '/'
  const path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath
  const query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  )
  let hash = next.hash || parsedPath.hash
  if (hash && hash.charAt(0) !== '#') {
    hash = `#${hash}`
  }
  return {
    _normalized: true,
    path,
    query,
    hash
  }
}
```

normalizeLocation 方法的作用是根据 raw 和 current 计算出新的 location。它主要处理了 raw 的两种情况：一种是有 params 且没有 path，另一种是有 path 的。对于第一种情况，如果 current 有 name，则计算出的 location 也有 name。计算出新的 location 后，对 location 的 name 和 path 的两种情况做了处理。

- name：有 name 时就根据 nameMap 匹配到 record，它是一个 RouterRecord 对象，如果 record 不存在，则匹配失败，返回一个空路径，然后拿到 record 对应的 paramNames，再对比 currentRoute 中的 params，把交集部分的 params 添加到 location 中，然后在通过 fillParams 方法根据 record.path 和 location.path 计算出 location.path，最后调用 _createRoute(record, location, redirectedFrom) 去生成一条新路径。

- path：通过 name 我们可以很快的找到 record，但是通过 path 并不能，因为我们计算后的 location.path 是一个真实路径，而 record 中的 path 可能会有 param，因此需要对所有的 pathList 做顺序遍历， 然后通过 matchRoute 方法根据 record.regex、location.path、location.params 进行匹配，如果匹配到则也通过 _createRoute(record, location, redirectedFrom) 去生成一条新路径。因为是顺序遍历，所以我们书写路由配置要注意路径的顺序，因为写在前面的会优先尝试匹配。

<a name="BHYMW"></a>
### _createRoute
来看一下 _createRoute 的具体实现：

```javascript
function _createRoute (
  record: ?RouteRecord,
  location: Location,
  redirectedFrom?: Location
): Route {
  // 重定向
  if (record && record.redirect) {
    return redirect(record, redirectedFrom || location)
  }

  // 别名逻辑
  if (record && record.matchAs) {
    return alias(record, location, record.matchAs)
  }

  // 创建路由对象
  return createRoute(record, location, redirectedFrom, router)
}
```

_createRoute 会先处理 record.redirect 重定向的逻辑，然后处理 record.matchAs 别名逻辑，最终会调用 createRoute 方法创建路由对象。

<a name="ZwCix"></a>
#### record.redirect
我们先来看一下 record.redirect 重定向逻辑处理：

```javascript
function redirect (
  record: RouteRecord,
  location: Location
): Route {
  const originalRedirect = record.redirect
  let redirect = typeof originalRedirect === 'function'
  ? originalRedirect(createRoute(record, location, null, router))
  : originalRedirect

  if (typeof redirect === 'string') {
    redirect = { path: redirect }
  }

  if (!redirect || typeof redirect !== 'object') {
    return _createRoute(null, location)
  }

  const re: Object = redirect
  const { name, path } = re
  let { query, hash, params } = location
  query = re.hasOwnProperty('query') ? re.query : query
  hash = re.hasOwnProperty('hash') ? re.hash : hash
  params = re.hasOwnProperty('params') ? re.params : params

  if (name) {
    // 省略逻辑
  } else if (path) {
    // 省略逻辑
  } else {
    return _createRoute(null, location)
  }
}
```

在前面关于 RouteConfig 类型定义的分析中，我们发现 redirect 的类型可以是 string、Location 或者是一个返回 Location 对象的函数。于是这里的逻辑针对 redirect 类型做了不同的处理：如果是函数就直接执行，如果是 string 就转换成 { path: redirect }，如果根本不存在就调用 _createRoute 创建一个路由。接着如果重定向路由对象中配置了 name 属性，就在直接生成的路由映射表 nameMap 中查找对应的 RouteRecord。

```javascript
// resolved named direct
const targetRecord = nameMap[name]
if (process.env.NODE_ENV !== 'production') {
  assert(targetRecord, `redirect failed: named route "${name}" not found.`)
}
return match({
  _normalized: true,
  name,
  query,
  hash,
  params
}, undefined, location)
```

然后执行在 VueRouter 类中声明的 match 方法：

```javascript
match (
  raw: RawLocation,
  current?: Route,
  redirectedFrom?: Location
): Route {
  return this.matcher.match(raw, current, redirectedFrom)
}
```

match 方法最终会执行通过 createMatcher 创建的匹配器的 match 方法，也就是我们之前分析的 match 函数逻辑。

如果是重定向路由对象中没有配置 name 属性，而是配置了 path 属性，就会执行下面这套逻辑：

```javascript
// 1. resolve relative redirect
const rawPath = resolveRecordPath(path, record)
// 2. resolve params
const resolvedPath = fillParams(rawPath, params, `redirect route with path "${rawPath}"`)
// 3. rematch with existing query and hash
return match({
  _normalized: true,
  path: resolvedPath,
  query,
  hash
}, undefined, location)
```

首先执行 resolveRecordPath 根据重定向的路径获取对应的绝对路径，resolveRecordPath 最终会执行 resolvePath 方法，这个方法定义在 src/util/path.js：

```javascript
export function resolvePath (
  relative: string,
  base: string,
  append?: boolean
): string {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }
  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}
```

这个方法会根据传入的重定向路由配置的 path 路径和基础路径 base 计算出最终的绝对路径，比如：

```javascript
resolvePath('../a/b', '/')	
// "/a/b/"

resolvePath('../a/b', '/', true)	
// "/a/b"
```

然后执行 fillParams 方法处理重定向的 params 参数，这个方法定义在 src/util/params.js：

```javascript
export function fillParams (
  path: string,
  params: ?Object,
  routeMsg: string
): string {
  params = params || {}
  try {
    const filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = Regexp.compile(path))

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) params[0] = params.pathMatch

    return filler(params, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, `missing param for ${routeMsg}: ${e.message}`)
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0]
  }
}
```

fillParams 方法根据 record.path 和 location.path 计算出 location.path。执行完 fillParams 方法后，会和上面的逻辑一样执行匹配器的 match 方法。最后，如果重定向路由既没有配置 path 路径也没有配置 name 属性，就会调用 _createRoute 创建一个空的路由路径。

<a name="uULXZ"></a>
#### record.matchAs
再来看一下 record.matchAs 别名逻辑处理：

```javascript
function alias (
  record: RouteRecord,
  location: Location,
  matchAs: string
): Route {
  const aliasedPath = fillParams(matchAs, location.params, `aliased route with path "${matchAs}"`)
  const aliasedMatch = match({
    _normalized: true,
    path: aliasedPath
  })
  if (aliasedMatch) {
    const matched = aliasedMatch.matched
    const aliasedRecord = matched[matched.length - 1]
    location.params = aliasedMatch.params
    return _createRoute(aliasedRecord, location)
  }
  return _createRoute(null, location)
}
```

别名处理逻辑其实和上面的重定向处理逻辑很相似，这里会根据配置的别名信息去获取目标路由对象，然后调用 _createRoute 生成对应的路由路径。

<a name="uqi03"></a>
#### createRoute
 _createRoute 方法最终会调用 createRoute 创建路由对象，这部分的代码定义在 src/util/route.js：

```javascript
export function createRoute (
  record: ?RouteRecord,
  location: Location,
  redirectedFrom?: ?Location,
  router?: VueRouter
): Route {
  const stringifyQuery = router && router.options.stringifyQuery
  let query: any = location.query || {}
  try {
    query = clone(query)
  } catch (e) {}
  const route: Route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery),
    matched: record ? formatMatch(record) : []
  }
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery)
  }
  return Object.freeze(route)
}
```

createRoute 方法会根据 record 和 location 创建一条 Route 路径，我们之前也介绍过它的数据结构。在 Vue Router 中，所有的 Route 最终都会通过 createRoute 函数创建，并且最后它是不可以被外部修改（Object.freeze）的。Route 对象中有一个非常重要的属性 matched，它通过 formatMatch(record) 计算而来：

<a name="juKXO"></a>
#### formatMatch

```javascript
function formatMatch (record: ?RouteRecord): Array<RouteRecord> {
  const res = []
  while (record) {
    res.unshift(record)
    record = record.parent
  }
  return res
}
```

formatMatch 方法通过 record 循环向上遍历找 parent，直到找到最外层，并把所有的 record 都 push 到一个数组中，最终返回由 record 组成的数组，它记录了一条线路上的所有 record。matched 属性为之后渲染组件提供了依据。

处理完这些逻辑后，createMatcher 最后会返回 match 和 addRoutes 组成的对象供后面的逻辑使用。

<a name="oklUG"></a>
## 总结
那么到此，matcher 相关的主流程的分析就结束了，我们了解了 Location、Route、RouteRecord 等概念。并通过 matcher 的 match 方法，我们会找到匹配的路径 Route，这个对 Route 的切换，组件的渲染都有非常重要的指导意义。下一节我们会讲到 transitionTo 方法，看一看路径的切换都做了哪些事情。

