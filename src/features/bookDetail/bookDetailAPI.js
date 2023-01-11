import alice from '../../fallback/alice.json';

export function fetchDetail (book) {
    let url
    if (book['ISBN'].startsWith('OL')) {
        url = '/works/' + book['ISBN']
    }else
        url = '/isbn/' + book['ISBN']
    return fetch(`https://openlibrary.org${url}.json`)
.then(response => response.json())
        .catch(() => alice)
}

export function verify() {
    return fetch("https://diana.jware-virtual.com:8443/books/check-eligibility")
.then(response => response.json()).then(json=>{
        return json
    })
        .catch(() => ({message: 'Error getting to server'}))
}
