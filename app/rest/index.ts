import { EntityM } from "../models"

export const apiRoot = "http://localhost:5000/api"

export let apiToken = null

export type RestListState<T> = {
    error: false,
    isLoaded: false,
    items: T[]
}

export function setToken(token: string) {
    apiToken = token
}

export async function get<T extends EntityM>(endpoint: string, id: string): Promise<T> {
    const headers = new Headers()
    if (apiToken) {
        headers.append("Authorization", `Bearer ${apiToken}`)
    }

    return await (await fetch(
        `${apiRoot}/${endpoint}/${id}`, {
            method: "GET",
            headers
        }
    )).json()
}

export async function getAll<T extends EntityM>(endpoint: string): Promise<T[]> {
    const headers = new Headers()
    if (apiToken) {
        headers.append("Authorization", `Bearer ${apiToken}`)
    }

    return await (await fetch(
        `${apiRoot}/${endpoint}`, {
            method: "GET",
            headers
        }
    )).json()
}

export async function create<T extends EntityM>(endpoint: string, data: T): Promise<T> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${apiToken}`)

    return await (await fetch(
        `${apiRoot}/${endpoint}`, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        }
    )).json()
}

export async function update<T extends EntityM>(endpoint: string, data: T): Promise<T> {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    headers.append("Authorization", `Bearer ${apiToken}`)

    return await (await fetch(
        `${apiRoot}/${endpoint}/${data.id}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data)
        }
    )).json()
}

export async function del(endpoint: string, id: string): Promise<void> {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)

    await fetch(`${apiRoot}/${endpoint}/${id}`, {
        method: "DELETE",
        headers
    })
}

export async function getArray<T extends EntityM>(
    endpoint: string, id: string, array: string
): Promise<T[]> {
    const headers = new Headers()
    if (apiToken) {
        headers.append("Authorization", `Bearer ${apiToken}`)
    }

    return await (await fetch(
        `${apiRoot}/${endpoint}/${id}/${array}`, {
            method: "GET",
            headers
        }
    )).json()
}

export async function addArray(endpoint: string, id: string, array: string, itemId: string): Promise<void> {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)

    return await (await fetch(
        `${apiRoot}/${endpoint}/${id}/${array}/${itemId}`, {
            method: "POST",
            headers
        }
    )).json()
}

export async function delArray(endpoint: string, id: string, array: string, itemId: string): Promise<void> {
    const headers = new Headers()
    headers.append("Authorization", `Bearer ${apiToken}`)

    return await (await fetch(
        `${apiRoot}/${endpoint}/${id}/${array}/${itemId}`, {
            method: "DELETE",
            headers
        }
    )).json()
}