import alice from '../../fallback/alice.json';

export function fetchDetail(book, type="ISBN") {
    return fetch(`https://openlibrary.org/isbn/${book[type]}.json`)
        .then(response => response.json())
        .catch(() => alice)
}

export function verify() {
    return fetch(`http://localhost:8000/books/check-eligibility`)
        .then(response => response.json()).then(json=>{
            return json
        })
        .catch(() => ({message: 'Error getting to server'}))
}
