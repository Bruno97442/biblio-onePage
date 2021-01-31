export const newsComponant = (articleData, single = false, une = false) => {
    console.log(single, une)
 let content = single ? articleData._content : articleData._content.substr(0, 100) + '[...]</p>'

return `<article class="article article${articleData._id} ${single ? 'span-all' : une ? 'une' :''}">
<a class=new-link href="new-${articleData._id}">

    <header class="article-header">
        <h${+articleData._id === 1 ? 1 : 2}>
            <span class="article-puce"></span>
            <span>${articleData._title} ${articleData._id}</span>
        </h${articleData == "une" ? 1 : 2}>

    </header>
    
    <section class="article-media">
        <picture class="article-picture">
            <img src="${articleData._img}" alt="${articleData._imgAlt ? articleData._imgAlt : "C'est de l'article"}">
        </picture>
    </section>
        <main>
            <p class="h6 m-1"> ${articleData._introduction} </p>
            ${articleData._content ? `<p class="text-muted text-justify"> ${content} `:'' }
        </main>

</a>
    <footer class="article-footer">
    <ul class="sameway-articles d-inline">
    </ul>
        <ul class="list-inline justify-content-center float-right">
        <li class="list-inline-item p-1">
            <i class="text-primary fab fa-facebook fa-2x" aria-hidden="true"></i>
        </li>
        <li class="list-inline-item p-1">
            <i class="text-primary fab fa-twitter fa-2x" aria-hidden="true"></i>
        </li>
        <li class="list-inline-item p-1">
            <i class="text-primary fab fa-linkedin fa-2x" aria-hidden="true"></i>
        </li>
        <li class="list-inline-item p-1">
            <i class="text-primary fab fa-instagram fa-2x" aria-hidden="true"></i>
        </li>
        <li class="list-inline-item p-1 text-center">
            <i class="text-primary fa fa-share-alt-square fa-2x" aria-hidden="true"></i>
        </li>
        <li class="list-inline-item p-1 text-center">
        <a class="book-rss" title="télécharger le PDF" href="PDF-${articleData._id}-${articleData._title.replaceAll(' ', '_')}"> <i class="fas fa-rss fa-2x" aria-hidden="true"></i></a>

        </li>
        </ul>
    </footer> 
</article>`

}