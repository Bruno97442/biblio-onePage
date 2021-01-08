import { navItems } from "../config/navItems.js";
export class Nav {

    navItems

    /**
     * 
     * @param {Router} router instance
     * @param {HTMLElement} nav 
     */
    constructor(router, nav) {
        this.router = router
            this.nav = nav
            this.navItems = navItems
    }

    /**
     * 
     * @param {object} item link
     * @param {number} delay 
     */
    line(item, delay = 0) {
        return `<li class="nav-item comeIn">
        <a class="nav-link ${item.className ??''}" ${delay ? `style="animation-delay: ${delay}s"` : ''} href="${item.routeName}">${item.content}</a>
    </li>`
    }

    build(sessionUser) {
        this.contentList = ''
        this.navItems.forEach((ele, i) => {
            if (ele.access === 'all' || sessionUser._role.match(ele.access) || ele.access === 'noAuth') {
                
                if(sessionUser._role !=="false" && ele.access === 'noAuth'){
                    return
                }
                this.contentList += this.line(ele, i * 0.4)
            }
        })
        
        return this

    }
    append() {
        this.nav.innerHTML = this.contentList
    }

    run(session){
        this.build(session).append()
    }

    clear(){
        this.session.clear()
    }
}