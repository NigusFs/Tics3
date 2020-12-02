import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../assests/logo.jpg'

import ListProblems from '../page/ListProblems';
import ListFilterDif from '../page/ListFilterDif';
import ListFilterCat from '../page/ListFilterCat';
import Problem from '../page/Problem';
import EditProblem from '../page/EditProblem';
import Home from "../page/Home";
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
                
               
                <Nav.Link> <Link to="/">Lista de Problemas</Link></Nav.Link>
                
                        
                </Nav>
            </Navbar>
      

        <Route exact path="/" component={ListProblems} />
        <Route exact path="/list-problems" component={ListProblems} />
        <Route exact path="/problem/:Id"  component={Problem} />
        <Route exact path="/list-filter/difficulty/:difficulty"  component={ListFilterDif} />
        <Route exact path="/list-filter/category/:category"  component={ListFilterCat} />
        <Route exact path="/edit/problem/:Id"  component={EditProblem} />
    </Router>
    );
}
// hay q mover las rutas a donde correspondan aqui esta todo y se ve feo
export default NavBarr;