

const calendarMenuStateReducer = (state = "calendar_days", action) => {
    switch(action.type){
        case "SET_CALENDAR_DAYS":
            return state="calendar_days";
        case "SET_CALENDAR_MONTHS":
            return state="calendar_months";
        case "SET_CALENDAR_YEARS":
            return state="calendar_years";
        default:
            return state;
    }
}


export default calendarMenuStateReducer;