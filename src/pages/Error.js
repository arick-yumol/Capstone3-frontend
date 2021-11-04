import { Link } from 'react-router-dom';

import { Container	} from 'react-bootstrap';

export default function Error () {
	return(
		<Container>
			<h3>Error 404!</h3>
			<h5>Page Not Found</h5>
			<p>Return to <Link to="/">Homepage</Link></p>
		</Container>
	);
}