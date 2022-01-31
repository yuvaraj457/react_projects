import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TwitterIcon from '@mui/icons-material/Twitter';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge } from '@mui/material';


import logo from '../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom';
import { authVerify, getAuthToken } from './authToken';
import { fetchCartProducts } from '../action/cartAction';
import { fetchUser, verifyAuth } from '../action/userAction';
import { deepPurple } from '@mui/material/colors';
import { authenticate } from '../core/apiCalls/user';
const pages = ['Mens', 'Womens', 'Electronics'];
const settings = [ 'MyAccount', 'Logout'];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation()
  const dispatch = useDispatch()
  
  
  

  const user = useSelector(state => state.userReducer.userDetails)
  const {isAuthenticated} = useSelector(state => state.userReducer)
  const {cartProducts} = useSelector(state => state.cartReducer)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const style = {
    background: 'black',
  }

  React.useEffect(() => {
    authenticate()
    .then(() => {
      dispatch(verifyAuth(true))
      dispatch(fetchCartProducts())
      dispatch(fetchUser())
    })
  },[dispatch])

 
  return (
    <AppBar style={style} position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box
            style={{ alignItems: 'center' }}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >

            <TwitterIcon />
            <Link to='/'>
              <img src={logo} className='brand-logo' alt='logo_pic' />
            </Link>
          </Box>



          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            style={{ alignItems: 'center' }}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <TwitterIcon />
            <Link to='/'>
              <img src={logo} className='brand-logo' alt='logo_pic' />
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={`/productType/${page}`} key={page}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          {
              isAuthenticated ?
            <>
              <Badge color="secondary" badgeContent={cartProducts?cartProducts.length:0}>
                <Link to='/cart' style={{ color: '#FFF' }}>
                <ShoppingBagIcon />
                </Link>
              </Badge>
              <Box sx={{ flexGrow: 0, ml: 4 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>{user.firstName && user.firstName[0].toUpperCase()}</Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link to={setting} style={{ textDecoration: 'none' }}>{setting}</Link></Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
            :
            <>{
            !(location.pathname === '/login' )&&
            <Link to='/login'>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>Login</Button>
            </Link>}
            </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

