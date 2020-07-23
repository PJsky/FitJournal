import React from 'react';


function Note_modal() {
    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="note-modal-header">Write Down a Note</h3>
                <div className="note-modal-search">
                    <label for="note-name" className="note-modal-note-name-label">Note name</label>
                    <input type="text"  id="note-name" className="note-modal-note-name-input"></input>
                </div>
                <div className="note-modal-bottom">
                    <div className="note-modal-bottom-add">
                        <div className="note-modal-bottom-add-input">
                            <label for="note-text" className="note-modal-note-area-label">Note name</label>
                            <textarea id="note-text"></textarea> 
                        </div>
                        <button className="note-modal-bottom-add-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }

export default Note_modal;
