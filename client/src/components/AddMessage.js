import {Fragment, useState} from "react";

function AddMessage() {
    const [name, setName] = useState('');
    const [file, setFile] = useState('');

    const [tags, setTags] = useState({
        SIS: false,
        'Spletno programiranje': false,
        APS: false,
    });

    const onTagChecked = (event) => {
        setTags({
            ...tags,
            [event.target.name]: event.target.checked,
        });
    };

    async function addMessage(e) {
        e.preventDefault();
        if(!name) {
            alert("Enter name");
            return;
        }
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', file);
        const trueTags = Object.keys(tags).filter((tag) => tags[tag])
        formData.append('tags', JSON.stringify(trueTags));
        const res = await fetch('http://localhost:5000/api/posts', {
            method: 'POST',
            credentials: 'include',
            body: formData
        })
        const data = await res.json();
        console.log(data)
        setName('');
        setFile('');

    }

    return (
        <Fragment>
            <div className="container">
                <form className="mt-5" onSubmit={addMessage}>

                    <div className="form-group">
                        <label htmlFor="exampleInputMessage">Message</label>
                        <input value={name} onChange={(e) => {
                            setName(e.target.value)
                        }} type="text" className="form-control" id="exampleInputMessage"
                               placeholder="Enter message"/>
                    </div>
                    <div className="form-group mt-3 mb-3">
                        <label htmlFor="exampleFormControlFile1">Image</label>
                        <input type="file" onChange={(event) => (setFile(event.target.files[0]))}
                               className="form-control-file" id="exampleFormControlFile1"/>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="Spletno programiranje" checked={tags.tag1} onChange={onTagChecked} value="Spletno programiranje"
                               id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">Spletno programiranje</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="SIS" checked={tags.tag2} onChange={onTagChecked} value="SIS"
                               id="customCheck2"/>
                            <label className="custom-control-label" htmlFor="customCheck2">SIS</label>
                    </div>
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" name="APS" checked={tags.tag3} onChange={onTagChecked} value="APS"
                               id="customCheck3"/>
                            <label className="custom-control-label" htmlFor="customCheck3">APS</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>

                </form>
            </div>
        </Fragment>
    )

}

export default AddMessage