import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

import '../css/ProductCard.css'

export default function ProductCard ( { productProp } ) {
	const { _id, name, description, price } = productProp;

	console.log(productProp);	// to be removed

	return(
		<Card className="card-ProductCard">
			<Card.Header className="card-header-ProductCard">{ name }</Card.Header>
			
			<Card.Body className="card-body-ProductCard">
				<Link className="link-ProductCard" to={`/products/${ _id }`}>Learn More</Link>
			</Card.Body>
		</Card>
	);
}

ProductCard.propTypes = {
	productProp: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}