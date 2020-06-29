const chosenFoodReducer = (state ={}, action) => {
    switch(action.type){
        case 'SET_CHOSEN_FOOD':
            return state=action.payload;
        default:
            return state;
    }
}

export default chosenFoodReducer;