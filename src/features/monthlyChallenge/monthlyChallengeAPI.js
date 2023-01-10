export function fetchChallenge() {
    return fetch("http://diana.jware-virtual.com/books/monthly-challenge").then(response => response.json())
}
