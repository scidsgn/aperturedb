import * as React from "react"
import { hot } from "react-hot-loader/root"

import "./App.scss"
import LoginForm from "./login/LoginForm"
import { setToken } from "./rest"
import { me } from "./rest/auth"
import { UserM } from "./models"
import { Navbar, Container, Button, Tabs, Tab } from "react-bootstrap"
import AnnouncementList from "./announcement/AnnouncementList"
import TestObjectList from "./testObject/TestObjectList"
import TestChamberList from "./testChamber/TestChamberList"
import TestTrackList from "./testTrack/TestTrackList"

type Props = {
    name: string
}

type State = {
    me: UserM
}

class App extends React.Component<Props, State> {
    constructor(props) {
        super(props)

        this.state = {
            me: null
        }

        setToken(null)

        this.handleTokenChange = this.handleTokenChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleTokenChange(token: string) {
        setToken(token)

        me().then(
            data => {
                this.setState({me: data})
            }
        )
    }

    handleLogout() {
        this.setState({
            me: null
        })
    }

    render() {
        const { name } = this.props

        const announcements = <AnnouncementList
            header="Announcements"
            user={this.state.me}
            allowCreate={this.state.me && this.state.me.role === "ADMINISTRATOR"}
        />
        const testObjects = <TestObjectList
            header="Test objects"
            user={this.state.me}
            allowCreate={this.state.me && this.state.me.role === "ADMINISTRATOR"}
        />
        const testChambers = <TestChamberList
            header="Test chambers"
            user={this.state.me}
            allowCreate={this.state.me && this.state.me.role === "TESTARCHITECT"}
        />
        const testTracks = <TestTrackList
            header="Test tracks"
            user={this.state.me}
            allowCreate={this.state.me && this.state.me.role === "TESTTRACKMANAGER"}
        />

        return (
            <>
                <Navbar
                    bg={this.state.me ? "dark" : "light"}
                    variant={this.state.me ? "dark" : "light"}
                    expand="lg"
                >
                    <Container>
                        <Navbar.Brand>
                            <img
                                src="img/logo.svg"
                                width="48"
                                height="48"
                                className="d-inline-block align-center"
                                alt="ApertureDB Logo"
                            />{' '}
                            {
                                this.state.me ? "ApertureDB Internal" : "ApertureDB Public Access"
                            }
                        </Navbar.Brand>

                        <Navbar.Toggle aria-controls="navbar-nav" />
                        <Navbar.Collapse id="navbar-nav">
                            {
                                this.state.me ?
                                <Navbar.Text>
                                    Logged in as {this.state.me.displayName} ({this.state.me.role})
                                    <Button onClick={this.handleLogout}>Log out</Button>
                                </Navbar.Text> :
                                <LoginForm onTokenChange={this.handleTokenChange}/>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <main className="col-lg-8 mx-auto">
                    {
                        this.state.me ? <Tabs defaultActiveKey="announcements">
                            <Tab eventKey="announcements" title="Announcements">{announcements}</Tab>
                            <Tab eventKey="testTracks" title="Test tracks">{testTracks}</Tab>
                            <Tab eventKey="testChambers" title="Test chambers">{testChambers}</Tab>
                            <Tab eventKey="testObjects" title="Test objects">{testObjects}</Tab>
                        </Tabs> : announcements
                    }
                </main>
            </>
        )
    }
}

export default hot(App)