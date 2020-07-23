const chosenDayJournalReducer = (state ={}, action) => {
    switch(action.type){
        case 'SET_CHOSEN_DAY_JOURNAL':
            return state=action.payload;
        default:
            return state;
    }
}

export default chosenDayJournalReducer;