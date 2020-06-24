
export const increment_month = (number) => {
    
    return{
        type: 'INCREMENT_MONTH',
        payload: number
    }
}
export const decrement_month = (number) => {
    return{
        type: 'DECREMENT_MONTH',
        payload: number
    }
}

export const set_month = (number) => {
    return{
        type: 'SET_MONTH',
        payload: number
    }
}

export const increment_year = (number) => {
    return{
        type: 'INCREMENT_YEAR',
        payload: number
    }
}
export const decrement_year = (number) => {
    return{
        type: 'DECREMENT_YEAR',
        payload: number
    }
}

export const set_day_of_year = (number) => {
    return{
        type: "SET_DAY_OF_YEAR",
        payload:number
    }
}

export const set_calendar_years = () => {
    return{
        type: "SET_CALENDAR_YEARS",
    }
}
export const set_calendar_months = () => {
    return{
        type: "SET_CALENDAR_MONTHS",
    }
}
export const set_calendar_days = () => {
    return{
        type: "SET_CALENDAR_DAYS",
    }
}
