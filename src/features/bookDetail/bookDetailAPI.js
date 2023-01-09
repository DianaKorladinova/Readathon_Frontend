import alice from '../../fallback/alice.json';

export function fetchDetail(book) {
    return fetch(`https://opedfgnlibrary.org/isbn/${book["ISBN"]}.json`)
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
