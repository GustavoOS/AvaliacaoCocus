import { FetchError } from "../../exception/fetch"

export async function executeAuthorizedGET<T>(url: string, token: string): Promise<T> {
    const res = await fetch(url, {
        headers: new Headers({
            Authorization: token,
            Accept: 'application/vnd.github+json'
        })
    })
    if (!res.ok)
        throw new FetchError(res.status)
    return await res.json()
}
