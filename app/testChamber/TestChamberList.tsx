import * as React from "react"

import { TestChamberM } from "../models"
import RestList from "../rest/RestList"
import TestChamber from "./TestChamber"
import TestChamberCreate from "./TestChamberCreate"

export default class TestChamberList extends RestList<TestChamberM> {
    endpoint = "testChamber"

    itemRender(item: TestChamberM, i: number, array: TestChamberM[]): JSX.Element {
        return <div key={item.id}>
            <TestChamber chamber={item} user={this.props.user} onDelete={this.handleDelete} />
        </div>
    }

    newItemRender(item: TestChamberM): JSX.Element {
        return <div>
            <TestChamberCreate
                chamber={item}
                onCreate={this.handleFinalizeCreate}
                onDiscard={this.handleDiscardCreate}
            />
        </div>
    }

    create(): TestChamberM {
        return {
            id: null,
            name: "",
            testObjectId: null,
            createdAt: new Date().toString(),
            modifiedAt: new Date().toString(),
            architectId: this.props.user.id,
            design: {}
        }
    }
    
}