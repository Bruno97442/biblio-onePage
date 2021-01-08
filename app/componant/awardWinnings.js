export const awardWiningsComponant = book => {
    const criticism = criticism => `<p class="book-criticism">
    de <span class="book-criticism muted font-italic">
    ${criticism._by} :
    </span> 
    <span class="book-editor h6">" ${criticism._content} "</span>
    </p>`
    let criticisms = ''
    for (const i in book._criticisms) {
        criticisms += criticism(book._criticisms[i])
    }

    return `<article class="book" id="book${book._id}">
    <header class="book-head">
        <span class="book-title h5">
            ${book._title}
        </span> <small class="tag text-muted">#${book._hash.toString().replace(',', ' #')}</small>
        <a class="float-right" title="télécharger ces infos" href="XML-${book._id}-${book._title.replaceAll(' ', '_')}"> <i class="fas fa-rss fa-2x text-info" aria-hidden="true"></i></a>
    </header>
    <picture class="book-picture">
        <img src="${book._cover}" alt="">
    </picture>
    <main class="book-main d-none">
        <p>
        ${book._description}
        </p>
        <p>
            de <span class="book-author h6">
            ${book._author}
            </span> chez
            <span class="book-editor h6">${book._editor}</span>
        </p>
    </main>
    <footer class="book-foot">
       ${criticisms}
    </footer>
</article>`}

