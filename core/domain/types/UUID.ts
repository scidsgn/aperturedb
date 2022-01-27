export type UUID = string & { _uuid: undefined }

export function makeUUID(uuidCandidate: string) {
    if (uuidCandidate === null) {
        return null
    }
    if (!/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/gi.test(uuidCandidate)) {
        return null
    }

    return uuidCandidate as UUID
}