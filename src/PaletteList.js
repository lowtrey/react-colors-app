import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MiniPalette from './MiniPalette';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import styles from './styles/PaletteListStyles';

function PaletteList(props) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletingId, setDeletingId] = useState('');
  const { palettes, classes } = props;
  const openDialog = id => {
    setOpenDeleteDialog(true); 
    setDeletingId(id);
  };
  const closeDialog = () => {
    setOpenDeleteDialog(false); 
    setDeletingId('');
  };
  const goToPalette = id => {
    props.history.push(`/palette/${id}`);
  };
  const handleDelete = () => {
    props.deletePalette(deletingId);
    closeDialog();
  };
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>ColorCopy</h1>
          <Link to='/palette/new'>Create Palette</Link>
        </nav>
          <TransitionGroup className={classes.palettes}>
            {palettes.map(palette => (
              <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                <MiniPalette 
                  goToPalette={goToPalette} 
                  openDialog={openDialog}
                  key={palette.id}
                  id={palette.id}
                  {...palette} 
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
      </div>
      < Dialog 
        open={openDeleteDialog} 
        onClose={closeDialog}
        aria-labelledby='delete-dialog-title'
      >
        <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Delete' />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary='Cancel' />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PaletteList);