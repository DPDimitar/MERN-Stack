import {useState} from "react";

function Login(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

    async function register(e) {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/users', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        setUsername('');
        setPassword('');
        setEmail('');
        await res.json().then(data => ({
                data: data
            })
        ).then(res => {
            setRegisterError(res.data.error)
            setRegisterMessage(res.data.message)
            console.log(res.data)
        })

    }

    return (
        <div className="container">
            {registerMessage &&
                <div className="alert alert-light" role="alert">
                    {registerMessage}
                </div>
            }
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputUsername1">Username</label>
                    <input required value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }} type="text" className="form-control" id="exampleInputUsername1"
                           placeholder="Enter username"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail">Email</label>
                    <input required value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} type="text" className="form-control" id="exampleInputEmail"
                           placeholder="Enter email"/>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input required value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <button type="button" onClick={register} className="btn btn-primary">Register</button>
            </form>
        </div>
    )
}

export default Login