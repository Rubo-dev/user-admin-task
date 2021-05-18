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
                    <button className="close-btn" onClick={props.onClose}>🗙</button>
                    <div className="input-blocks mt-5">
                        <label>Name</label>
                        <input className="input-forms" placeholder="Enter name" type="text" value={props.userName} id={props.userIndex} onChange={props.handleName} />
                    </div>
                    <div className="input-blocks">
                        <label>E-Mail</label>
                        <input className="input-forms" placeholder="Enter email" type="email" value={props.userEmail} onChange={props.handleEmail} id={props.userIndex} />
                    </div>
                    <div className="input-blocks">
                        <label>Phone</label>
                        <input className="input-forms" placeholder="Enter phone" type="tel" value={props.userPhone} id={props.userIndex} onChange={props.handlePhone} />
                    </div>
                    <button className="btn btn-success mt-3" type="submit" onClick={props.saveData}>Save</button>
                </div>
            </div>
        </form>
    )
}

export default EditModal;
