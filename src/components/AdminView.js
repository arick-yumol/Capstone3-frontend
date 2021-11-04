import { Fragment, useState, useEffect } from 'react';

import { Table, Form, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import '../css/AdminView.css';

export default function AdminView (productProp) {
	const { productsData, fetchData } = productProp;

	console.log(productProp);	// to be removed

	const [products, setProducts] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [showAdd, setShowAdd] = useState(false);
	const [showUpdate, setShowUpdate] = useState(false);
	const [productId, setProductId] = useState('');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);

	const openUpdate = (productId) => {
		fetch(`https://limitless-gorge-38821.herokuapp.com/products/${ productId }`)
		.then(res => res.json())
		.then(data => {
			setProductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price);
		})
		setShowUpdate(true);
	}
	const closeUpdate = () => {
		setName('');
		setDescription('');
		setPrice(0);
		setShowUpdate(false);
	}

	useEffect(() => {
		const productsArray = productsData.map(product => {
			return(
				<tr key={ product._id }>
					<td>{ product._id }</td>
					<td>{ product.name }</td>
					<td>{ product.description }</td>
					<td>{ product.price }</td>
					<td className={ product.onStock ? "text-success" : "text-danger" }>
						{ product.onStock ? "On stock" : "Out of stock" }
					</td>
					<td>
						<Button variant="primary" size="sm" onClick={ () => openUpdate(product._id) }>Update</Button>
						{product.onStock ?
							<Button variant="danger" size="sm" onClick={ () => archiveProduct(product._id, product.onStock) }>Archive</Button>
						:
							<Button variant="success" size="sm" onClick={ () => unarchiveProduct(product._id, product.onStock) }>Unarchive</Button>
						}
					</td>
				</tr>
			);
		})
		setProducts(productsArray);
	}, [productsData])

	const addProduct = (e) => {
		e.preventDefault();

		fetch('https://limitless-gorge-38821.herokuapp.com/products/add', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			if (data === true) {
				fetchData();

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: `${ name } has been added.`
				})

				setName('');
				setDescription('');
				setPrice(0);

				closeAdd();
			}
			else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	const updateProduct = (e, productId) => {
		e.preventDefault();

		fetch(`https://limitless-gorge-38821.herokuapp.com/products/${ productId }/update`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			if (data === true) {
				fetchData();

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: `${ name } has been updated.`
				})

				closeUpdate();
			}
			else {
				fetchData();

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	const archiveProduct = (productId, onStock) => {
		fetch(`https://limitless-gorge-38821.herokuapp.com/products/${ productId }/archive`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				onStock: onStock
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			if (data === true) {
				fetchData();

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product has been archived.'
				})
			}
			else {
				fetchData();

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	const unarchiveProduct = (productId, onStock) => {
		fetch(`https://limitless-gorge-38821.herokuapp.com/products/${ productId }/unarchive`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				onStock: onStock
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			if (data === true) {
				fetchData();

				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product has been archived.'
				})
			}
			else {
				fetchData();

				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
		})
	}

	return(
		<Fragment>
			<div className="text-center my-4">
				<h2 className="h2-AdminView">Admin Dashboard</h2>
				<Button className="div-btn-AdminView" onClick={ openAdd }>Add Product</Button>
			</div>
			<Table striped bordered responsive>
				<thead className="thead-AdminView">
					<tr>
						<td>_id</td>
						<td>Name</td>
						<td>Description</td>
						<td>Price</td>
						<td>Availability</td>
						<td>Actions</td>
					</tr>
				</thead>
				<tbody className="tbody-AdminView">
					{ products }
				</tbody>
			</Table>

			<Modal show={ showAdd } onHide={ closeAdd }>
				<Form onSubmit={ e => addProduct(e) }>
					<Modal.Header className="modal-header-AdminView" closeButton>
						<Modal.Title className="modal-title-AdminView">Add Product</Modal.Title>
					</Modal.Header>

					<Modal.Body className="modal-body-AdminView">
						<Form.Group>
							<Form.Label className="form-label-AdminView">Name:</Form.Label>
							<Form.Control type="text" value={ name } onChange={ e => setName(e.target.value) } required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="form-label-AdminView">Description:</Form.Label>
							<Form.Control type="text" value={ description } onChange={ e => setDescription(e.target.value) } required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="form-label-AdminView">Price:</Form.Label>
							<Form.Control type="number" value={ price } onChange={ e => setPrice(e.target.value) } required />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer className="modal-footer-AdminView">
						<Button variant="secondary" onClick={ closeAdd }>Close</Button>
						<Button className="submit-AdminView" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			<Modal show={ showUpdate } onHide={ closeUpdate }>
				<Form onSubmit={ e => updateProduct(e, productId) }>
					<Modal.Header className="modal-header-AdminView" closeButton>
						<Modal.Title className="modal-title-AdminView">Update Product</Modal.Title>
					</Modal.Header>

					<Modal.Body className="modal-body-AdminView">
						<Form.Group>
							<Form.Label className="form-label-AdminView">Name:</Form.Label>
							<Form.Control type="text" value={ name } onChange={ e => setName(e.target.value) } required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="form-label-AdminView">Description:</Form.Label>
							<Form.Control type="text" value={ description } onChange={ e => setDescription(e.target.value) } required />
						</Form.Group>
						<Form.Group>
							<Form.Label className="form-label-AdminView">Price:</Form.Label>
							<Form.Control type="number" value={ price } onChange={ e => setPrice(e.target.value) } required />
						</Form.Group>
					</Modal.Body>

					<Modal.Footer className="modal-footer-AdminView">
						<Button variant="secondary" onClick={ closeUpdate }>Close</Button>
						<Button className="submit-AdminView" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>
		</Fragment>
	);
}