import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from "i18next";

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
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Badge, InputAdornment, TextField } from '@mui/material';
import Switch from '@mui/material/Switch';
import { deepPurple } from '@mui/material/colors';



import logo from '../assets/images/logo.png'
import { fetchCartProducts } from '../action/cartAction';
import { fetchUser, verifyAuth } from '../action/userAction';
import { authenticate } from '../core/apiCalls/user';
import { fetchAllUsers } from '../action/adminAction';
import Dictaphone from '../components/speechRecognition/speech';

const pages = ['Mens', 'Womens', 'Electronics'];
const adminMenu = ['Product Upload', 'Product Edit', 'Manage Users']
const settings = ['MyAccount', 'Logout'];

export const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [lang, setLang] = React.useState('english');
  const location = useLocation()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let [searchParams, setSearchParams] = useSearchParams();
  const label = { inputProps: { 'aria-label': 'c' } };

  const user = useSelector(state => state.userReducer.userDetails)
  const { isAuthenticated, userDetails } = useSelector(state => state.userReducer)
  const { cartProducts } = useSelector(state => state.cartReducer)

  if (userDetails.userType === 'admin') {
    dispatch(fetchAllUsers())
  }

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
  }, [dispatch])

  // React.useEffect(() => {
  //   if(langChecked){
  //     i18n.changeLanguage('tn')
  //   }
  //   else{
  //     i18n.changeLanguage('en')
  //   }
  // },[])

  const langHandler = (e) => {
    if (lang === 'english') {
      i18n.changeLanguage('tn')
      setLang('tamil')
    }
    else {
      i18n.changeLanguage('en')
      setLang('english')
    }

  }

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
                  <Typography textAlign="center"><Link to={`/productType/${page}`} key={page}>{t(page)}</Link></Typography>
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
                  {t(page)}
                </Button>
              </Link>
            ))}
            {!(location.pathname === '/login') &&
            
            <Box sx = {{input : {color : 'white'}, marginTop:2, marginLeft:1}}>
              <Dictaphone/>
              <TextField
                id="input-with-icon-textfield"
                focused
                sx = {{input : {color : 'white'}}}
                onChange={(event) => {
                  let search = event.target.value;
                  if (search) {
                    setSearchParams({ search });
                  } else {
                    setSearchParams({});
                  }
                }}
                
                variant="standard"
              />
              <Link to={`/filteredProducts/${location.search}`}>
                <SearchIcon sx={{color:'white'}}/>
                {/* <Button  size="small" sx={{color:'white'}} startIcon={<SearchIcon sx={{color:'white'}}/>} >
                  search
                </Button> */}
              </Link>
            </Box>}
          </Box>
          {
            isAuthenticated ?
              <>
                {
                  userDetails.userType === 'admin' &&
                  <Box sx={{ marginRight: '10px', display: { xs: 'none', md: 'flex' } }}>
                    {adminMenu.map((menu) => (
                      <Link to={`/${menu}`} key={menu}>
                        <Button
                          onClick={handleCloseNavMenu}
                          sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {t(menu)}
                        </Button>
                      </Link>
                    ))
                    }
                  </Box>
                }
                <Badge color="secondary" badgeContent={cartProducts ? cartProducts.length : 0}>
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
                        <Typography textAlign="center"><Link to={setting} style={{ textDecoration: 'none' }}>{t(setting)}</Link></Typography>
                      </MenuItem>
                    ))}
                    <MenuItem>
                      En
                      <Switch
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="secondary"
                        checked={lang === 'tamil'}
                        onChange={() => langHandler()}
                      />
                      Tn
                    </MenuItem>
                  </Menu>
                </Box>
              </>
              :
              <>{
                !(location.pathname === '/login') &&
                <Link to='/login'>
                  <Button sx={{ my: 2, color: 'white', display: 'block' }}>{t('Login')}</Button>
                </Link>}
              </>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

