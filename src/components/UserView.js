import { Fragment, useState, useEffect } from 'react';

import ProductCard from './ProductCard';

export default function UserView ( { productsData } ) {
	const [products, setProducts] = useState([]);

	console.log(productsData);	// to be removed

	useEffect(() => {
		const productsArray = productsData.map(product => {
			if (product.onStock === true) {
				return(
					<ProductCard productProp={ product } key={ product._id } />
				);
			}
			else {
				return null;
			}
		})
		setProducts(productsArray);
	}, [productsData])

	return(
		<Fragment>
			{ products }
		</Fragment>
	);
}