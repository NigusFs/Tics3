import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../assests/logo.jpg'
import About from '../page/About'
import ListProblems from '../page/ListProblems';
import ListFilterDif from '../page/ListFilterDif';
import Problem from '../page/Problem';
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
                <Nav.Link> <Link to="/">Home</Link></Nav.Link>
                <Nav.Link> <Link to="/about">About</Link></Nav.Link>
                <Nav.Link> <Link to="/list-problems">List Problems</Link></Nav.Link>
                
                        
                </Nav>
            </Navbar>
      

        <Route exact path="/" component={Home} />
        <Route exact path="/list-problems" component={ListProblems} />
        <Route path="/about" component={About} />
        <Route path="/problem/:Id"  component={Problem} />
        <Route exact path="/list-filter/difficulty/:difficulty"  component={ListFilterDif} />
        
    </Router>
    );
}
// hay q mover las rutas a donde correspondan aqui esta todo y se ve feo
export default NavBarr;