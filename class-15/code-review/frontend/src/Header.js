import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';



class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to='/' className='nav-link'style={{color:'white', padding:20}}>Home</Link></NavItem>
        <NavItem><Link to='/about' className='nav-link' style={{color:'white',padding:20}}>About</Link></NavItem>
      </Navbar>
    )
  }
}
export default Header;