export const forms = {
    Login: {
        type: "Login",
        content: "Don't have an account already?",
        content_link: "Register!",
        fields: [{name: "username", label: "Username"}, {name: "password", label: "Password", type: "password"}]
    },
    Register: {
        type: "Register",
        content: "Already have a readathon account?",
        content_link: "Login!",
        fields: [
            {name: "username", label: "Username"},
            {name: "password", label: "Password", type: "password"},
            {name: "password2", label: "Repeat password", type: "password"},
        ]

    }
}

export function switchType(formType) {
    if (formType === "Login") return "Register"
    return "Login"
}