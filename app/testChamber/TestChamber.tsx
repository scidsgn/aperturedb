import * as React from "react"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import { TestChamberM, TestObjectM, UserM } from "../models"
import { get } from "../rest"

type Props = {
    chamber: TestChamberM
    user: UserM
    onDelete: (item: TestChamberM) => void
}

type State = {
    isLoaded: boolean
    architect: UserM
    testObject: TestObjectM
}

export default class TestChamber extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            architect: null,
            testObject: null
        }

        this.handleDelete = this.handleDelete.bind(this)
    }

    async componentDidMount() {
        const architect = await get<UserM>("user", this.props.chamber.architectId)
        const testObject = await get<TestObjectM>("testObject", this.props.chamber.testObjectId)

        this.setState({
            isLoaded: true,
            architect, testObject
        })
    }

    handleDelete() {
        this.props.onDelete(this.props.chamber)
    }

    render() {
        const { chamber, user } = this.props

        const header = <Container>
            <Row>
                <Col>Test chamber</Col>
                <Col md="auto">{
                    user.id === chamber.architectId && <>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                    </>
                }</Col>
            </Row>
        </Container>

        return <Card>
            <Card.Header>{header}</Card.Header>
            <Card.Body>{
                this.state.isLoaded ? <>
                    <Card.Title>{chamber.name}</Card.Title>
                    <Card.Subtitle>Designed by {this.state.architect.displayName}</Card.Subtitle>
                    <Card.Text>Designed to test <em>{this.state.testObject.name}</em></Card.Text>
                </> :
                "Loading data..."
            }</Card.Body>
        </Card>
    }
}