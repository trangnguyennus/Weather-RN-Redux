import getTemperature from '../api/getTemperature'

export function startFetchingData(){
    return {type: 'START_FETCH'}
}

export function fetchSuccessful(cityName, temp){
    return {
    type: 'FETCH_SUCCESS',
    cityName,
    temp
  }
}

export function fetchError(){
    return {type: 'FETCH_ERROR'}
}

export function fetchTemperatureThunk(cityName){
    return dispatch => {
        dispatch(startFetchingData());
        getTemperature(cityName)
          .then(temp => dispatch(fetchSuccessful(cityName, temp)))
          .catch(() => dispatch(fetchError()))
    };
}

