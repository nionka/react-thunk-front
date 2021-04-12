import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchServices, removeService } from "../../actions/actionCreators";
import Loader from '../Loader/Loader';
import Errors from '../Errors/Errors';
import { Link } from "react-router-dom";

function ServiceList() {
  const { items, loading, error } = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

	useEffect(() => {
		fetchServices(dispatch);	
	}, [dispatch])

	const handleRemove = id => {
		removeService(dispatch, id)
	}

	if (loading) {
		return <Loader />
	}

	if (error) {
		return <Errors />
	}

	return (
		<ul className="list">
			{items.map(item => (
				<li key={item.id}>
					{item.name}: {item.price}
					<Link to={`/services/${item.id}`} ><button className="edit-btn btn">✎</button></Link>
					<button className="btn" onClick={() => handleRemove(item.id)}>x</button>
				</li>
			))}
		</ul>
	)
}

export default ServiceList