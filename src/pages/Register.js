import { Redirect, Link, useHistory } from 'react-router-dom';

import { Fragment, useState, useEffect, useContext } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

import '../css/Register.css';
import UserContext from '../UserContext';

export default function Register () {
	const history = useHistory();

	const { user } = useContext(UserContext);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [address, setAddress] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verPassword, setVerPassword] = useState('');
	const [isRegistered, setIsRegistered] = useState(false);

	console.log(firstName);	// to be removed
	console.log(lastName);	// to be removed
	console.log(address);	// to be removed
	console.log(mobileNo);	// to be removed
	console.log(email);	// to be removed
	console.log(password);	// to be removed
	console.log(verPassword);	// to be removed

	useEffect(() => {
		if (firstName !== '' && lastName !== '' && address !== '' && mobileNo !== '' && email !== '' && password !== '' && verPassword !== '' && mobileNo.length === 11 && password === verPassword) {
			setIsRegistered(true)
		}
		else {
			setIsRegistered(false)
		}
	}, [firstName, lastName, address, mobileNo, email, password, verPassword])

	const register = (e) => {
		e.preventDefault();

		fetch('https://limitless-gorge-38821.herokuapp.com/users/duplicates', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)	// to be removed

			if (data === true) {
				Swal.fire({
					title: `Thank you for registering, ${ firstName }!`,
					icon: 'success',
					text: 'Registration successful.'
				})
				history.push('/login')
			}
			else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
				setFirstName('')
				setLastName('')
				setAddress('')
				setMobileNo('')
				setEmail('')
				setPassword('')
				setVerPassword('')
			}
		})
	}

	return(
		(user.accessToken !== null) ?
			<Redirect to="/" />
			:
			<Fragment>
				<h1 className="h1-Register">Register</h1>
				<Form className="form-Register border" onSubmit={ (e) => register(e) }>
					<Row>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">First Name:</Form.Label>
							<Form.Control className="form-control-Register"
								type="text"
								placeholder="Enter your first name here"
								value={ firstName }
								onChange={ e => setFirstName(e.target.value) }
								required
							/>
						</Form.Group>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">Last Name:</Form.Label>
							<Form.Control className="form-control-Register"
								type="text"
								placeholder="Enter your last name here"
								value={ lastName }
								onChange={ e => setLastName(e.target.value) }
								required
							/>
						</Form.Group>
					</Row>
					<Row>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">Email Address:</Form.Label>
							<Form.Control className="form-control-Register"
								type="email"
								placeholder="Enter your email here"
								value={ email }
								onChange={ e => setEmail(e.target.value) }
								required
							/>
						</Form.Group>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">Mobile Number:</Form.Label>
							<Form.Control className="form-control-Register"
								type="text"
								placeholder="Enter your mobile number here"
								value={ mobileNo }
								onChange={ e => setMobileNo(e.target.value) }
								required
							/>
						</Form.Group>
					</Row>

					<Form.Group>
						<Form.Label className="form-label-Register">Address:</Form.Label>
						<Form.Control className="form-control-Register"
							type="text"
							placeholder="Enter your address here"
							value={ address }
							onChange={ e => setAddress(e.target.value) }
							required
						/>
					</Form.Group>
					<Row>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">Password</Form.Label>
							<Form.Control className="form-control-Register"
								type="password"
								placeholder="Enter your password here"
								value={ password }
								onChange={ e => setPassword(e.target.value) }
								required
							/>
						</Form.Group>
						<Form.Group as={ Col }>
							<Form.Label className="form-label-Register">Verify Password</Form.Label>
							<Form.Control className="form-control-Register"
								type="password"
								placeholder="Verify your password here"
								value={ verPassword }
								onChange={ e => setVerPassword(e.target.value) }
								required
							/>
						</Form.Group>
					</Row>
					<Form.Text className="form-text-Register">Own an existing account? Login <Link className="link-Register" to="/login">here</Link>.</Form.Text>

					{isRegistered ?
						<Button className="button-Register" type="submit">Submit</Button>
						:
						<Button className="button-Register" type="submit" disabled>Submit</Button>
					}
				</Form>
			</Fragment>
	);
}