import * as React from "react"

import { TestObjectM } from "../models"
import RestList from "../rest/RestList"
import TestObject from "./TestObject"
import TestObjectCreate from "./TestObjectCreate"

export default class TestObjectList extends RestList<TestObjectM> {
    endpoint = "testObject"

    itemRender(item: TestObjectM, i: number, array: TestObjectM[]): JSX.Element {
        return <div key={item.id}>
            <TestObject object={item} user={this.props.user} onDelete={this.handleDelete} />
        </div>
    }
    newItemRender(item: TestObjectM): JSX.Element {
        return <div>
            <TestObjectCreate object={item} onCreate={this.handleFinalizeCreate} onDiscard={this.handleDiscardCreate} />
        </div>
    }
    create(): TestObjectM {
        return {
            id: null,
            name: ""
        }
    }
}