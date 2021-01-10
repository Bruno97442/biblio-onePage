export const newsComponant = articleData =>
`<article class="new article${articleData._id}">
<a class=new-link href="news-${articleData._id}">

    <header>
        <h${+articleData._id === 1 ? 1 : 2}>
            <span class="puce"></span>
            <span>${articleData._title}</span>
        </h${articleData == "une" ? 1 : 2}>

    </header>
    
    <section class="article-media">
        <picture class="article-picture">
            <img src="${articleData._img}" alt="${articleData._imgAlt ? articleData._imgAlt : "C'est de l'article"}">
        </picture>
    </section>
        <main>
            ${articleData._introduction ? '<p>' + articleData._introduction + '</p>' :'' }
            ${articleData._content ? '<p>' + articleData._content + '</p>' :'' }
        </main>

</a>
    ${articleData._id !== "une" ? "" :
    `<footer>
        <ul class="sameway-articles">
            <li>
                    <a href="">
                        <i class="fab fa-facebook" aria-hidden="true"></i>
                        provident numquam dolor eos unde repellendus soluta?
                    </a>
            </li>
            <li>
                    <a href="">
                        <i class="fab fa-instagram fa-3x" aria-hidden="true"></i>
                        provident numquam dolor eos unde repellendus soluta?
                    </a>
            </li>
        </ul>
    </footer> `}
</article>`