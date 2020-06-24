import React from 'react';


function Food_modal() {
    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="food-modal-header">Journal Your Food</h3>
                <div className="food-modal-search">
                <input type="text" className="food-modal-search-input"></input>
                <button className="food-modal-search-button">Search</button>
                </div>
                <div className="food-modal-table">
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                </div>
                <div className="food-modal-bottom">
                    <div className="food-modal-bottom-nutrition"></div>
                    <div className="food-modal-bottom-add">
                        <div className="food-modal-bottom-add-input">
                            Amount:
                            <input type="text"></input> 
                            <select>
                                <option value="0">g</option>
                                <option value="1">g</option>
                                <option value="2">lbs</option>
                                <option value="3">kg</option>
                            </select>

                        </div>
                        <button className="food-modal-bottom-add-button">Add</button>
                    </div>

                </div>
            </div>
        </div>
        );
    }

export default Food_modal;
