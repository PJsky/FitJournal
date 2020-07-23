import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import { set_fetched_food } from '../../../actions/fetched-food';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {set_chosen_food} from '../../../actions/chosenFood';
import {set_chosen_day_journal} from '../../../actions/chosenDayJournal';
import {Doughnut,HorizontalBar} from 'react-chartjs-2';
<<<<<<< HEAD
// const BACKEND = "http://localhost:3030";
const BACKEND = "https://fit-journal-back.herokuapp.com";
=======

>>>>>>> c6295110f8bfb572bab2223061fa8d058b3d82d3

function Food_modal() {
    const fetchedFood = useSelector(state => state.fetchedFood);
    const chosenDay = useSelector(state => state.calendarDayOfYear);
    const chosenFood = useSelector(state => state.chosenFood);
    const chosenDayJournal = useSelector(state => state.chosenDayJournal);
    const dispatch = useDispatch();

    const [loading,setLoading] = useState(false);

    //NEEDED FOR CHART JS
    const [chartData,setChartData] = useState({
        
        labels: ['Protein', 'Carbohydrates', 'Fats'],
        datasets:[{label:'population',data:[61759,181045,153060],
        backgroundColor:["rgba(255,0,0,0.6)","rgba(0,0,255,0.6)","rgba(0,255,0,0.6)"]}]
      }
    );
    const [data, setData] = useState([0,0,0]);
    const [label, setLabel] = useState('calories');
    const [chartLabel, setChartLabel] = useState(['Protein', 'Carbohydrates', 'Fats']);
    const [colors, setColors] = useState(["rgba(255,0,0,0.6)","rgba(0,0,255,0.6)","rgba(0,255,0,0.6)","rgba(0,255,255,0.6)"]);
    
    useEffect(()=>{
        if(chosenFood.protein) {
<<<<<<< HEAD
            setData([Math.round(chosenFood.protein*4),Math.round(chosenFood.carbohydrates*4),Math.round(chosenFood.fat*9)])
            setChartLabel([`Protein: ${Math.round(chosenFood.protein)}g`,`Carbohydrates: ${Math.round(chosenFood.carbohydrates)}g`,`Fat: ${Math.round(chosenFood.fat)}g`])
=======
            setData([chosenFood.protein*4,chosenFood.carbohydrates*4,chosenFood.fat*9])
            setChartLabel([`Protein: ${chosenFood.protein}g`,`Carbohydrates: ${chosenFood.carbohydrates}g`,`Fat: ${chosenFood.fat}g`])
>>>>>>> c6295110f8bfb572bab2223061fa8d058b3d82d3
        }
        else setData([0,0,0])
    },[chosenFood])
    
    
    /////////////////////////////////////////

    return (
        <div className="food-modal">
            <div className="food-modal-content">
                <h3 className="food-modal-header">Journal Your Food</h3>
                <div className="food-modal-search">
                <Formik
                initialValues={{ searchFood:'' }}
                onSubmit={(values, { setSubmitting }) => {
                    setLoading(true);
                    setTimeout(() => {
                    fetchFoodData(dispatch, values['searchFood'], setSubmitting, setLoading);
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
                </div>
                <div className="food-modal-table-container">
                    <div className="food-modal-table">
                        <div className="food-modal-table-row">
                            <div className="food-modal-table-col"> Description</div>
                            <div className="food-modal-table-col">Amount</div>
                            <div className="food-modal-table-col">kcal</div>
                        </div>
                        <div className={loading?"food-modal-loading-container":"food-modal-loading-hidden"}>
                            <div className={loading?"food-modal-loading":"food-modal-loading-hidden"}></div>
                        </div>
                        {!loading?createTable(fetchedFood,chosenDay,chosenFood,dispatch):""}
                    </div>
                </div>
                <div className="food-modal-bottom">
                    <div className="food-modal-bottom-nutrition">
                        {getChart(chartData,data,chartLabel,label,colors)}
                        {/* ///////////////////////////// */}
                    </div>
                    <div className="food-modal-bottom-add">
                        {/* <div className="food-modal-bottom-add-input">
                            Amount:
                            <input type="text"></input> 
                            <select>
                                <option value="0">g</option>
                                <option value="1">g</option>
                                <option value="2">lbs</option>
                                <option value="3">kg</option>
                            </select>

                        </div> */}
                        <button className="food-modal-bottom-add-button"
                        onClick={()=>{postFoodToDay(dispatch,chosenFood,chosenDay);
                            //getJournalDayAfterPost(dispatch,chosenDay);
                        }}>Add</button>
                    </div>

                </div>
            </div>
        </div>
        );
    }

    const createTable = (fetchedFood,chosenDay,chosenFood,dispatch) => {
        let table = [];
        for(let food in fetchedFood)
        try{
        table.push(
            <div 
             className={JSON.stringify(saveFoodToDay(fetchedFood[food], chosenDay)) == JSON.stringify(chosenFood)? "food-modal-table-row food-modal-table-row-chosen": "food-modal-table-row"}
             onClick={()=>dispatch(set_chosen_food(saveFoodToDay(fetchedFood[food], chosenDay)))}>
                <div className="food-modal-table-col"> {fetchedFood[food].description}</div>
                <div className="food-modal-table-col">{fetchedFood[food].householdServingFullText || fetchedFood[food].foodPortions[0].portionDescription || Math.floor(fetchedFood[food].inputFoods.map(ingredient => ingredient.ingredientWeight).reduce((weight, ingedientAmount)=>weight+ingedientAmount))+"g" }</div> 
                <div className="food-modal-table-col">{fetchedFood[food].foodNutrients[fetchedFood[food].foodNutrients.length -1].amount}</div>
            </div>
        )}catch(e){}
        return table;
    }

    const createFoodToSave = (food) => {
        const foodToSave = {
            description: food.description,
            amount: 1,
            calories: food.foodNutrients[food.foodNutrients.length -1].amount,
            protein: food.foodNutrients[0].amount,
            carbohydrates: food.foodNutrients[2].amount,
            fat: food.foodNutrients[1].amount
        };
        return foodToSave;
    }

    const saveFoodToDay = (food,chosenDay) =>{
        const foodToSave = createFoodToSave(food)
        const day ={
            dayDate: new Date(chosenDay.year,chosenDay.month-1,chosenDay.day+1),
            ...foodToSave
        }
        return day;
    }

    const postFoodToDay = (dispatch,dayToPost,chosenDay) => {
<<<<<<< HEAD
        axios.post(BACKEND+"/foods", dayToPost, {
=======
        axios.post("http://localhost:3030/foods", dayToPost, {
>>>>>>> c6295110f8bfb572bab2223061fa8d058b3d82d3
            headers:{
                'auth-token' : localStorage.getItem("token")
            }
        })
        .then(response=>{
            getJournalDayAfterPost(dispatch,chosenDay);
        })
    }

    const fetchFoodData = (dispatch, fetchedFoodName, setSubmitting, setLoading) => {
        axios.get(`https://api.nal.usda.gov/fdc/v1/foods/list?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L&query=${fetchedFoodName}&pageSize=10&dataType=Survey (FNDDS)`)
        .then(response => {
            let fdcid_string = '';
            for(let item in response.data)
                fdcid_string+=`&fdcIds=${response.data[item].fdcId}`
            axios.get(`https://api.nal.usda.gov/fdc/v1/foods?api_key=wGktXjAGmU4BOV6Skdgke8Dg13ur5LV6zrB1jr6L${fdcid_string}&nutrients=208&nutrients=203&nutrients=204&nutrients=205`)
            .then(({data}) =>{
                dispatch(set_fetched_food(data));
                setSubmitting(false);
                setLoading(false);
            });
        })
    }

    
    const getJournalDayAfterPost = (dispatch,chosenDay) => {
<<<<<<< HEAD
        axios.get(`${BACKEND}/days/${chosenDay.year}-${chosenDay.month.toString().padStart(2, "0")}-${chosenDay.day.toString().padStart(2, "0")}T00:00:00.000Z`, {
=======
        axios.get(`http://localhost:3030/days/${chosenDay.year}-${chosenDay.month.toString().padStart(2, "0")}-${chosenDay.day.toString().padStart(2, "0")}T00:00:00.000Z`, {
>>>>>>> c6295110f8bfb572bab2223061fa8d058b3d82d3
            headers:{
                'auth-token' : localStorage.getItem("token")
            }
        })
        .then(({data}) => {
            dispatch(set_chosen_day_journal(data))
        })
    }

    const getChart = (chartData,data,chartLabel,label,colors) => {
        const sData = JSON.stringify(data);
        const sNoFoodChosen = JSON.stringify([0,0,0]);
        if(sData!=sNoFoodChosen)
        return(
                        <div className="food-modal-bars">
                            <div className="food-modal-bars-container">
                                            <HorizontalBar
                                data={{...chartData,
                                labels:chartLabel,    
                                datasets:[{
                                label:label,
                                data:data,
                                backgroundColor:colors,
                                }]}}
                                options={{maintainAspectRatio:false,
                                legend: {
                                display: false // hides the legend
                                },
                                tooltips: {
                                enabled: true, // hides the tooltip.
                                
                                },
                                scales: {
                                xAxes: [{
                                    display: false, // hides the horizontal scale
                                    stacked: true // stacks the bars on the x axis
                                }],
                                yAxes: [{
                                    display: false, // hides the vertical scale
                                    stacked: true // stacks the bars on the y axis
                                }],
                                responsive: true
                                }}}
                                />
                            </div>
                        </div>
        )
        else
        return(
            <p>No Food Chosen</p>
        )
    }
    
    


export default Food_modal;
