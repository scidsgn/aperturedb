import * as React from "react"
import { TestTrackM } from "../models";
import RestList from "../rest/RestList";
import TestTrack from "./TestTrack";
import TestTrackCreate from "./TestTrackCreate";

export default class TestTrackList extends RestList<TestTrackM> {
    endpoint = "testTrack"

    itemRender(item: TestTrackM, i: number, array: TestTrackM[]): JSX.Element {
        return <div key={item.id}>
            <TestTrack
                track={item} user={this.props.user} onDelete={this.handleDelete}
            />
        </div>
    }
    newItemRender(item: TestTrackM): JSX.Element {
        return <div>
            <TestTrackCreate 
                track={item}
                onCreate={this.handleFinalizeCreate}
                onDiscard={this.handleDiscardCreate}
            />
        </div>
    }
    create(): TestTrackM {
        return {
            id: null,
            managerId: this.props.user.id,
            name: ""
        }
    }
}