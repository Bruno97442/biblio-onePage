export class Router {

    static _instance

    // url

    constructor(routes) {
        this.routes = routes
    }

    static setInstance(routes) {
        this._instance = new Router(routes)
    }

    getUrl() {

        return window.location.pathname
    }

    getRoute(name) {
        const tName = name.replace(/[0-9]+/, '{:id}')
        const route = this.routes.find(r => r.name.match(tName))
        let sRoute
        // console.trace(route, name, this.routes.find(r => r.name === tName))
        // if (route.name.match(/[\w]+-/)) route.name = name
        if (route.name.match(/[\w]+-/)) sRoute = { ...route, name }
        return sRoute ?? route ?? this.routes[0]
        // return route ?? this.getRoute('404')
    }
    getPath(name) {
        const route = this.routes.find(r => r.name.match(name))
        if (route) {
            return route.path
        }
        alert('error : 404')
    }

    /**
     * retourne la route selon l'url
     * 
     */
    match() {
        let url = this.getUrl(),
            pathname = location.search === ""
                ? url.match(/[a-zA-Z]+$/)
                    ? url.match(/[a-zA-Z]+$/)[0]
                    : '404'
                : location.search.split('=')[1]
        return this.routes.find(route =>
            route.name === pathname
        )
    }

    /**
     * initialise la route si le path dirige vers le dossier public
     */
    init() {

        const pathname = location.pathname
        if (pathname.match(/^\/[public]/)) {
            // let routeName
            const s = location.search
            if (s) {
                const pos = s.match('=').index + 1,
                    route = this.getRoute(s.slice(pos)),
                    routeName = route.name
                this.rewrite(routeName)
                return route
            }
            this.rewrite(pathname.match(/[\w/]+$/)[0])

            return this.getRoute(pathname.match(/[\w/]+$/)[0])
        }
    }

    rewrite(routeName) {
        const route = this.getRoute(routeName)
        history.pushState(route, `${route.name} | My App`, `/${route.name}`)
    }
}