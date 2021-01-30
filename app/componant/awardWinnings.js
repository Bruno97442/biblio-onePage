export const awardWiningsComponant = book => {
    const criticism = criticism => `<p class="book-criticisms">
    de <span class="book-criticism-author muted font-italic">
    ${criticism._by} :
    </span> 
    <span class="book-editor h6">" ${criticism._content} "</span>
    </p>`

    let criticisms = ''
    for (const i in book._criticisms) {
        criticisms += criticism(book._criticisms[i])
    }

    return `<article class="book" id="book${book._id}">
    <header class="book-header">
        <h3 class="book-title">
            <span class="book-title">
                ${book._title}
            </span> 
        </h3>
        <p class="tag text-muted">#${book._hash.toString().replaceAll(',', ' #')}</p>
        <ul class="list-inline d-flex flex-wrap justify-content-center">
            <li class="list-item p-1 col-2">
                <i class="text-primary fab fa-facebook" aria-hidden="true"></i>
            </li>
            <li class="list-item p-1 col-2">
                <i class="text-primary fab fa-twitter" aria-hidden="true"></i>
            </li>
            <li class="list-item p-1 col-2">
                <i class="text-primary fab fa-linkedin" aria-hidden="true"></i>
            </li>
            <li class="list-item p-1 col-2">
                <i class="text-primary fab fa-instagram" aria-hidden="true"></i>
            </li>
            <li class="list-item p-1 col-4 text-center">
                <a class="book-rss" title="télécharger ses infos" href="XML-${book._id}-${book._title.replaceAll(' ', '_')}"> <i class="fas fa-rss" aria-hidden="true"></i></a>
            </li>
        </ul>
    </header>
    <button class="btn-zoom">
        <picture class="book-picture">
            <img src="${book._cover}" alt="">
        </picture>
        <main class="book-main">
            <p>
            ${book._description}
            </p>
            <p>
                de <span class="book-author font-weight-bold">
                ${book._author}
                </span> chez
                <span class="book-editor font-weight-bold">${book._editor}</span>
            </p>
        </main>
        
        <footer class="book-footer">
        <a class="book-rss" title="télécharger ses infos" href="XML-${book._id}-${book._title.replaceAll(' ', '_')}">Télécharger les informations <i class="fas fa-rss" aria-hidden="true"></i></a>
        ${criticisms}
        </footer>
    </button>

</article>`}

