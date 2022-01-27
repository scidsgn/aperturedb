import * as React from "react"
import { Form } from "react-bootstrap"
import { getAll } from "."
import { EntityM } from "../models"

type Props<T> = {
    endpoint: string
    prefix: string
    nameProperty: keyof T
    value: T
    exclude?: T[]
    onChange?: (item: T) => void
}

type State<T> = {
    isLoaded: boolean
    items: T[]
}

export default class RestSelect<T extends EntityM> extends React.Component<Props<T>, State<T>> {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            items: []
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        if (!this.props.onChange) {
            return
        }

        if (e.target.value !== null) {
            this.props.onChange(
                this.state.items.find(item => item.id === e.target.value)
            )
        } else {
            this.props.onChange(null)
        }
    }

    componentDidMount() {
        getAll(this.props.endpoint).then(data => {
            this.setState({
                isLoaded: true,
                items: data as T[]
            })
        })
    }

    render() {
        return (
            this.state.isLoaded ?
            <Form.Select defaultValue={null} onChange={this.handleChange}>
                <option value={null}>Select a {this.props.prefix}</option>
                {
                    this.state.items.filter(
                        item => {
                            if (this.props.exclude) {
                                return !this.props.exclude.find(it => it.id === item.id)
                            }
                            return true
                        }
                    ).map(
                        item => <option value={item.id} key={item.id}>
                            {item[this.props.nameProperty]}
                        </option>
                    )
                }
            </Form.Select> :
            "Loading data..."
        )
    }
}