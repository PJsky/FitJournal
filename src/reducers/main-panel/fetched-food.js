const fetchedFoodReducer = (state =[], action) => {
    switch(action.type){
        case 'SET_FETCHED_FOOD':
            return state=action.payload;
        default:
            return state;
    }
}

export default fetchedFoodReducer;