import React from "react";
import {AppBar, Toolbar, IconButton, Typography, Button, Link, makeStyles} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu"

const useStyles = makeStyles(theme => ({
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

export default props => {
  const classes = useStyles(props);
  const {children} = props;
  return (
    <div classes={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link href="/" color="inherit" underline="none">Society of Cells</Link>
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  )
}
