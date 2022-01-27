import * as React from "react"
import { Button, Card, Form, FormControl } from "react-bootstrap"
import { TestChamberM, TestObjectM } from "../models"
import RestSelect from "../rest/RestSelect"

type Props = {
    chamber: TestChamberM
    onCreate: (item: TestChamberM) => void
    onDiscard: () => void
}

type State = {
    name: string,
    testObject: TestObjectM
}

export default class TestChamberCreate extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.chamber.name,
            testObject: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDiscard = this.handleDiscard.bind(this)

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleTestObjectChange = this.handleTestObjectChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.state.name.length || !this.state.testObject) {
            return
        }

        this.props.onCreate({
            id: this.props.chamber.id,
            architectId: this.props.chamber.architectId,
            name: this.state.name,
            createdAt: new Date().toString(),
            modifiedAt: new Date().toString(),
            testObjectId: this.state.testObject.id,
            design: {}
        })
    }

    handleDiscard() {
        this.props.onDiscard()
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleTestObjectChange(item: TestObjectM) {
        this.setState({testObject: item})
    }

    render() {
        return <Card>
            <Card.Header>Create a new chamber</Card.Header>
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <FormControl
                        placeholder="Chamber name"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                    />
                    <RestSelect<TestObjectM>
                        endpoint="testObject"
                        prefix="test object"
                        nameProperty="name"
                        value={this.state.testObject}
                        onChange={this.handleTestObjectChange}
                    />

                    <div className="d-flex">
                        <Button type="submit" variant="primary">Create</Button>
                        <Button variant="outline-secondary" onClick={this.handleDiscard}>Discard</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    }
}