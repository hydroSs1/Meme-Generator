import {Navbar, Nav} from 'react-bootstrap';
import Profile from './icons';
import React from 'react';
import {Link} from 'react-router-dom';


import {Button} from 'react-bootstrap';


function MyNavbar(props){

  const handleClick = (event) =>{
    event.preventDefault();
    props.showModal(true);
  }


    return(
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              <Link to="/">
                  <Navbar.Brand href="/">MemeHub</Navbar.Brand>
              </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          {props.logged ?
          (<Nav className="mr-auto">
      
          <Nav.Link href="" onClick= {handleClick}>Nuovo Meme</Nav.Link>
      
          </Nav>):(<React.Fragment></React.Fragment>)}
          <Nav>
          {props.logged ? 
          <Button onClick={props.doLogout}>Logout</Button> :<Button href = "/login"> Login</Button> }
          <Nav.Link href="#">
          <Profile href="#"></Profile> 
          </Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
}

export default MyNavbar;