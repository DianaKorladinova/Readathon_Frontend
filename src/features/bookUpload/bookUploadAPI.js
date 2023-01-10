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

export function uploadBook(book) {
    return fetch(`http://localhost:8881/books/add`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(book)
    })
        .then(response => ({successful: response.status === 201}))
        .catch(() => ({successful: false}))
}