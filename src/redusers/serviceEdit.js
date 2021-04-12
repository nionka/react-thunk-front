import { CHANGE_EDIT_SERVICE_FIELD, EDIT_SERVICE_SUCCESS, FETCH_EDIT_SERVICE, FETCH_SERVICES_FAILURE, FETCH_SERVICES_REQUEST } from "../actions/actionTypes"

const initialState = {
  item: { id: '', name: '', price: '', content: ''},
  loading: false,
  error: null,
  success: false,
}

export default function serviceEditReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_EDIT_SERVICE_FIELD:
      const { name, value } = action.payload;
      return { ...state, item: {...state.item, [name]: value}}
    case FETCH_EDIT_SERVICE:
      const { item } = action.payload;
      return {...state, item: { id: item.id, name: item.name, price: item.price, content: item.content}, loading: false, error: null, success: false};
    case FETCH_SERVICES_FAILURE:
      const { error } = action.payload;
      return {...state, loading: false, error, success: false };
    case FETCH_SERVICES_REQUEST:
      return {...state, loading: true, error: null, success: false};
    case EDIT_SERVICE_SUCCESS:
      return {...initialState, success: true, loading: false};
    default:
      return state
  }
}