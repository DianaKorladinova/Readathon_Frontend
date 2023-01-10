export function fetchChallenge() {
    return fetch("http://diana.virtual-jware.com:88881/books/monthly-challenge").then(response => response.json())
}
