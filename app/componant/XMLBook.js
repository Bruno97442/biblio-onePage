export const XMLBook = book => {

  const criticism = criticism =>
    `<criticism>
      <by>${criticism._by}</by>
      <content>${criticism._content}</content>
    </criticism>`

  let criticisms = ''
  
  for (const i in book._criticisms) {
    criticisms += criticism(book._criticisms[i])
  }

  return `<?xml version="1.0" encoding="UTF-8" ?>
<book>
  <id>${book._id}</id>
  <title>${book._title}</title>
  <description>${book._description}</description>
  <cover>https://www.biblio.com/api/awards/img-${book._id}</cover>
  <author>${book._author}</author>
  <retailer>${book._retailer}</retailer>
  <criticisms>
    ${criticisms}
  </criticisms>
  <hash>
    #${book._hash.toString().replace(',', ' #')}
  </hash>`
}