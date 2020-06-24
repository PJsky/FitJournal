const modalReducer = (state ="hidden", action) => {
    switch(action.type){
        case 'SET_MODAL_HIDDEN':
            return state="hidden";
        case 'SET_MODAL_FOOD':
            return state="food";
        case 'SET_MODAL_BIOMETRIC':
            return state="biometric";
        case 'SET_MODAL_NOTE':
            return state="note";
        default:
            return state;
    }
}

export default modalReducer;