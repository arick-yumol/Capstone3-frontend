import { Redirect } from 'react-router-dom';

import { useEffect, useContext } from 'react';

import UserContext from '../UserContext';

export default function Logout () {
	const { setUser, unsetUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		setUser( { accessToken: null } );
	}, [])

	return(
		<Redirect to="/login" />
	);
}