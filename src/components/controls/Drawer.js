import React from 'react';
import { Route, withRouter } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/Shop';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { Menu, MenuItem, Drawer, AppBar, Toolbar, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import Login from '../Login'
import Register from '../Register'
import Account from '../Account'
import Home from '../Home'
import ProductsContainer from '../Products/ProductsContainer'
import CustomersContainer from '../Customers/CustomersContainer'
import BillsContainer from '../Billing/BillsContainer'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  typography: {
    flexGrow: 1
  }
}));

  const MiniDrawer = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { toggleLogin, handleAuth, history } = props
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pageTitle, setPageTitle] = React.useState('')

  const handlePageHeader = (str) => {
    setPageTitle(str)
  }

  const loggedInList = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      onClick: () => history.push('/')
    }, {
      text: 'Products',
      icon: <ShopIcon />,
      onClick: () => history.push('/products')
    },
    {
      text: 'Customers',
      icon: <AccessibilityIcon />,
      onClick: () => history.push('/customers')
    }, {
      text: 'Cart',
      icon: <ShoppingCartIcon />,
      onClick: () => history.push('/cart')
    }
  ]

  const loggedOutList = [
    {
      text: 'Home',
      icon: <HomeIcon />,
      onClick: () => { history.push('/')
        // handlePageHeader('Home')
      }
    },
    {
      text: 'Log In',
      icon: <LockOpenIcon />,
      onClick: () => {
        history.push('/login')
        // handlePageHeader('Log In')
      }
    }, {
      text: 'Register',
      icon: <AddCircleIcon />,
      onClick: () => history.push('/register')
    }
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.typography} variant="h6" noWrap>
            {pageTitle}
          </Typography>
          {
            toggleLogin && (
              <>
                <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  <PersonIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                    <MenuItem onClick={() =>{
                      history.push('/account')
                      handleClose()
                    } }>My account</MenuItem>
                    <MenuItem onClick={() => {
                      localStorage.removeItem('token')
                      handleAuth()
                      props.history.push('/')
                      handleClose()
                    }}>Logout</MenuItem>
                  </Menu>
              </>
            )
          }
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
          {
            toggleLogin ? (
              <List>
                {
                  loggedInList.map(item => {
                    return (
                      <ListItem button key={item.text} onClick={() => {
                        item.onClick()
                        handlePageHeader(item.text)
                      }}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    )
                  })
                }
              </List>
            ) : (
              <List>
                {
                  loggedOutList.map(item => {
                    return (
                      <ListItem button key={item.text} onClick={() => {
                        item.onClick()
                        handlePageHeader(item.text)
                      }}>
                        <ListItemIcon>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                      </ListItem>
                    )
                  })
                }
              </List>
            )
          }
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Route path='/login'>
          <Login handleAuth={handleAuth} />
        </Route>
        <Route path='/' component={Home} exact={true} />
        <Route path='/register' component={Register} />
        <Route path='/account' component={Account} />
        <Route path='/products' component={ProductsContainer} />
        <Route path='/customers' component={CustomersContainer} />
        <Route path='/cart' component={BillsContainer} />
      </main>
    </div>
  );
}

export default withRouter(MiniDrawer)