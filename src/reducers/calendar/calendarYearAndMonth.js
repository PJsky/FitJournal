let today = new Date();
let month = today.getMonth() + 1; //January is 0!
let year = today.getFullYear();

const calendarYearAndMonthReducer = (state = {
    month,
    year

}, action) => {
    switch(action.type){
        case 'INCREMENT_MONTH':
            return reducer_increment_month(state);
        case 'DECREMENT_MONTH':
            return reducer_decrement_month(state);
        case 'SET_MONTH':
            return {...state, month:action.payload};
        case 'INCREMENT_YEAR':
            return {...state, year:state.year+1};
        case 'DECREMENT_YEAR':
            return {...state, year:state.year-1};    
        default:
            return state;
    }
}


function reducer_increment_month(state){
    if(state.month>=12){
        state.year++;
        state.month=1;
    }else  
        state.month++;
    return {...state};      
}

function reducer_decrement_month(state){
    if(state.month<=1){
        state.year--;
        state.month=12;
    }else  
        state.month--;
    return {...state};      
}

export default calendarYearAndMonthReducer;