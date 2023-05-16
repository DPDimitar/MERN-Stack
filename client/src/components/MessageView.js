import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function MessageView(props) {

    let {id} = useParams();
    const [messageData, setMessageData] = useState(null);
    const [date, setDate] = useState('');
    const [upVotes, setUpVotes] = useState(0);
    const [downVotes, setDownVotes] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:5000/api/posts/' + id);
                const data = await res.json();
                setMessageData(data);
                setDate(Date(data.datetime).toLocaleString());
                setUpVotes(data.up_votes.length)
                setDownVotes(data.down_votes.length)
                setComments(data.comments)
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [id])

    async function likeMessage() {
        try {
            const res = await fetch('http://localhost:5000/api/posts/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    vote: true,
                    id: id

                })
            });
            const data = await res.json();
            if (!data.error) {
                if (data.change) {
                    setUpVotes(upVotes + 1);
                    setDownVotes(downVotes - 1);
                } else {
                    setUpVotes(upVotes + 1);
                }
            }
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function dislikeMessage() {
        try {
            const res = await fetch('http://localhost:5000/api/posts/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    vote: false,
                    id: id
                })
            });
            const data = await res.json();
            if (!data.error) {
                if (data.change) {
                    setUpVotes(upVotes - 1);
                    setDownVotes(downVotes + 1);
                } else {
                    setUpVotes(downVotes + 1);
                }
            }
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    }

    async function reportMessage() {

        try {
            const res = await fetch('http://localhost:5000/api/posts/' + id + '/report', {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id: id
                })
            });
            const data = await res.json();
            console.log(data);

        } catch (err) {
            console.error(err);
        }
    }

    async function postComment() {

        try {
            const res = await fetch('http://localhost:5000/api/posts/' + id + '/comment', {
                method: 'PUT',
                credentials: 'include',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    id: id,
                    comment: comment
                })
            });
            const data = await res.json();
            console.log(data);
            setComments([...comments, comment])

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="row">
            <div className="col">
                <div className="card bg-dark text-white mt-5 m-auto" style={{width: "40em"}}>
                    <img height={250} className="card-img"
                         src={"http://localhost:5000/images/" + (messageData ? messageData.file : '')}
                         alt="Loading.."/>
                    <div className="card-img-overlay">
                        <h5 style={{background: "rgba(250,42,24,0.5)"}}
                            className="card-title">{messageData && messageData.name} {messageData && messageData.tags.map((tag) => (
                            <span key={tag} className="badge badge-secondary"
                                  style={{border: '3px solid #fff', fontSize: '12px'}}>{tag}</span>))}</h5>
                        <p style={{background: "rgba(250,42,24,0.5)"}} className="card-text">Post
                            by {messageData && messageData.userid.username} - {date && date} </p>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="m-auto text-center mt-3"><span style={{
                    border: "2px solid green",
                    color: "green",
                    borderRadius: '5px',
                    padding: '5px'
                }}>{messageData && (upVotes)}</span> <span style={{
                    border: "2px solid red",
                    color: "red",
                    borderRadius: '5px',
                    padding: '5px'
                }}>{messageData && (downVotes)}</span></div>
                {props.isLoggedIn && <div className="m-auto text-center" style={{width: '40em'}}>
                    <button onClick={likeMessage} className="btn btn-success mt-3 m-2">Like</button>
                    <button onClick={dislikeMessage} className="btn btn-danger mt-3 m-2">Dislike</button>
                    <button onClick={reportMessage} className="btn btn-warning text-white mt-3 m-2">Report</button>
                </div>}
                {props.isLoggedIn && <div style={{width: "40em"}} className="m-auto">
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputComment">Comment</label>
                            <input type="text" value={comment} onChange={event => setComment(event.target.value)} className="form-control" id="inputComment" placeholder="Enter comment"/>
                        </div>
                        <button type={"button"} onClick={postComment} className="btn btn-primary">Post Comment</button>
                    </form>
                    <ul className="mt-3">
                        Comments:
                        {messageData && comments.map(comment => (<li key={comment}>{comment}</li>))}
                    </ul>
                </div>}
            </div>
        </div>
)
}

export default MessageView