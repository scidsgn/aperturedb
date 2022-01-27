import * as React from "react"
import { Button, Card } from "react-bootstrap"
import { TestObjectM, UserM } from "../models"

type Props = {
    object: TestObjectM
    user: UserM
    onDelete: (item: TestObjectM) => void
}

type State = {

}

export default class TestObject extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {}
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete() {
        this.props.onDelete(this.props.object)
    }

    render() {
        const {object, user} = this.props

        return <Card>
            <Card.Header>Aperture test object</Card.Header>
            <Card.Body>
                <Card.Title>{object.name}</Card.Title>
                {(user && user.role === "ADMINISTRATOR") && (
                    <div className="d-flex">
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                    </div>
                )}
            </Card.Body>
        </Card>
    }
}