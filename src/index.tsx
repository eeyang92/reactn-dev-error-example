import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { setGlobal, useGlobal } from 'reactn'

type GlobalState = {
    authorized: boolean,
    authChecked: boolean
}

const initialState: GlobalState = {
    authorized: false,
    authChecked: false
}

setGlobal(initialState)

function LoginPage() {
    const [authorized, setAuthorized] = useGlobal('authorized')
    const [authChecked, setAuthChecked] = useGlobal('authChecked')

    function onLogin(event: any) {
        event.preventDefault()

        setTimeout(() => { // Try without setTimeout
            setAuthorized(true)
            // setAuthChecked(true)
        }, 500)
    }

    if (authorized) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <div>This the the login page</div>
            <button onClick={ onLogin }>Login</button>
        </div>
    )
}

function DashboardPage() {
    const [authorized, setAuthorized] = useGlobal('authorized')
    const [authChecked, setAuthChecked] = useGlobal('authChecked')

    if (authChecked && !authorized) {
        return <Redirect to='/login' />
    }

    return (
        <div>This the the dashboard</div>
    )
}

function IndexPage() {
    const [authorized, setAuthorized] = useGlobal('authorized')
    const [authChecked, setAuthChecked] = useGlobal('authChecked')

    if (!authChecked) {
        return (
            <div>This is the index page!</div>
        )
    } else {
        return (
            authorized ? (<Redirect to='/dashboard' />) : (<Redirect to='/login' />)
        )
    }
}

export default function App() {
    const [authorized, setAuthorized] = useGlobal('authorized')
    const [authChecked, setAuthChecked] = useGlobal('authChecked')

    React.useEffect(() => {
        if (!authChecked) {
            setTimeout(() => {
                console.log('effect')
    
                setAuthorized(false) // set to true for auto-redirect on login page
                setAuthChecked(true)
            }, 500)
        }
    }, [authorized, authChecked])

    return (
        <BrowserRouter>
            <div>
                <Route path='/' exact component={ IndexPage } />
                <Route path='/login/' component={ LoginPage } />
                <Route path='/dashboard/' component={ DashboardPage } />
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(<App />, document.getElementById('app'))
