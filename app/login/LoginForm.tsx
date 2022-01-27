import * as React from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import { logIn } from "../rest/auth"

type Props = {
    onTokenChange: (token: string) => void
}

type State = {
    error: boolean
    isWaiting: boolean
    login: string
    password: string
}

class LoginDropdown extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            error: false,
            isWaiting: false,
            login: "",
            password: ""
        }

        this.handleLoginChange = this.handleLoginChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleLoginChange(e) {
        this.setState({login: e.target.value})
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        const {login, password} = this.state

        if (login && password) {
            this.setState({isWaiting: true})

            logIn(login, password).then(
                data => {
                    if (data.error) {
                        this.setState({
                            isWaiting: false,
                            error: true
                        })
                    } else {
                        if (this.props.onTokenChange) {
                            this.props.onTokenChange(data.token)
                        }
                    }
                },
                error => {
                    this.setState({
                        isWaiting: false,
                        error: true
                    })
                }
            )
        }
    }

    render() {
        const {error, isWaiting, login, password} = this.state

        if (isWaiting) {
            return <div>Please wait...</div>
        } else {
            return (
                <>
                    <Form
                        className="navbar-form navbar-right d-flex"
                        onSubmit={this.handleSubmit}
                    >
                        <FormControl
                            placeholder="Username"
                            value={login}
                            onChange={this.handleLoginChange}
                        />
                        <FormControl
                            placeholder="Password" type="password"
                            value={password}
                            onChange={this.handlePasswordChange}
                        />
                        <Button type="submit">Log in</Button>
                    </Form>
                </>
            )
        }
    }
}

export default React.forwardRef<any, any>((props, ref) => <LoginDropdown innerRef={ref} {...props}/>)