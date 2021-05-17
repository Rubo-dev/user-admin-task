import React from 'react';
import '../assets/styles/editModal.css';

const EditModal = (props) => {

    const onSubmit = e => {
        e.preventDefault();
     };

    return (

        <form onSubmit={onSubmit}>
            <div className={`edit-modal-main ${props.show ? 'show' : ''}`} onClick={props.onClose}>
                <div className="edit-modal-body" onClick={e => e.stopPropagation()}>
                    <button className="close-btn"  onClick={props.onClose}>🗙</button>
                    <label>Name</label>
                    <input type="text" value={props.userName} index = {props.index} onChange={props.handleName} />
                    <label>E-Mail</label>
                    <input type="text" value={props.userMail} onChange={props.handleName}/>
                    <label>Phone</label>
                    <input type="text" value={props.userPhone} onChange={props.handleName}/>
                    <button className = "btn btn-success" type="submit" onClick={props.onSubmit}>Save</button>
                </div>
            </div>
        </form>
    )
}

export default EditModal;
