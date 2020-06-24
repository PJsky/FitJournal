let today = new Date();
let day = today.getDate();
let month = today.getMonth() + 1; //January is 0!
let year = today.getFullYear();


const calendarDayOfYearReducer = (state = {
    day,
    month,
    year
}, action) => {
    switch(action.type){
        case "SET_DAY_OF_YEAR":
            return state=action.payload;
        default:
            return state;
    }
}


export default calendarDayOfYearReducer;