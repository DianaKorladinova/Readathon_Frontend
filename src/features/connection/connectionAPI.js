export function checkConnectionToServer() {
    let token = localStorage.getItem("token")
    if (!token) token = ""
    return fetch("http://http://diana.virtual-jware.com:8881//check", {
        headers: {
            'Content-type': 'application/json', 'Authorization': `Bearer ${token}`, // notice the Bearer before your token
        }
    }).then(response => {
        return response.json().then(json => {
            if (response.status === 200) {
                return {success: true, response: json}
            } else return {
                success: false, connected: true, err: json
            }
        })
    }).catch(() => {
        return {
            success: false, connected: false, err: {message: "Connection to server couldn't be established."}
        }
    })
}
