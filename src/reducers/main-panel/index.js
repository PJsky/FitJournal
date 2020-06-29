import modalReducer from './modal';
import fetchedFoodReducer from './fetched-food';
import chosenFoodReducer from './chosenFood';

const reducers = {
    modalState: modalReducer,
    fetchedFood: fetchedFoodReducer,
    chosenFood: chosenFoodReducer
}

export default reducers;