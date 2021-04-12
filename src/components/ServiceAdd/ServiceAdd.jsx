import { useDispatch, useSelector } from "react-redux";
import { addService, changeServiceField } from "../../actions/actionCreators";
import Errors from '../Errors/Errors';

function ServiceAdd() {
	const { item, loading, error } = useSelector(state => state.serviceAdd);
	const dispatch = useDispatch();

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(changeServiceField(name, value))
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const body = {name: item.name, price: item.price};
		addService(dispatch, body);
	}

	return (
		<form onSubmit={handleSubmit}>
			<input name="name" value={item.name} onChange={handleChange}></input>
			<input name="price" value={item.price} onChange={handleChange}></input>
			<button type="submit" disabled={loading}>Save</button>
			{error && <Errors />}
		</form>
	)
}

export default ServiceAdd