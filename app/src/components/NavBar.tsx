import React from 'react';

import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useAuthContext from '../hooks/auth-context';

//TODO Move to styled components
const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  primaryText: {
    color: theme.palette.text.primary,
  },
  listItem: {
    color: theme.palette.text.secondary,
    cursor: 'pointer',
  },
  drawerButton: {
    justifyContent: 'flex-start',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
  drawerTitle: {
    backgroundColor: theme.palette.primary.main,
    textAlign: 'left',
    padding: theme.spacing(1, 2),
  },
  toolBar: {},
}));

interface Props {
  children: React.ReactElement[] | React.ReactElement;
}

const NavBar: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer: (open: boolean) => (event: Record<string, unknown>) => void = open => (): void =>
    setDrawerOpen(open);

  const navigateTo = (uri: string) => (): void => {
    setDrawerOpen(false);
    history.push(uri);
  };

  const renderChildren = (children: React.ReactNode): React.ReactNode =>
    React.Children.map(children, child => {
      if (
        React.isValidElement(child) &&
        child.props &&
        child.props.children &&
        child.props.to
      ) {
        return (
          <ListItem
            className={classes.listItem}
            onClick={navigateTo(child.props.to)}
          >
            <Button
              variant="text"
              color="inherit"
              fullWidth
              className={classes.drawerButton}
            >
              {child.props.children}
            </Button>
          </ListItem>
        );
      }
    });

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.toolBar}>
        {/* TODO Fix this */}
        { isAuthenticated() && (
          <IconButton
            color="primary"
            classes={{
              colorPrimary: classes.primaryText,
            }}
            edge="start"
            onClick={(): void => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6">Recipe Book</Typography>
      </Toolbar>
      <Drawer anchor={matches ? 'bottom' : 'left'} open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className={classes.list}>
          {/* TODO: Add Icon to right in Drawer */}
          {!matches && (
            <Typography
              variant="h3"
              color="textPrimary"
              className={classes.drawerTitle}
            >
              Recipe Book
            </Typography>
          )}
          <Divider />
          <List>{renderChildren(children)}</List>
        </div>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
