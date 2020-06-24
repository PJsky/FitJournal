import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {set_modal_food,set_modal_biometric,set_modal_note,set_modal_hidden} from '../actions/modal';
import Food_modal from './Main_panel/Modals/Food_modal';
import Biometric_modal from './Main_panel/Modals/Biometric_modal';
import Note_modal from './Main_panel/Modals/Note_modal';


export default function Main_panel(){
    const modalState = useSelector(state => state.modalState)
    const dispatch = useDispatch();

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
            <table className="journal-day">
                <tr>
                <th> Description</th>
                <th> Amount</th>
                <th> Calories</th>
                </tr>
                <tr>
                <td> Description</td>
                <td> Amount</td>
                <td> Calories</td>
                </tr>
                <tr>
                <td> Description</td>
                <td> Amount</td>
                <td> Calories</td>
                </tr>

            </table>
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