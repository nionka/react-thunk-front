import ServiceList from '../ServiceList/ServiceList';
import ServiceAdd from '../ServiceAdd/ServiceAdd';

function HomePage() {
	return (
		<>
			<ServiceAdd />
			<ServiceList />
		</>
	)
}

export default HomePage