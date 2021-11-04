import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';

import './App.css';
import UserContext from './UserContext';

import AppNavbar from './components/AppNavbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import Products from './pages/Products';
import SpecificProduct from './pages/SpecificProduct';
import Orders from './pages/Orders';
import Error from './pages/Error';

function App() {
    const [user, setUser] = useState({
        accessToken: localStorage.getItem('accessToken'),
        email: localStorage.getItem('email'),
        isAdmin: localStorage.getItem('isAdmin') === 'true'
    })

    const unsetUser = () => {
        localStorage.clear()
    }

    useEffect(() => {   // to be removed
        console.log(user);  // to be removed
        console.log(localStorage);  // to be removed
    }, [user])  // to be removed

    return(
        <UserContext.Provider value={ { user, setUser, unsetUser }}> 
            <Router>
                <AppNavbar />
                <Container>
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/login" component={ Login } />
                        <Route exact path="/logout" component={ Logout } />
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/products" component={ Products } />
                        <Route exact path="/products/:productId" component={ SpecificProduct } />
                        <Route exact path="/orders" component={ Orders } />
                        <Route component={ Error } />
                    </Switch>
                </Container>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
