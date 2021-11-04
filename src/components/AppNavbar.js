import { Link, NavLink } from 'react-router-dom';

import { Fragment, useContext } from 'react';

import { Navbar, Nav } from 'react-bootstrap';

import '../css/AppNavbar.css';
import UserContext from '../UserContext';

export default function AppNavbar () {
	const { user } = useContext(UserContext);

	let rightNav = (user.accessToken !== null) ?
		<Fragment>
			<Nav.Item className="nav-item-AppNavbar">
				<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/orders">Orders</Nav.Link>
			</Nav.Item>
			<Nav.Item className="nav-item-AppNavbar">
				<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/logout">Logout</Nav.Link>
			</Nav.Item>
		</Fragment>
	:
		<Fragment>
			<Nav.Item className="nav-item-AppNavbar">
				<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/login">Login</Nav.Link>
			</Nav.Item>
			<Nav.Item className="nav-item-AppNavbar">
				<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/register">Register</Nav.Link>
			</Nav.Item>
		</Fragment>

	return(
		<Navbar className="navbar-AppNavbar" expand="lg">
			<Navbar.Brand className="navbar-brand-AppNavbar" as={ Link } to="/">fragrans</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse className="justify-content-end">
				<Nav className="nav-AppNavbar">
					<Nav.Item className="nav-item-AppNavbar">
						<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/">Home</Nav.Link>
					</Nav.Item>
					<Nav.Item className="nav-item-AppNavbar">
						<Nav.Link className="nav-link-AppNavbar" as={ NavLink } to="/products">Products</Nav.Link>
					</Nav.Item>
					{rightNav}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}