import React, { useState } from 'react';
import {Link, Route, Switch, useLocation } from 'react-router-dom';
// import { RippleBadge } from './MaterialTheme/styled';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import  About  from './screens/userPage';
import  Users  from './screens/userPage';
import HomePage from './screens/homePage';
import {ProductsPage} from './screens/productsPage';
import { HomeNavbar } from './components/headers/HomeNavbar';
import  {OtherNavbar } from './components/headers/OtherNavbar';
import '../css/app.css';
import '../css/navbar.css'
import '../css/product.css'
import '../css/footer.css'
import Footer from './components/footer';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import HelpPage from './screens/helpPage';
import {CartItem}  from '../lib/types/search';
import useBasket from './hooks/useBasket';
// import AuthenticationModal from './components/auth';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../lib/sweetAlert';
import { Messages } from '../lib/config';
import MemberService from './services/MemberService';
import  {useGlobals}  from './hooks/useGlobals';
import AuthenticationModal from './components/auth';
function App() {
  const location  = useLocation()
  const {setAuthMember} = useGlobals()
  const {
    cartItems, 
    onAdd, 
    onRemove,
    onDelete,
    onDeleteAll,} = useBasket()
  const [signupOpen, setSignupOpen] = useState<boolean>(false)
  const [loginOpen, setLoginOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorElement] = useState<HTMLElement | null >(null)

  /** HANDLERS **/
  const handleSignupClose = () => setSignupOpen(false)
  const handleLoginClose = () => setLoginOpen(false)
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(e.currentTarget)
  }
  const handleCloseLogout = () => setAnchorElement(null)
  const handleLogoutRequest = async () => {
    try{
      const member = new MemberService()
      await member.logout()
      await sweetTopSuccessAlert("success", 700)
      setAuthMember(null)
    }
    catch (err) {
      console.log("error", err);
      sweetErrorHandling(Messages.error1)      
    }
  }
  return (
    <>
      {location.pathname === '/' 
        ? <HomeNavbar 
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete} 
            onDeleteAll = {onDeleteAll}
            setSignupOpen ={setSignupOpen}
            setLoginOpen = {setLoginOpen}
            anchorEl = {anchorEl} 
            handleLogoutClick = {handleLogoutClick}
            handleCloseLogout = {handleCloseLogout}
            handleLogoutRequest = {handleLogoutRequest}
             /> 
        : <OtherNavbar
            cartItems = {cartItems} 
            onAdd = {onAdd}
            onRemove = {onRemove} 
            onDelete = {onDelete} 
            onDeleteAll = {onDeleteAll}
            setSignupOpen ={setSignupOpen}
            setLoginOpen = {setLoginOpen}
            anchorEl = {anchorEl} 
            handleLogoutClick = {handleLogoutClick}
            handleCloseLogout = {handleCloseLogout}
            handleLogoutRequest = {handleLogoutRequest}
            /> 
        }
      <Switch>
        <Route path="/products"><ProductsPage onAdd = {onAdd}/></Route>
        <Route path="/orders"><OrdersPage /></Route>
        <Route path="/member-page"><UserPage/></Route>
        <Route path="/help"><HelpPage /></Route>
        <Route path="/"><HomePage/></Route>
      </Switch>
      <Footer/>
      <AuthenticationModal 
        signupOpen={signupOpen} 
        loginOpen={loginOpen} 
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  );
}



export default App;