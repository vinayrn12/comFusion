import React, { Component } from 'react';
import { Navbar, NavbarBrand, Jumbotron, NavbarToggler, Collapse, NavItem, Nav, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Input, Label } from 'reactstrap';
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props){
      super(props);
      this.state = {
          isNavOpen: false,
          isModalOpen: false
      }
      this.toggleNav = this.toggleNav.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
  }

  toggleModal(){
      this.setState({
          isModalOpen: !this.state.isModalOpen
      })
  }

  toggleNav(){
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
  }

  handleLogin(event){
      event.preventDefault();
      this.toggleModal();
      alert(`Username-${this.username.value} password-${this.password.value} remember-${this.remember.checked}`)
  }

  render() {
    return(
    <React.Fragment>
      <Navbar dark expand="md">
        <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
                <img src="assets/images/logo.png" width="40" height="30" alt="Restorante com Fusion" ></img>
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink className="nav-link" to="/home" >
                            <span className="fa fa-home fa-lg"></span>  Home
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/aboutus" >
                            <span className="fa fa-info fa-lg"></span>  About Us
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/menu" >
                            <span className="fa fa-list fa-lg"></span>  Menu
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className="nav-link" to="/contactus" >
                            <span className="fa fa-address-card fa-lg"></span>  Contact Us
                        </NavLink>
                    </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span>  Login</Button>
                    </NavItem>
                </Nav>
            </Collapse>
        </div>
      </Navbar>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
        <ModalBody>
            <Form onSubmit={this.handleLogin}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" 
                           name="username" 
                           id="username"
                           innerRef={(input) => this.username=input}></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" 
                           name="password" 
                           id="password"
                           innerRef={(input) => this.password=input}></Input>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" 
                               name="remember"
                               innerRef={(input) => this.remember=input}></Input>
                        Remember Me
                    </Label>
                </FormGroup>     
                <Button type="submit" color="secondary" className="btn-md" value="submit">Login</Button>           
            </Form>
        </ModalBody>
      </Modal>
      <Jumbotron>
           <div className="container">
               <div className="row row-header">
                   <div className="col-12 col-sm-6">
                       <h1>Ristorante com Fusion</h1>
                       <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                   </div>
               </div>
           </div>
       </Jumbotron>
    </React.Fragment>
    );
  }
}

export default Header;