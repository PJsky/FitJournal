import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {set_modal_food,set_modal_biometric,set_modal_note,set_modal_hidden} from '../actions/modal';
import {set_chosen_day_journal} from '../actions/chosenDayJournal';
import {log_in, log_out} from '../actions/auth';
import Food_modal from './Main_panel/Modals/Food_modal';
import Biometric_modal from './Main_panel/Modals/Biometric_modal';
import Note_modal from './Main_panel/Modals/Note_modal';
import axios from 'axios';


export default function Main_panel(){
    const modalState = useSelector(state => state.modalState)
    const chosenDay = useSelector(state => state.calendarDayOfYear);
    const chosenDayJournal = useSelector(state => state.chosenDayJournal);
    const isLogged = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [reloadFoods,setReloadFoods] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:3030/days/${chosenDay.year}-${chosenDay.month.toString().padStart(2, "0")}-${chosenDay.day.toString().padStart(2, "0")}T00:00:00.000Z`,
        {
            headers:{
                'auth-token' : localStorage.getItem("token")
            }
        })
        .then(({data}) => {
            //console.log(data);
            dispatch(set_chosen_day_journal(data));
            dispatch(log_in());
        }, (error) => {
            console.log("log out")
            dispatch(log_out());
        });
    },[chosenDay, reloadFoods])



    return(
        <main className="main-panel">
        <div className={modalState!="hidden"? "modal-active":"modal-hidden"}
        onClick={(e) => {
            if(e.target != document.querySelector(".modal-content"))
                dispatch(set_modal_hidden())}}>        </div>
            <div className={modalState!="hidden"? "modal-content": "modal-content-hidden" }>
                {getModal(modalState)}
            </div>

        <ul className="main-panel-button-bar">
            <li onClick={() => dispatch(set_modal_food())}>+ Food</li>
            <li onClick={() => dispatch(set_modal_biometric())}>+ Biometric</li>
            <li onClick={() => dispatch(set_modal_note())}>+ Note</li>
        </ul>
        <div className="journal-page">
            <div className="journal-page-table">
                <div className="journal-page-table-row">
                    <div className="journal-page-table-col"> Description</div>
                    <div className="journal-page-table-col">Amount</div>
                    <div className="journal-page-table-col">kcal</div>
                </div>
                {createTable(chosenDayJournal[0],reloadFoods,setReloadFoods)}
            </div>

        </div>

        </main>
    )

    
}


const getModal = (modalState) =>{
    let modal = [];
    if(modalState=="hidden") return
    if(modalState=="food")
        modal.push(
            <Food_modal/>
        )
    if(modalState=="biometric")
        modal.push(
            <Biometric_modal/>
        )
    if(modalState=="note")
        modal.push(
            <Note_modal/>
        )
    return modal;
}

const createTable = (fetchedJournalDay,reloadFoods,setReloadFoods) => {
    let table = [];
    try{console.log(fetchedJournalDay.foods)
        for(let food in fetchedJournalDay.foods)
        table.push(
            <div className="journal-page-table-row" onClick={()=>deleteFood(fetchedJournalDay.foods[food]._id,fetchedJournalDay.date,reloadFoods,setReloadFoods)}>
                <div className="journal-page-table-col">{fetchedJournalDay.foods[food].description}</div>
                <div className="journal-page-table-col">{fetchedJournalDay.foods[food].amount}</div> 
                <div className="journal-page-table-col">{fetchedJournalDay.foods[food].calories}
                {/* <div className="journal-page-table-delete">X</div> */}
                </div>
            </div>
        )
    }catch(e){}
    return table;
}

const deleteFood = (foodId, dayDate, reloadFoods, setReloadFoods) =>{
    // dayDate="";
    console.log(`id:${foodId}, dayDate:${dayDate}`);
    axios.delete("http://localhost:3030/foods", {data:{
        dayDate:dayDate,
        id:foodId
    },
    headers:{
        'auth-token' : localStorage.getItem("token")
    }}).then((response)=>{
        console.log(response);
        setReloadFoods(reloadFoods+1);
    })
}
