import modalReducer from './modal';
import fetchedFoodReducer from './fetched-food';

const reducers = {
    modalState: modalReducer,
    fetchedFood: fetchedFoodReducer
}

export default reducers;