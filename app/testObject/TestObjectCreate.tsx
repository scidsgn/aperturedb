import * as React from "react"
import { Button, Card, Form, FormControl } from "react-bootstrap"
import { TestObjectM } from "../models"

type Props = {
    object: TestObjectM
    onCreate: (item: TestObjectM) => void
    onDiscard: () => void
}

type State = {
    name: string
}

export default class TestObjectCreate extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            name: this.props.object.name
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDiscard = this.handleDiscard.bind(this)

        this.handleNameChange = this.handleNameChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.state.name.length) {
            return
        }

        this.props.onCreate({
            id: this.props.object.id,
            name: this.state.name
        })
    }

    handleDiscard() {
        this.props.onDiscard()
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return <Card>
            <Card.Header>Create a new test object</Card.Header>
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <FormControl value={this.state.name} onChange={this.handleNameChange} />

                    <div className="d-flex">
                        <Button type="submit" variant="primary">Create</Button>
                        <Button variant="outline-secondary" onClick={this.handleDiscard}>Discard</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    }
}