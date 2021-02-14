import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import logo from './default2.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const NavBar = props => {
    const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'-webkit-linear-gradient(left, #0922d0, #34bde9)'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} style={{ height: '30px' }}/>
          </Typography> 
          <Button color="inherit">Menu Item</Button>
          <Button color="inherit">Menu Item 2</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar