import * as React from "react"
import { Button, Card, Form, FormControl } from "react-bootstrap"

import { AnnouncementM, UserM } from "../models"
import { update } from "../rest"

type Props = {
    announcement: AnnouncementM
    user?: UserM
    onDelete: (item: AnnouncementM) => void
}

type State = {
    isEditing: boolean
    title: string
    contents: string,
    createdAt: Date
}

export class Announcement extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            isEditing: false,
            title: this.props.announcement.title,
            contents: this.props.announcement.contents,
            createdAt: new Date(this.props.announcement.createdAt)
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.handleEditDiscard = this.handleEditDiscard.bind(this)

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentsChange = this.handleContentsChange.bind(this)

        this.handleDelete = this.handleDelete.bind(this)
    }

    handleEdit() {
        this.setState({isEditing: true})
    }

    handleEditSubmit(e) {
        e.preventDefault()

        update<AnnouncementM>(
            "announcement", {
                id: this.props.announcement.id,
                title: this.state.title,
                contents: this.state.contents,
                authorId: this.props.announcement.authorId,
                createdAt: new Date().toString()
            }
        ).then(data => {
            this.setState({
                isEditing: false,
                createdAt: new Date()
            })
        }, err => {
            this.setState({
                isEditing: false,
                title: this.props.announcement.title,
                contents: this.props.announcement.contents
            })
        })
    }

    handleEditDiscard() {
        this.setState({
            isEditing: false,
            title: this.props.announcement.title,
            contents: this.props.announcement.contents
        })
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handleContentsChange(e) {
        this.setState({contents: e.target.value})
    }

    handleDelete() {
        this.props.onDelete(this.props.announcement)
    }

    render() {
        const {announcement, user} = this.props

        return <Card>
            <Card.Header>
                {
                    this.state.isEditing ?
                    "Editing announcement" :
                    "Announcement - " + new Intl.DateTimeFormat('en-US').format(new Date(this.props.announcement.createdAt))
                }
            </Card.Header>
            <Card.Body>
                {
                    this.state.isEditing ? <>
                        <Form onSubmit={this.handleEditSubmit}>
                            <FormControl value={this.state.title} onChange={this.handleTitleChange} />
                            <FormControl as="textarea" value={this.state.contents} onChange={this.handleContentsChange} />

                            <div className="d-flex">
                                <Button type="submit" variant="primary">Save edit</Button>
                                <Button variant="outline-secondary" onClick={this.handleEditDiscard}>Discard</Button>
                            </div>
                        </Form>
                    </> : <>
                        <Card.Title>{this.state.title}</Card.Title>
                        <Card.Text>{this.state.contents}</Card.Text>
                        {
                            (user && user.role === "ADMINISTRATOR" && user.id === announcement.authorId) && (
                                <div className="d-flex">
                                    <Button variant="secondary" onClick={this.handleEdit}>Edit</Button>
                                    <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                                </div>
                            )
                        }
                    </>
                }
            </Card.Body>
        </Card>
    }
}