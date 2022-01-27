export type EntityM = {
    id: string
}

export type UserM = {
    id: string
    userName: string
    displayName: string
    role: string
}

export type AnnouncementM = {
    id: string
    title: string
    contents: string
    authorId: string
    createdAt: string
}

export type TestTrackM = {
    id: string
    name: string
    managerId: string
}

export type TestChamberM = {
    id: string,
    name: string,
    architectId: string,
    design: object,
    createdAt: string,
    modifiedAt: string,
    testObjectId: string
}

export type TestObjectM = {
    id: string,
    name: string
}