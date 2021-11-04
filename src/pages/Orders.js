import { Fragment, useState, useEffect } from 'react';

import { Table } from 'react-bootstrap';

import '../css/Orders.css';

export default function Orders () {
	const [allOrders, setAllOrders] = useState([]);

	console.log(allOrders);	// to be removed

	const fetchOrders = () => {
		fetch('https://limitless-gorge-38821.herokuapp.com/users/orders', {
			method: 'GET',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			let ordersArray = data.map(order => {
				console.log(data);	// to be removed

				if (order.length !== 0) {
					console.log(order);	// to be removed
					console.log(order._id);	// to be removed
					console.log(order.productId);	// to be removed
					console.log(order.orderDate);	// to be removed
					
					return(
						<tr>
							<td>{ order._id }</td>
							<td>{ order.productId }</td>
							<td>{ order.orderDate }</td>
						</tr>
					);
				}
				else {
					return null;
				}
			})
			setAllOrders(ordersArray);
		})
	}

	useEffect(() => {
		fetchOrders();
	}, [])

	return(
		<Fragment>
			<h1 className="h1-Orders mt-5 mb-3 text-center">My Orders</h1>
			<Table striped bordered responsive>
				<thead className="thead-Orders">
					<tr>
						<td>_id</td>
						<td>productId</td>
						<td>orderDate</td>
					</tr>
				</thead>
				<tbody className="tbody-Orders">
					{ allOrders }
				</tbody>
			</Table>
		</Fragment>
	);
}