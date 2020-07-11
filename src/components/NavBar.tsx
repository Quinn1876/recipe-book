import React from 'react'

import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

import { userData } from "../store/selectors";

const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    backgroundColor: theme.palette.background.paper
  },
  primaryText: {
    color: theme.palette.text.primary
  },
  listItem: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  drawerButton: {
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  },
  drawerTitle: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'left',
    padding: theme.spacing(1, 2)
  },
  toolBar: {
  }
}))

const NavBar: React.FC = ({children}) => {
  const classes = useStyles()
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const user = useSelector(userData)

  const toggleDrawer: (open: boolean) => (event: object) => void = open => _ => setDrawerOpen(open);

  const navigateTo = (uri: string) => (event: object) => {
    setDrawerOpen(false)
    history.push(uri)
  }

  const renderChildren = (children: React.ReactNode) =>
    React.Children.map(children, child => {
      if (React.isValidElement(child) && child.props && child.props.children && child.props.to) {
        return (
          <ListItem className={classes.listItem} onClick={navigateTo(child.props.to)}>
            <Button variant='text' color="inherit" fullWidth className={classes.drawerButton}>{child.props.children}</Button>
          </ListItem>
        )
      }
    })

  return (
    <AppBar position='sticky'>
      <Toolbar className={classes.toolBar}>
        {/* TODO Fix this */}
        {(user || true) && (<IconButton
          color="primary"
          classes={{
            colorPrimary: classes.primaryText,
          }}
          edge='start'
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>)}
        <Typography variant="h6">
          Recipe Book
        </Typography>
      </Toolbar>
      <Drawer anchor='left' open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.list}>
          {/* TODO: Add Icon to right in Drawer */}
          <Typography variant='h3' color="textPrimary" className={classes.drawerTitle}>Recipe Book</Typography>
          <Divider />
          <List>
            {renderChildren(children)}
          </List>
        </div>
      </Drawer>
    </AppBar>
  )
}

export default NavBar;
