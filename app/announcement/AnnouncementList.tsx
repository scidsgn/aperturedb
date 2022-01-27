import * as React from "react"
import { AnnouncementM } from "../models"

import RestList from "../rest/RestList"

import { Announcement } from "./Announcement"
import { AnnouncementCreate } from "./AnnouncementCreate"

export default class AnnouncementList extends RestList<AnnouncementM> {
    endpoint = "announcement"

    create(): AnnouncementM {
        return {
            id: null,
            authorId: this.props.user.id,
            createdAt: new Date().toString(),
            title: "New announcement",
            contents: ""
        }
    }

    itemRender(item: AnnouncementM, i: number, array: AnnouncementM[]) {
        return <div key={item.id}>
            <Announcement announcement={item} user={this.props.user} onDelete={this.handleDelete} />
        </div>
    }

    newItemRender(item: AnnouncementM) {
        return <div>
            <AnnouncementCreate announcement={item} onCreate={this.handleFinalizeCreate} onDiscard={this.handleDiscardCreate} />
        </div>
    }
}