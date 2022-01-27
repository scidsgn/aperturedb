import { Entity } from "./types/Entity"
import { define, GuardFunction } from "./types/guard"
import { guardNullUndefined } from "./types/guard/templates"
import { makeUUID, UUID } from "./types/UUID"

type AnnouncementProperties = {
    title: string
    contents: string
    authorId: UUID

    createdAt: Date
}

export class Announcement extends Entity<AnnouncementProperties> {
    private constructor(properties: AnnouncementProperties, id?: UUID) {
        super(
            properties, id,
            [
                define<AnnouncementProperties>(
                    "title", guardNullUndefined as GuardFunction<AnnouncementProperties>
                ),
                define<AnnouncementProperties>(
                    "contents", guardNullUndefined as GuardFunction<AnnouncementProperties>
                ),
                define<AnnouncementProperties>(
                    "authorId", guardNullUndefined as GuardFunction<AnnouncementProperties>
                )
            ]
        )
        
        this.fill("createdAt", new Date())
    }

    get title(): string {
        return this.get("title") as string
    }

    get contents(): string {
        return this.get("contents") as string
    }

    get authorId(): UUID {
        return this.get("authorId") as UUID
    }

    get createdAt(): Date {
        return this.get("createdAt") as Date
    }

    public static create(data: AnnouncementProperties & { id?: string }) {
        return new Announcement(data, makeUUID(data.id))
    }
}