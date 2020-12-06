import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../assests/logo.jpg'

import ListProblems from '../page/ListProblems';
import ListFilterDif from '../page/ListFilterDif';
import ListFilterCat from '../page/ListFilterCat';
import Problem from '../page/Problem';
import EditProblem from '../page/EditProblem';
import ModalLogin from '../components/ModalLogin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';


function NavBarr() {
    return(
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        width="55"
                        height="55"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>

                <Nav className="mr-auto">
                    <Nav.Link href="/">Lista de Problemas</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
            </Navbar>
            <Route exact path="/" component={ListProblems} />
            <Route exact path="/login" component={ModalLogin}/>
            <Route exact path="/list-problems" component={ListProblems} />
            <Route exact path="/problem/:Id"  component={Problem} />
            <Route exact path="/list-filter/difficulty/:difficulty"  component={ListFilterDif} />
            <Route exact path="/list-filter/category/:category"  component={ListFilterCat} />
            <Route exact path="/edit/problem/:Id" component={EditProblem} />

        </Router>
    );
}

export default NavBarr;