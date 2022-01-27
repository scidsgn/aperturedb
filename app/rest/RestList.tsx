import * as React from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { del, getAll, create } from "."
import { AnnouncementM, EntityM, UserM } from "../models"

type Props = {
    header: string
    user?: UserM
    allowCreate?: boolean
}

type State<T> = {
    error: boolean
    isLoaded: boolean
    items: T[]

    isCreating: boolean
    newItem: T
}

export default abstract class RestList<T extends EntityM> extends React.Component<Props, State<T>> {
    abstract endpoint: string

    abstract itemRender(item: T, i: number, array: T[]): JSX.Element
    abstract newItemRender(item: T): JSX.Element
    abstract create(): T

    constructor(props: Props) {
        super(props)

        this.state = {
            error: false,
            isLoaded: false,
            items: [],

            isCreating: false,
            newItem: null
        }

        this.refreshList = this.refreshList.bind(this)

        this.handleInitCreate = this.handleInitCreate.bind(this)
        this.handleFinalizeCreate = this.handleFinalizeCreate.bind(this)
        this.handleDiscardCreate = this.handleDiscardCreate.bind(this)

        this.handleDelete = this.handleDelete.bind(this)
    }

    refreshList() {
        getAll(this.endpoint).then(data => {
            this.setState({
                isLoaded: true,
                items: data as T[]
            })
        }, error => {
            this.setState({
                isLoaded: true,
                error: true
            })
        })
    }

    componentDidMount() {
        this.refreshList()
    }

    handleInitCreate() {
        this.setState({
            isCreating: true,
            newItem: this.create()
        })
    }

    handleFinalizeCreate(item: T) {
        this.setState({
            isCreating: false
        })

        create<T>(this.endpoint, item).then(data => {
            this.refreshList()
        })
    }

    handleDiscardCreate() {
        this.setState({
            isCreating: false
        })
    }

    handleDelete(item: T) {
        this.setState({
            items: this.state.items.filter(i => i !== item)
        })
        del(this.endpoint, item.id)
    }

    render() {
        const {error, isLoaded, items, isCreating, newItem} = this.state
        const header = <Container>
            <Row>
                <Col><h3>{this.props.header}</h3></Col>
                <Col md="auto">{
                    (this.props.allowCreate && !isCreating) &&
                    <Button onClick={this.handleInitCreate}>Create</Button>
                }</Col>
            </Row>
        </Container>

        if (error) {
            return <div>{header}An error occured while loading items.</div>
        } else if (!isLoaded) {
            return <div>{header}Loading items...</div>
        } else {
            return <div>
                {header}
                {
                    (this.props.allowCreate && isCreating) && this.newItemRender(newItem)
                }
                {
                    items.length > 0 ? 
                    items.map((v, i, a) => this.itemRender(v, i, a)) :
                    <>No items.</>
                }
            </div>
        }
    }
}