import { Link, useParams } from 'react-router-dom';

import { useState, useEffect, useContext } from 'react';

import { Container, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

import '../css/SpecificProduct.css'
import UserContext from '../UserContext';

export default function SpecificProduct () {
	const { user } = useContext(UserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const { productId } = useParams();

	useEffect(() => {
		fetch(`https://limitless-gorge-38821.herokuapp.com/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
	}, [])

	const addProduct = (productId) => {
		fetch('https://limitless-gorge-38821.herokuapp.com/users/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				productId: productId
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	//to be removed
			
			if (data === true) {
				Swal.fire({
					title: 'Enjoy!',
					icon: 'success',
					text: `You successfully bought a bouquet of ${ name }s!`
				})
			}
			else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again!'
				})
			}
		})
	}

	return(
		<Container>
			<Card className="card-SpecificProduct">
					<Card.Header className="card-header-SpecificProduct">{ name }</Card.Header>

				<Card.Body className="card-body-SpecificProduct">
					<Card.Subtitle className="card-subtitle-SpecificProduct">{ description }</Card.Subtitle>
					<Card.Text className="card-text-SpecificProduct">₱ { price }</Card.Text>
				</Card.Body>

				{
					user.accessToken !== null ?
						<Link className="link-SpecificProduct" onClick={ () => addProduct(productId) }>Buy a Bouquet!</Link>
						:
						<Link className="link-SpecificProduct" to="/login">Login to buy a bouquet.</Link>
				}
			</Card>
		</Container>
	);
}