import { Link } from 'react-router-dom';

import { useContext } from 'react';

import { Card } from 'react-bootstrap';

import '../css/Banner.css';
import UserContext from '../UserContext';

export default function Banner () {
	const { user } = useContext(UserContext);

	return(
		<Card className="card-Banner">
			<Card.Body className="card-body-Banner">
				<h1 className="h1-Banner">fragrans</h1>
				<p className="p-Banner">Perfect for all occasions!</p>
				{	
					(user.accessToken !== null) ?
						<Link className="link-Banner" to="/products">Get a bouquet now!</Link>
						:
						<Link className="link-Banner" to="/login">Get a bouquet now</Link>
				}
			</Card.Body>
		</Card>
	);
}