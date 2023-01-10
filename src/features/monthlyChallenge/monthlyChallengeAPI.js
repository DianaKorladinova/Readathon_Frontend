export function fetchChallenge() {
    return fetch("http://localhost:88881/books/monthly-challenge").then(response => response.json())
}
