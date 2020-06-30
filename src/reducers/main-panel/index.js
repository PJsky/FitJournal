import modalReducer from './modal';
import fetchedFoodReducer from './fetched-food';
import chosenFoodReducer from './chosenFood';
import chosenDayJournalReducer from './chosenDayJournal';

const reducers = {
    modalState: modalReducer,
    fetchedFood: fetchedFoodReducer,
    chosenFood: chosenFoodReducer,
    chosenDayJournal: chosenDayJournalReducer
}

export default reducers;