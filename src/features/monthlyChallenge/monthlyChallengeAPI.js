export function fetchChallenge() {
    return fetch("https://diana.jware-virtual.com:8443/books/monthly-challenge").then(response => response.json())
}
