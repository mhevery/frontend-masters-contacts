import { component$, Resource } from "@builder.io/qwik";
import { RequestHandler, useEndpoint } from "@builder.io/qwik-city";

interface Login {
    username: string,
    password: string,
    error:string,
}
export const onGet: RequestHandler<Login> = async () => {
    return {
        username: '',
        password: '',
        error: ''
    }
}

export const onPost: RequestHandler<Login> = async ({request, response, cookie, url}) => {
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string
    if(username === "admin" && password === "admin") {
        cookie.set("contact-login", "true", {
            path: '/'
        })
        const redirectURL = new URL(url).searchParams.get("redirect") || "/contacts/"
        throw response.redirect(redirectURL)
    }
    return {
        username: username,
        password: password,
        error: "Invalid username or password"
    }
}

export default component$(() => {
    const endpoint = useEndpoint<typeof onGet>()
    return (
        <Resource value={endpoint}
            onResolved={(login) => (
                <form method="POST">
                    {login.error && <div>{login.error}</div>}
                    <label for="username">Username: </label>
                    <input type="text" name="username" placeholder="username" value={login.username} />
                    <br />
                    <label for="password">Password: </label>
                    <input type="text" name="password" placeholder="password" value={login.password} />
                    <br />
                    <button>Submit</button>
                </form>
            )}
        />
    )
})