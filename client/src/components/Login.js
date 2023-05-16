import {useState} from "react";

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(0);
    const [loggedIn, setLoggedIn] = useState(0);
    const [loginMessage, setLoginMessage] = useState('');

    async function login(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        setUsername('');
        setPassword('');
        await res.json().then(data => ({
                data: data,
                status: res.status
            })
        ).then(res => {
            setLoginError(res.data.error)
            setLoginMessage(res.data.message)
            res.data.user.posts = res.data.user_posts
            res.data.user.totalVotes = res.data.totalVotes
            console.log(res.status, res.data)
            if (!res.data.error) {
                localStorage.setItem('loggedIn', JSON.stringify(res.data.user))
                props.setIsLoggedIn(res.data.user)
                setLoggedIn(1)
            }
        })
    }

    return (
        <div className="container">
            {loginMessage &&
                <div className={"alert " + (loginError ? "alert-danger" : "alert-success")} role="alert">
                    {loginMessage}
                </div>
            }
            {!loggedIn &&
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputUsernama1">Username</label>
                        <input value={username} onChange={(e) => {
                            setUsername(e.target.value)
                        }} type="text" className="form-control" id="exampleInputUsernama1"
                               placeholder="Enter username"/>
                    </div>
                    <div className="form-group mb-2">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={password} onChange={(e) => {
                            setPassword(e.target.value)
                        }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                    </div>
                    <button type="button" onClick={login} className="btn btn-primary">Login</button>
                </form>}
        </div>
    )
}

export default Login