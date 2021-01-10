export const rulesComponant = rule => `<div class="col-lg-6">
<article class="rule p-4">
    <header>
        <h2 class="h4 rule-title">article ${rule._id}</h2>
    </header>
    <main class="rule-main">
        <p class="rule-intro">${rule._introduction}</p>
        <button class="btn btn-outline-primary" data-admin="true" data-toggle="collapse" data-target="#ruleContent${rule._id}"
        aria-controls="ruleContent${rule._id}Collapse">voir article</button>
        <p id="ruleContent${rule._id}" class="rule-content collapse text-justify">
            ${rule._content} 
            <button class="btn btn-outline-primary float-right" data-admin="true" data-toggle="collapse" data-target="#ruleContent${rule._id}"
        aria-controls="ruleContent${rule._id}Collapse">Refermer article</button>
        </p>
    </main>
</article>
</div>`
// {/* <div class="btn-group">
//   <button type="button" class="btn btn-secondary">Split dropdown</button>
//   <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//     <span class="sr-only">Toggle Dropdown</span>
//   </button>
//   <div class="dropdown-menu">
//     <a class="dropdown-item" href="#">Action</a>
//     <a class="dropdown-item disabled" href="#">Disabled action</a>
//     <div class="dropdown-divider"></div>
//     <a class="dropdown-item" href="#">Separated link</a>
//   </div>
// </div> */}