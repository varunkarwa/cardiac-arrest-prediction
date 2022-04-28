export default (state,action) => {
    switch(action.type){
        case 'GET_PREDICTIONS':
            return{
                ...state,
                predictions:action.payload,
                loading:false
            };
        case 'FILTER_PREDICTIONS':
            return{
                ...state
            }
        case 'CLEAR_FILTER':
            return{
                ...state,
                filtered:null
            };
        case 'PATIENT_ERROR':
            return{
                ...state,
                error:action.payload
            }
        default:
            return state;
    }
}