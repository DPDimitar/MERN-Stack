
function Profile(props) {

    return (
        <div className="container">
            <div className="card mt-5 m-auto" style={{width: '28rem'}}>
                <div className="card-body">
                    <h5 className="card-title">Username: {props.user.username}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Email: {props.user.email}</h6>
                    <h6 className="card-text">Total posts published: {props.user.posts}</h6>
                    <h6 className="card-text">Total votes on user posts: {props.user.totalVotes}</h6>
                </div>
            </div>
        </div>
    )
}

export default Profile