import React from 'react';
import styled from 'styled-components';
import { DialogTitle, Divider, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

interface Props {
  open: boolean;
  children?: React.ReactElement | React.ReactElement[];
  onClose: () => void;
  onSave: () => void;
  title: string;
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin:32px;
`;

const Drawer = styled(SwipeableDrawer)`
  .MuiPaper-root {
    border-radius: 32px 32px 0px 0px;
    min-height: 90vh;
    padding-left: 32px;
    padding-right: 32px;
  }
`;

const UserInputModal: React.FC<Props> = ({ open, children, onClose, onSave, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Drawer
      open={open}
      onClose={onClose}
      anchor="bottom"
      onOpen={(): void => {console.log(open); }}
    >
      <Container>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Typography color="primary" variant="h6">{title}</Typography>
        <Button onClick={onSave} color="primary" variant="contained">
          Save
        </Button>
      </Container>
      <Divider/>
      {children}
    </Drawer>
  ) : (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle disableTypography><Typography variant="h6" color="primary">{title}</Typography></DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserInputModal;
