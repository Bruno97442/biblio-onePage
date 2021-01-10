import { addClass, rmClass, __ } from "./broToolBox.js"

export class Nav {

    navItems
    userType =  [
        '_admin',
        '_jury',
        '_author',
        '_user'
    ]
    _HTMLLinks
    get HTMLLinks() {
        this._HTMLLinks = this._HTMLLinks ?? __( 'a', this.navList)
        return this._HTMLLinks
    }
    set HTMLLinks(value = '') {
        this._HTMLLinks = __( 'a', this.navList)
    }


    /**
     * 
     * @param {Router} router instance
     * @param {HTMLElement} nav ul
     */
    constructor(navItems, router, nav) {
        this.router = router
        this.navList = nav
        this.navItems = navItems
        this.CollapseBtn = this.navList.querySelector('button')
    }

    /**
     * 
     * @param {object} item link
     * @param {number} delay 
     */
    line(item, delay = 0) {
        return `<li class="nav-item comeIn" ${delay ? `style="animation-duration: ${delay}s"` : ''}>
        <a class="nav-link ${item.className ?? ''}" href="${item.routeName}">${item.content}</a>
    </li>`
    }

    build(sessionUser) {
        this.contentList = ''
        this.navItems.forEach((ele, i) => {
            if (ele.access === 'all' || this.userType.some(role=> role.match(ele.access) && sessionUser._role !== "false") || ele.access === 'noAuth') {
                // gestion du link login
                if (sessionUser._role !== "false" && ele.access === 'noAuth') {
                    return
                }
                this.contentList += this.line(ele, i * 0.4)
            }
        })

        return this

    }
    append() {
        this.navList.innerHTML = this.contentList
    }

    run(session) {
        this.build(session).append()
        this.HTMLLinks = 'newlinks'
        this.activateLink()
    }

    clear() {
        this.session.clear()
    }

    activateLink(className = 'active') {
        let match = this.router.match()
        let routeName = match ? match.name : "home"
        this.HTMLLinks.forEach(link => {
            link.getAttribute('href') === routeName
            ? addClass( className, link)
            : rmClass( className, link)
        })
    }

    disabledAllToggle(add = true){
        this.HTMLLinks.forEach(link => link.classList.toggle('disabled', add))
    }
}