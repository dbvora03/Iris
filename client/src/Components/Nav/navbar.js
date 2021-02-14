import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {Link, useHistory} from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: false
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
          <Typography variant="h4" style={{textDecoration: "none"}} className={classes.title}><Link to="/home">IRIS</Link></Typography>

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar