import React, {useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { set_fetched_food } from '../../../actions/fetched-food';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {set_chosen_food} from '../../../actions/chosenFood';
import {set_chosen_day_journal} from '../../../actions/chosenDayJournal';

function Food_modal() {
    const fetchedFood = useSelector(state => state.fetchedFood);
    const chosenDay = useSelector(state => state.calendarDayOfYear);
    const chosenFood = useSelector(state => state.chosenFood);
    const chosenDayJournal = useSelector(state => state.chosenDayJournal);
    const dispatch = useDispatch();

    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="food-modal-header">Journal Your Food</h3>
                <div className="food-modal-search">
                <Formik
                initialValues={{ searchFood:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    console.log(values['searchFood']);
                    fetchFoodData(dispatch, values['searchFood']);
                    setSubmitting(false);
                    }, 400);
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                    <Field type="text" name="searchFood" className="food-modal-search-input"/>
                    <ErrorMessage name="searchFood" component="div" />
                    <button type="submit" disabled={isSubmitting} className="food-modal-search-button">
                        Submit
                    </button>
                    </Form>
                )}
                </Formik>
                {/* <input type="text" className="food-modal-search-input"></input>
                <button className="food-modal-search-button" onClick={()=>fetchFoodData(dispatch)}>Search</button> */}
                </div>
                <div className="food-modal-table-container">
                    <div className="food-modal-table">
                        <div className="food-modal-table-row">
                            <div className="food-modal-table-col"> Description</div>
                            <div className="food-modal-table-col">Amount</div>
                            <div className="food-modal-table-col">kcal</div>
                        </div>
                        {createTable(fetchedFood,chosenDay,dispatch)}
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
                        <button className="food-modal-bottom-add-button"
                        onClick={()=>{postFoodToDay(chosenFood);
                            getJournalDayAfterPost(dispatch,chosenDay);
                        }}>Add</button>
                    </div>

                </div>
            </div>
        </div>
        );
    }

    const createTable = (fetchedFood,chosenDay,dispatch) => {
        let table = [];
        for(let food in fetchedFood)
        table.push(
            <div className="food-modal-table-row" onClick={()=>dispatch(set_chosen_food(saveFoodToDay(fetchedFood[food], chosenDay)))}>
                <div className="food-modal-table-col"> {fetchedFood[food].description}</div>
                <div className="food-modal-table-col">{fetchedFood[food].householdServingFullText || fetchedFood[food].foodPortions[0].portionDescription || Math.floor(fetchedFood[food].inputFoods.map(ingredient => ingredient.ingredientWeight).reduce((weight, ingedientAmount)=>weight+ingedientAmount))+"g" }</div> 
                {/* <div className="food-modal-table-col">{fetchedFood[food].foodNutrients[fetchedFood[food].foodNutrients.length -1].amount}</div> */}
                <div className="food-modal-table-col">api failed</div>
            </div>
        )
        return table;
    }

    const createFoodToSave = (food) => {
        const foodToSave = {
            description: food.description,
            amount: 1,
            calories: food.foodNutrients[food.foodNutrients.length -1].amount
        };
        return foodToSave;
    }

    const saveFoodToDay = (food,chosenDay) =>{
        const foodToSave = createFoodToSave(food)
        const day ={
            dayDate: new Date(chosenDay.year,chosenDay.month-1,chosenDay.day+1),
            ...foodToSave
        }
        console.log(day);
        return day;
    }

    const postFoodToDay = (dayToPost) => {
        console.log(dayToPost);
        axios.post("http://localhost:3030/foods", dayToPost)
        .then(response=>{
            console.log(response);
        })
    }

    const fetchFoodData = (dispatch, fetchedFoodName) => {
        console.log("data here:")
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L&query=${fetchedFoodName}&pageSize=10&dataType=Survey (FNDDS)`)
        .then(response => {
            let fdcid_string = '';
            for(let item in response.data)
                fdcid_string+=`&fdcIds=${response.data[item].fdcId}`
            axios.get(`https://api.nal.usda.gov/fdc/v1/foods?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L${fdcid_string}&nutrients=208&nutrients=203&nutrients=204&nutrients=205`)
            .then(({data}) =>{
                console.log(data);
                console.log(data.map(x=>x.foodNutrients[x.foodNutrients.length-1]))
                dispatch(set_fetched_food(data));
            });
        })
    }

    
    const getJournalDayAfterPost = (dispatch,chosenDay) => {
        axios.get(`http://localhost:3030/days/${chosenDay.year}-${chosenDay.month.toString().padStart(2, "0")}-${chosenDay.day}T00:00:00.000Z`)
        .then(({data}) => {
            //console.log(data);
            dispatch(set_chosen_day_journal(data))
        })
    }


export default Food_modal;
