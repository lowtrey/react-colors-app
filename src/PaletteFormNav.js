import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import CssBaseline from '@material-ui/core/CssBaseline';
import PaletteMetaForm from './PaletteMetaForm';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import styles from './styles/PaletteFormNavStyles';

function PaletteFormNav(props) {
  const { classes, open, palettes, handleSubmit, handleDrawerOpen } = props;
  const [formShowing, setFormShowing] = useState(false);
  const hideForm = () => setFormShowing(false);
  const showForm = () => setFormShowing(true);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <AddToPhotosIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to='/'>
            <Button 
              color='secondary'
              variant='contained' 
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button 
            color="primary" 
            onClick={showForm}
            variant="contained"
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm 
          handleSubmit={handleSubmit} 
          palettes={palettes} 
          hideForm={hideForm}
        />
      )}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);