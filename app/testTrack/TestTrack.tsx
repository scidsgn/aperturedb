import * as React from "react"
import { Button, Card, Col, Container, FormControl, Row } from "react-bootstrap"
import { TestChamberM, TestTrackM, UserM } from "../models"
import { addArray, delArray, get, getArray, update } from "../rest"
import RestSelect from "../rest/RestSelect"

type Props = {
    track: TestTrackM
    user: UserM
    onDelete: (item: TestTrackM) => void
}

type State = {
    isLoaded: boolean
    isEditing: boolean
    manager: UserM
    chambers: TestChamberM[]
    name: string
    savedName: string
    newChamber: TestChamberM
}

export default class TestTrack extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            isEditing: false,
            manager: null,
            chambers: null,
            name: this.props.track.name,
            savedName: this.props.track.name,
            newChamber: null
        }

        this.handleDelete = this.handleDelete.bind(this)

        this.handleEdit = this.handleEdit.bind(this)
        this.handleExitEdit = this.handleExitEdit.bind(this)

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNameSave = this.handleNameSave.bind(this)

        this.handleNewChamberChange = this.handleNewChamberChange.bind(this)

        this.handleAddChamber = this.handleAddChamber.bind(this)
        this.handleDeleteChamber = this.handleDeleteChamber.bind(this)
    }

    async componentDidMount() {
        const manager = await get<UserM>("user", this.props.track.managerId)
        const chambers = await getArray<TestChamberM>("testTrack", this.props.track.id, "chambers")

        this.setState({
            isLoaded: true,
            manager, chambers
        })
    }

    handleDelete() {
        this.props.onDelete(this.props.track)
    }

    handleEdit() {
        this.setState({
            isEditing: true
        })
    }

    handleExitEdit() {
        this.setState({
            isEditing: false,
            name: this.state.savedName
        })
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    async handleNameSave() {
        await update<TestTrackM>("testTrack", {
            id: this.props.track.id,
            managerId: this.props.track.managerId,
            name: this.state.name
        })

        this.setState({
            savedName: this.state.name
        })
    }

    handleNewChamberChange(chamber: TestChamberM) {
        this.setState({
            newChamber: chamber
        })
    }

    async handleAddChamber() {
        console.log(this.state)
        if (this.state.newChamber === null) {
            return
        }

        await addArray("testTrack", this.props.track.id, "chambers", this.state.newChamber.id)


        this.setState({
            chambers: [...this.state.chambers, this.state.newChamber]
        })
    }

    async handleDeleteChamber(chamber: TestChamberM) {
        await delArray("testTrack", this.props.track.id, "chambers", chamber.id)

        const newChambers = [...this.state.chambers]
        newChambers.splice(
            this.state.chambers.findIndex(c => c.id === chamber.id), 1
        )

        this.setState({
            chambers: newChambers
        })
    }

    render() {
        const {track, user} = this.props
        
        const canEdit = track.managerId === user.id && this.state.isEditing

        const header = <Container>
            <Row>
                <Col>{
                    canEdit ? `Editing testing track ${this.state.savedName}` : "Testing track"
                }</Col>
                <Col sm="auto">{
                    (track.managerId === user.id && this.state.isLoaded) && <>
                        {
                            canEdit ? <>
                                <Button variant="danger" onClick={this.handleExitEdit}>Exit edit mode</Button>
                            </> : <>
                                <Button onClick={this.handleEdit}>Edit</Button>
                                <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                            </>
                        }
                    </>
                }</Col>
            </Row>
        </Container>

        return <Card>
            <Card.Header>{header}</Card.Header>
            <Card.Body>{
                this.state.isLoaded ? <Container>
                    <Row>
                        <Col lg="auto">
                            {
                                canEdit ?
                                <FormControl value={this.state.name} onChange={this.handleNameChange} /> :
                                <Card.Title>{this.state.name}</Card.Title>
                            }
                            <Card.Subtitle>Managed by {this.state.manager.displayName}</Card.Subtitle>
                            {
                                canEdit && <div>
                                    <Button onClick={this.handleNameSave}>Save name</Button>
                                </div>
                            }
                        </Col>
                        <Col>
                            <Card.Subtitle>Test chambers</Card.Subtitle>
                            <ul>{
                                this.state.chambers.map(chamber => (
                                    <li key={chamber.id}>
                                        {chamber.name}
                                        {
                                            canEdit && <Button
                                                variant="danger" onClick={() => this.handleDeleteChamber(chamber)}
                                            >Delete</Button>
                                        }
                                    </li>
                                ))
                            }</ul>
                            {
                                canEdit && <div className="d-flex">
                                    Add chamber:
                                    <RestSelect<TestChamberM>
                                        endpoint="testChamber"
                                        prefix="chamber"
                                        nameProperty="name"
                                        value={this.state.newChamber}
                                        exclude={this.state.chambers}
                                        onChange={this.handleNewChamberChange}
                                    />
                                    <Button onClick={this.handleAddChamber}>Add</Button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Container> :
                "Loading data..."
            }</Card.Body>
        </Card>
    }
}