import * as React from "react"
import { Button, Card, Form, FormControl } from "react-bootstrap"

import { AnnouncementM } from "../models"

type Props = {
    announcement: AnnouncementM
    onCreate: (item: AnnouncementM) => void
    onDiscard: () => void
}

type State = {
    title: string
    contents: string
}

export class AnnouncementCreate extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.announcement.title,
            contents: this.props.announcement.contents
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDiscard = this.handleDiscard.bind(this)

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleContentsChange = this.handleContentsChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.state.title.length || !this.state.contents.length) {
            return
        }

        this.props.onCreate({
            id: this.props.announcement.id,
            authorId: this.props.announcement.authorId,
            title: this.state.title,
            contents: this.state.contents,
            createdAt: new Date().toString()
        })
    }

    handleDiscard() {
        this.props.onDiscard()
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value})
    }

    handleContentsChange(e) {
        this.setState({contents: e.target.value})
    }

    render() {
        return <Card>
            <Card.Header>Create a new announcement</Card.Header>
            <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                    <FormControl value={this.state.title} onChange={this.handleTitleChange} />
                    <FormControl as="textarea" value={this.state.contents} onChange={this.handleContentsChange} />

                    <div className="d-flex">
                        <Button type="submit" variant="primary">Create</Button>
                        <Button variant="outline-secondary" onClick={this.handleDiscard}>Discard</Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    }
}