import Message from "./Message";
import {useEffect, useState} from "react";

function Messages(props) {
    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        const getMsgs = async function () {
            const res = await fetch('http://localhost:5000/api/posts');
            const data = await res.json();
            setMessages(data);
        }
        getMsgs();
    }, [])
    const filteredData = messages.filter((item) =>
        item.tags.some((string) =>
            string.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
    return (
        <div className="container">
            <div className="row mt-4">
                <form className="d-flex form-inline my-2 my-lg-0" style={{width: '20em', margin: "auto"}}>
                    <input value={searchQuery} onChange={event => (setSearchQuery(event.target.value))}
                           className="form-control mr-sm-2" type="search" placeholder="Search"
                           aria-label="Search"/>
                </form>
            </div>
            {filteredData.map((msg) => (<Message key={msg._id} message={msg}/>))}
        </div>
    )
}

export default Messages