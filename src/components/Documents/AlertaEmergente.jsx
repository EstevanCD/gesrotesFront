import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';

const AlertWindow = () => {
  const [open, setOpen] = useState(true);



  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Alerta</DialogTitle>
        <DialogContent>
          <DialogContentText>¡Esto es una alerta!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertWindow;