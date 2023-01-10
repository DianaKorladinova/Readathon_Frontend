export function fetchChallenge() {
    return fetch("http://diana.jware-virtual.com:88881/books/monthly-challenge").then(response => response.json())
}
