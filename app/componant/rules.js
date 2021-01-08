export const rulesComponant = rule => `<div class="col-lg-6">
<article class="rule p-4">
    <header>
        <h2 class="h4 rule-title">article ${rule._id}</h2>
    </header>
    <main class="rule-main">
        <p class="rule-intro">${rule._introduction}</p>
        <button class="btn btn-outline-primary" data-toggle=".rule-description" data-admin="true">voir article</button>
        <p class="rule-content d-none">
            ${rule._content}
        </p>
    </main>
</article>
</div>`

