import React from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { set_fetched_food } from '../../../actions/fetched-food';


function Food_modal() {
    const fetchedFood = useSelector(state => state.fetchedFood);
    const dispatch = useDispatch();

    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="food-modal-header">Journal Your Food</h3>
                <div className="food-modal-search">
                <input type="text" className="food-modal-search-input"></input>
                <button className="food-modal-search-button" onClick={()=>fetchFoodData(dispatch)}>Search</button>
                </div>
                <div className="food-modal-table">
                    <div className="food-modal-table-row">
                        <div className="food-modal-table-col"> Description</div>
                        <div className="food-modal-table-col">Amount</div>
                        <div className="food-modal-table-col">kcal</div>
                    </div>
                    {createTable(fetchedFood)}
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

    const createTable = (fetchedFood) => {
        let table = [];
        for(let food in fetchedFood)
        table.push(
            <div className="food-modal-table-row">
                <div className="food-modal-table-col"> {fetchedFood[food].description}</div>
                <div className="food-modal-table-col">{fetchedFood[food].householdServingFullText}</div>
                <div className="food-modal-table-col">{fetchedFood[food].foodNutrients[3].amount}</div>
            </div>
        )
        return table;
    }

    const fetchFoodData = (dispatch) => {
        console.log("data here:")
        axios.get('https://api.nal.usda.gov/fdc/v1/foods/list?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L&query=Cheddar%20Cheese&pageSize=10')
        .then(response => {
            console.log(response.data)
            let fdcid_string = '';
            for(let item in response.data)
                fdcid_string+=`&fdcIds=${response.data[item].fdcId}`
            axios.get(`https://api.nal.usda.gov/fdc/v1/foods?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L${fdcid_string}&nutrients=208&nutrients=203&nutrients=204&nutrients=205`)
            .then(({data}) =>{
                console.log(data);
                dispatch(set_fetched_food(data));
            });
        })
    }

export default Food_modal;
