import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

export default function UserCard ( { userProp } ) {
	const { _id, orderList } = userProp;

	console.log(userProp);	// to be removed

	return(
		<Card>
			<Card.Header>My Orders</Card.Header>
			<Card.Body>{ orderList }</Card.Body>
		</Card>
	);
}

UserCard.propTypes = {
	userProp: PropTypes.shape({
		orderList: PropTypes.array.isRequired
	})
}