import { Redirect, Link, useHistory } from 'react-router-dom';

import { Fragment, useState, useEffect, useContext } from 'react';

import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import '../css/Login.css';
import UserContext from '../UserContext';

export default function Login () {
	const history = useHistory();

	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		if (email !== '' && password !== '') {
			setIsLogged(true);
		}
		else {
			setIsLogged(false);
		}
	}, [email, password])

	const login = (e) => {
		e.preventDefault();

		fetch('https://limitless-gorge-38821.herokuapp.com/users/login', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);	// to be removed

			if (data.accessToken !== undefined) {
				localStorage.setItem('accessToken', data.accessToken);
				setUser( { accessToken: data.accessToken } );

				Swal.fire({
					title: `Welcome, ${ email }`,
					icon: 'success',
					text: 'Logged in successful.'
				})

				fetch('https://limitless-gorge-38821.herokuapp.com/users/details', {
					headers: {
						Authorization: `Bearer ${ data.accessToken }`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);	// to be removed

					if (data.isAdmin === true) {
						localStorage.setItem('email', data.email)
						localStorage.setItem('isAdmin', data.isAdmin)
						setUser({
							email: data.email,
							isAdmin: data.isAdmin
						})

						history.push('/products')
					}
					else {
						history.push('/')
					}
				})
			}
			else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again.'
				})
			}
			setEmail('');
			setPassword('');
		})
	}

	return(
		(user.accessToken !== null) ?
			<Redirect to="/" />
			:
			<Fragment>
				<h1 className="h1-Login">Login</h1>
				<Form className="form-Login border" onSubmit={ (e) => login(e) }>
					<Form.Group>
						<Form.Label className="form-label-Login">Email Address:</Form.Label>
						<Form.Control className="form-control-Login"
							type="email"
							placeholder="Enter your email here"
							value={ email }
							onChange={ e => setEmail(e.target.value) }
							required
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label className="form-label-Login">Password:</Form.Label>
						<Form.Control className="form-control-Login"
							type="password"
							placeholder="Enter your password here"
							value={ password }
							onChange={ e => setPassword(e.target.value) }
							required
						/>
					</Form.Group>

					<Form.Text className="form-text-Login">Dont have an account? Register <Link className="link-Login" to="/register">here</Link>.</Form.Text>

					{
						(isLogged) ?
							<Button className="button-Login" type="submit">Submit</Button>
						:
							<Button className="button-Login" type="submit" disabled>Submit</Button>
					}
				</Form>
			</Fragment>
	);
}