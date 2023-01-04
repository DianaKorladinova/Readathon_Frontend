export function fetchChallenge() {
    return fetch("http://localhost:8000/books/monthly-challenge").then(response => response.json())
}
