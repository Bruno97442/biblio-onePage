export const newsComponant = articleData =>
`<article class="new article${articleData.id}">
<a href="article">

    <header>
        <h${+articleData.id === 1 ? 1 : 2}>
            <span class="puce"></span>
            <span>${articleData.title}</span>
        </h${articleData == "une" ? 1 : 2}>

    </header>
    
    <section class="article-media">
        <picture class="article-picture">
            <img src="${articleData.img}" alt="${articleData.imgAlt ? articleData.imgAlt : "C'est de l'article"}">
        </picture>
    </section>
        <main>
            ${articleData.introduction ? '<p>' + articleData.introduction + '</p>' :'' }
            ${articleData.content ? '<p>' + articleData.content + '</p>' :'' }
        </main>

</a>
    ${articleData.id !== "une" ? "" :
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