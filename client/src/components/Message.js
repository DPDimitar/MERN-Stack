import {useEffect, useState} from "react";
import messages from "./Messages";

function Message(props) {
    const [date, setDate] = useState('');
    useEffect(() => {
        setDate(Date(props.message.datetime).toLocaleString())
    })
    return (
        <div className="row">
            <div className="col">
                <div className="card bg-dark text-white mt-5 m-auto" style={{width: "40em"}}>
                    <img height={250} className="card-img" src={"http://localhost:5000/images/" + props.message.file}
                         alt="Card image"/>
                    <div className="card-img-overlay">
                        <h5 className="card-title">{props.message.name} {props.message.tags.map((tag) => (
                            <span key={tag} className="badge badge-secondary"
                                  style={{border: '3px solid #fff', fontSize: '12px'}}>{tag}</span>))}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.</p>
                        <p className="card-text">Post by {props.message.userid.username} - {date} </p>
                    </div>
                </div>
            </div>
            <div className="col">
                <div className="m-auto text-center mt-3"><span style={{
                    border: "2px solid green",
                    color: "green",
                    borderRadius: '5px',
                    padding: '5px'
                }}>{props.message && (props.message.up_votes.length)}</span> <span style={{
                    border: "2px solid red",
                    color: "red",
                    borderRadius: '5px',
                    padding: '5px'
                }}>{props.message && (props.message.down_votes.length)}</span></div>
                <div className="m-auto text-center" style={{width:'40em'}}>
                    <a href={"/messages/"+props.message._id} className="btn btn-secondary mt-3">Visit</a>
                </div>
            </div>
        </div>
    )
}

export default Message