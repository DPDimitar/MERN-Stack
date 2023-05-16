import {useEffect, useState} from "react";
import {Fragment} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header";
import Messages from "./components/Messages";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AddMessage from "./components/AddMessage";
import MessageView from "./components/MessageView";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    async function logout() {
        await fetch('http://localhost:5000/api/users/logout', {
            method: 'GET',
            credentials: 'include'
        }).then(res => res.json).then(data => console.log(data)).catch(error => console.log(error))
        localStorage.removeItem('loggedIn')
        setIsLoggedIn(null)
        window.location.href = ("/")
    }

    useEffect(function () {
        const storedLoginStatus = JSON.parse(localStorage.getItem('loggedIn'));
        if (storedLoginStatus) {
            setIsLoggedIn(storedLoginStatus);
        }
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Fragment>
                    <Header loggingOut={logout} isLoggedIn={isLoggedIn}/>
                    <Routes>
                        <Route exact path="/" element={<Messages/>}/>
                        <Route path="/login" element={isLoggedIn ? <Profile user={isLoggedIn}/> :
                            <Login setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route path="/register" element={isLoggedIn ? <Profile user={isLoggedIn}/> : <Register/>}/>
                        <Route path="/profile" element={isLoggedIn ? <Profile user={isLoggedIn}/> :
                            <Login setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route path="/messages/post"
                               element={isLoggedIn ? <AddMessage/> : <Login setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route path="/messages/:id" element={<MessageView isLoggedIn={isLoggedIn}/>}/>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </div>
    );
}

export default App;
