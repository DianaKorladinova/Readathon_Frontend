export function searchBook(book) {
    let str = book.split().join('+')
    return fetch(`https://openlibrary.org/search.json?q=${str}`)
        .then(response => response.json()).then(json => {
            const resultNum = Math.min(json["numFound"], 3)
            if (resultNum === 0) return []
            return json.docs.slice(0, resultNum)
        })
        .catch(() => [])
}