import {Fragment} from "react";

function Header(props) {
    return (
        //props.isLoggedIn
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="row w-100">
                        <div className="col-6">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul className="navbar-nav" style={{'float':'right'}}>
                                {!props.isLoggedIn &&
                                    <Fragment>
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/login">Login</a>
                                        </li>
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/register">Register</a>
                                        </li>
                                    </Fragment>
                                }
                                {props.isLoggedIn &&
                                    <Fragment>
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/profile">Profile</a>
                                        </li>
                                        <li className="nav-item active">
                                            <button className="nav-link" onClick={props.loggingOut}>Logout</button>
                                        </li>
                                    </Fragment>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header