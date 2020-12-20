import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Logo from '../assests/cat-white.svg'

import ListProblems from '../page/ListProblems';
//import ListFilterDif from '../page/ListFilterDif';
import ListFilterCat from '../page/ListFilterCat';
import Problem from '../page/Problem';
import EditProblem from '../page/EditProblem';
import EditCatProblem from '../page/EditCatProblem';
import EditTCasesProblem from '../page/EditTCasesProblem';
import AddTCasesProblem from '../page/AddTCasesProblem';
import ModalLogin from '../components/ModalLogin';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav } from 'react-bootstrap';
import  {Button, message}  from 'antd';

const is_user_auth = () => {
    const token = sessionStorage.getItem("token")
    if (token){
      return true
    }
    return false
  }

  const startDaemon = () => {
    setTimeout(()=>{ message.success(`Se ha iniciado la busqueda del demonio`,7);},4500);
    fetch(`http://127.0.0.1:8000/finder/daemon/`, {
        method: 'POST',
    }).then((response)=>{
        if (response.status == 200){
          message.success(`Se ha completado la busqueda del demonio`,7);
          window.location.reload(true);
        } else if (response.errors == response.total_judges){
            message.error(`No se pudo completar la busqueda `, 5);
        } else {
          message.warnig(`Hay ${response.errors } judges caidos`, 5);
        }
    })
  }

function NavBar() {
    const nombre=sessionStorage.getItem("user");
    const is_auth = is_user_auth()

    const buttonDaemon = () => {
    if(is_auth) {
        return <Button onClick={startDaemon}  ghost inline> Iniciar demonio </Button>
      }
    }
    const logout = () => {
        sessionStorage.removeItem("token");
        window.location.reload(true);
        }
        
    return(
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="/"> <img src={Logo} width="55" height="55" className="d-inline-block align-top"/></Navbar.Brand>

                <Nav className="mr-auto">

                    {(is_auth)? <Nav.Link onClick={logout}> Logout</Nav.Link> : <Nav.Link href="/login">Login</Nav.Link>}
                    <Nav.Link href="/">Lista de Problemas</Nav.Link>
                    
                    
                </Nav>
                {(is_auth)? <Navbar.Collapse className="justify-content-center">
                    <Navbar.Text >
                        Usuario : {nombre}
                    </Navbar.Text>
                </Navbar.Collapse>:null}
                   
                <Nav>
                    {buttonDaemon()}
                </Nav>


               
            </Navbar>

            <Route exact path="/" component={ListProblems} />
            <Route exact path="/login" component={ModalLogin}/>
            <Route exact path="/list-problems" component={ListProblems} />
            <Route exact path="/problem/:Id"  component={Problem} />
            {/*<Route exact path="/list-filter/difficulty/:difficulty"  component={ListFilterDif} />*/}
            <Route exact path="/list-filter/category/:category"  component={ListFilterCat} />
            <Route exact path="/edit/problem/:Id" component={EditProblem} />
            <Route exact path="/edit/category/problem/:Id" component={EditCatProblem} />
            <Route exact path="/edit/testcase/:Id" component={EditTCasesProblem} />
            <Route exact path="/add/testcase/problem/:Id" component={AddTCasesProblem} />

        </Router>
    );
}

export default NavBar;