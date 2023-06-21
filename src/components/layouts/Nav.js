import { React, useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IoMenu, IoHomeSharp, IoInformationCircle, IoList, 
IoStatsChart, IoBuild } from 'react-icons/io5'
import { Link } from 'react-router-dom';
import { Context } from '../../context/UserContext'
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { IoCart } from 'react-icons/io5'
import Styles from './nav.module.css'
import { Menu, MenuItem, Badge } from '@mui/material';
import { CartContext } from '../../context/CartContext';

const drawerWidth = 200;

///Componente de pesquisa
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Nav(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { authenticated, logout } = useContext(Context)
  const [anchorEl, setAnchorEl] = useState(null);
  const { productsToCart } = useContext(CartContext)


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  <ul>
    <li>
      <Link to='/'>Home</Link>
    </li>
    <li>
      <Link to='/products'>Produtos</Link>
    </li>

  </ul>

  const drawer = (
    <div className={Styles.drawer}>
      <Toolbar sx={{ marginBottom: 0 }} />

      <List>
        <Divider sx={{ backgroundColor: '#e2e2e2' }} />
        <Link to='/'>
          <ListItem disablePadding>
            <ListItemButton>
              <i><IoHomeSharp /></i>
              <p>Home</p>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider sx={{ backgroundColor: '#e2e2e2' }} />
        <Link to='/products'>
          <ListItem disablePadding>
            <ListItemButton>
              <i><IoList /></i>
              <p>Produtos</p>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider sx={{ backgroundColor: '#e2e2e2' }} />
        <Link to='/products'>
          <ListItem disablePadding >
            <ListItemButton>
              <i><IoInformationCircle /></i>
              <p>Sobre</p>
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider sx={{ backgroundColor: '#e2e2e2' }} />
      </List>
      <List>
        {authenticated ?
          (
            <>
              <Divider sx={{ backgroundColor: '#e2e2e2' }} />
              <Link to='/cashsales'>
                <ListItem disablePadding >
                  <ListItemButton>
                    <i><IoStatsChart /></i>
                    <p>Vendas</p>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Divider sx={{ backgroundColor: '#e2e2e2' }} />
              <Link to='/techservice'>
                <ListItem disablePadding >
                  <ListItemButton>
                    <i><IoBuild /></i>
                    <p>Manutenção</p>
                  </ListItemButton>
                </ListItem>
              </Link>
            </>
          ) :
          (
            <>
            </>
          )
        }
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar className={Styles.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <IoMenu />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Service Informática
            </Typography>
            <div className={Styles.apps_right}>
              <div className={Styles.search}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Buscar..."
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
              </div>
              {authenticated ? (
                <>
                  <div>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                      
                    </IconButton>

                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Perfil</MenuItem>
                      <MenuItem onClick={logout}>Sair</MenuItem>
                    </Menu>
                    <Link to='/cart'>
                    <Badge badgeContent={productsToCart.length} color="error">
                            <IoCart color="#fff" style={{fontSize: "30px"}}/>
                        </Badge>
                    </Link>
                  </div>
                </>
              ) : (
                <>

                  <Link to='/login'>Login</Link>

                </>
              )}

            </div>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >

        </Box>
      </Box>

 
    </>
  )
}