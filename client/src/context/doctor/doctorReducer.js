export default (state,action) => {
    switch(action.type) {
        case 'GET_PATIENT_LIST':
            return{
                ...state,
                patientlist: [...action.payload],
                loading:false
            };
        case 'GET_PREDICTIONS':
            return{
                ...state,
                predictions:[...action.payload,],
                loading: false
            };
        case 'FILTER_PATIENT_LIST':
            return{
                ...state,
                filteredPatientlist: state.patientlist.filter(patient => {
                    const regex = new RegExp(`${action.payload}`,'gi');
                    return patient.name.match(regex) || patient.email.match(regex); 
                })
            };
        case 'FILTER_PREDICTIONS':
            return{
                ...state,
                filteredPredictions: state.predictions.filter(prediction => {
                    return state.patientlist.filter(patient => {
                        return patient.id === prediction.patient.id;
                    }) 
                })
            };
        case 'CLEAR_PREDICTIONS':
            return{
                ...state,
                patientlist: null,
                predictions: null,
                filteredPredictions: null,
                filteredPatientlist: null,
                error: null
            }
        case 'CLEAR_FILTER': 
        return{
            ...state,
            filteredPredictions: null,
            filteredPatientlist: null
        };
        case 'PREDICTION_ERROR': 
            return{
                ...state,
                error: action.payload
            }
        default: 
          return state;
    }
}