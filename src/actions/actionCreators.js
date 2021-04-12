import { ADD_SERVICE_FAILURE, ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS, CHANGE_EDIT_SERVICE_FIELD, CHANGE_SERVICE_FIELD, EDIT_SERVICE_SUCCESS, FETCH_EDIT_SERVICE, FETCH_REMOVE_SERVICE, FETCH_SERVICES_FAILURE, FETCH_SERVICES_REQUEST, FETCH_SERVICES_SUCCESS } from './actionTypes';

export const addServiceRequest = (name, price) => ({
  type: ADD_SERVICE_REQUEST, payload: {name, price}
});

export const addServiceSuccess = () => ({
	type: ADD_SERVICE_SUCCESS,
});

export const addServiceFailure = error => ({
	type: ADD_SERVICE_FAILURE, payload: { error } 
})

export function changeServiceField(name, value) {
	return {type: CHANGE_SERVICE_FIELD, payload: {name, value}};
}

export function changeEditServiceField (name, value) {
	return {type: CHANGE_EDIT_SERVICE_FIELD, payload: { name, value }}
}

export const fetchServicesRequest = () => ({
	type: FETCH_SERVICES_REQUEST,
});

export const fetchServiceFailure = error => ({
	type: FETCH_SERVICES_FAILURE, payload: { error }
})

export const fetchServiceSuccess = items => ({
	type: FETCH_SERVICES_SUCCESS, payload: { items }
})

export const fetchRemoveService = id => ({
	type: FETCH_REMOVE_SERVICE, payload: { id }
})

export const fetchEditService = item => ({
	type: FETCH_EDIT_SERVICE, payload: { item }
})

export const editServiceSuccess = () => ({
	type: EDIT_SERVICE_SUCCESS,
})

export const editService = async(dispatch, id) => {
	dispatch(fetchServicesRequest())
	try {
		const response = await fetch(`${process.env.REACT_APP_URL}/${id}`);

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		dispatch(fetchEditService(data))

	} catch (err) {
		dispatch(fetchServiceFailure(err.message))
	}
}

export const removeService = async(dispatch, id) => {
	dispatch(fetchServicesRequest());
	try {
		const response = await fetch(`${process.env.REACT_APP_URL}/${id}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error(response.statusText)
		}

	} catch (err) {
		dispatch(fetchServiceFailure(err.message))
	}

	fetchServices(dispatch)
}

export const fetchServices = async dispatch => {
	dispatch(fetchServicesRequest());
	try {
		const response = await fetch(process.env.REACT_APP_URL);

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();
		dispatch(fetchServiceSuccess(data))
	} catch (err) {
		dispatch(fetchServiceFailure(err.message))
	}
}

export const addService = async (dispatch, body) => {
	dispatch(addServiceRequest());
	dispatch(fetchServicesRequest());
	
	try {
		const response = await fetch(process.env.REACT_APP_URL, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(body)
		})

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		dispatch(editServiceSuccess());
		dispatch(addServiceSuccess());
	} catch (err) {
		dispatch(addServiceFailure(err.message));
		dispatch(fetchServiceFailure(err.message))
	}
	fetchServices(dispatch);
}