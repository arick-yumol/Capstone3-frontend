import { useState, useEffect, useContext } from 'react';

import { Container } from 'react-bootstrap';

import UserContext from '../UserContext';

import AdminView from '../components/AdminView';
import UserView from '../components/UserView';

export default function Products () {
	const { user } = useContext(UserContext);

	const [allProducts, setAllProducts] = useState([]);

	console.log(allProducts);	// to be removed

	const fetchData = () => {
		fetch('http://localhost:4002/products/all')
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			setAllProducts(data);
		})
	}

	useEffect(() => {
		fetchData();
	}, [])

	return(
		<Container>
			{
				(user.isAdmin === true) ?
					<AdminView productsData={ allProducts } fetchData={fetchData} />
				:
					<UserView productsData={ allProducts } />
			}
		</Container>
	);
}