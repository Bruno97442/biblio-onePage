export class Router {

    static _instance

    url

    constructor(routes) {
        this.routes = routes
    }

    static setInstance(routes) {
        this._instance = new Router(routes)
    }

    getUrl() {
        this.url = window.location.pathname
        return this.url
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

    // match() {
    //     return this.getRoute(this.getUrl().replace('/', ''))
    // }

    init() {
        if (location.pathname.match(/^\/[public]/)) {

            const s = location.search
            if (s) {
                const pos = s.match('=').index + 1,
                    routeName = s.slice(pos)
                this.rewrite(routeName)

                return this.getRoute(routeName)
            }

            this.rewrite('home')
        }
    }
    rewrite(routeName) {
        const route = this.getRoute(routeName)
        history.pushState(route, `${route.name} | My App`, `/${route.name}.html`)
    }
}