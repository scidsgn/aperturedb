import { apiToken, apiRoot } from "./index";

export async function logIn(userName: string, password: string) {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    return await (await fetch(
        `${apiRoot}/auth/login`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                userName, password
            })
        }
    )).json()
}

export async function me() {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${apiToken}`);

    return await (await fetch(
        `${apiRoot}/auth/me`, {
        method: "GET",
        headers
    }
    )).json();
}
