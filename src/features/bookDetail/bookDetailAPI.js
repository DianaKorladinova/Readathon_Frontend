import alice from '../../fallback/alice.json';

export function fetchDetail(book) {
    return fetch(`https://openlibrary.org/isbn/${book["ISBN"]}.json`).then(response => response.json()).catch(()=> alice)
}
