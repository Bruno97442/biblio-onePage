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
        const route = this.routes.find(r => r.name.match(name))
        return route ?? this.getRoute('404')
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
     */
    match() {
        let pathname = location.search === "" ? this.getUrl().match(/[a-zA-Z]+$/)[0] : location.search.split('=')[1]
        return this.routes.find(route =>
            route.name === pathname
        )
    }

    /**
     * initialise la route si le path dirige vers le dossier public
     */
    init() {
        if (location.pathname.match(/^\/[public]/)) {
            // let routeName
            const s = location.search
            if (s) {
                const pos = s.match('=').index + 1,
                    routeName = this.getRoute(s.slice(pos)).name
                this.rewrite(routeName)
                return this.getRoute(routeName)
            }
            this.rewrite(routeName)
        }
    }
    rewrite(routeName) {
        const route = this.getRoute(routeName)
        history.pushState(route, `${route.name} | My App`, `/${route.name}`)
    }
}