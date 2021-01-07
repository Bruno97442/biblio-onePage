export const awardWiningsComponant = book => `                    <article class="book" id="book${book.id}">
<header class="book-head">
    <span class="book-title h5">
        ${book.title}
    </span> <small class="tag text-muted">#${book.hash.toString().replace(',',' #')}</small>
</header>
<picture class="book-picture">
    <img src="${book.cover}" alt="">
</picture>
<main class="book-main d-none">
    <p>
        ${book.description}
    </p>
</main>
<footer class="book-foot">
    de <span class="book-author h6">
        ${book.author}
    </span> chez
    <span class="book-editor h6">${book.editor}</span>

</footer>
</article>`

