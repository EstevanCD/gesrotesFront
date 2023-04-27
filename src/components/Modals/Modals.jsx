import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import Forms from "./Forms";
import { Close } from '@material-ui/icons';

export default function Modals({ open, handleClose }) {
  
  return (
    
    <Dialog maxWidth="lg" open={open} onClose={handleClose}>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <Close/>
        </Button>
      </DialogActions>
      <DialogContent>
        <Forms />
      </DialogContent>
    </Dialog>
  );
}
