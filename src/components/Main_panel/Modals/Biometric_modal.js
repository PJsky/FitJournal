import React from 'react';


function Biometric_modal() {
    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="biometric-modal-header">Journal Your Biometrics</h3>
                <div className="biometric-modal-search">
                    <select className="biometric-modal-metric-select">
                        <option value="0">Weight</option>
                        <option value="1">Bodyfat%</option>
                        <option value="2">Height</option>
                    </select>
                </div>
                <div className="biometric-modal-bottom">
                    <div className="biometric-modal-bottom-add">
                        <div className="biometric-modal-bottom-add-input">
                            <input type="text"></input> 
                            <select>
                                <option value="0">g</option>
                                <option value="1">g</option>
                                <option value="2">lbs</option>
                                <option value="3">kg</option>
                            </select>
                        </div>
                        <button className="biometric-modal-bottom-add-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }

export default Biometric_modal;
