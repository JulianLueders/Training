import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box } from '@material-ui/core';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function FormDialog(data) {
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubscribe = () => {
        setOpen(false);
        data.handleAdd(age)
    }
    return (
        <Box>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Wallboard-Widget hinzufügen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wallboard-Widgets können hinzugefügt werden. Wählen Sie das passende Widget aus:
                    </DialogContentText>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        onChange={handleChange}
                    >
                        <MenuItem value={"Messages"}>Interne Nachrichten</MenuItem>
                        <MenuItem value={"HeadData"}>Datenübersicht</MenuItem>
                        <MenuItem value={"Groups"}>Gruppenauswertung</MenuItem>
                        <MenuItem value={"Lines"}>Lineauswertung</MenuItem>
                        <MenuItem value={"GroupTalktime"}>Gesprächszeitauswertung (Gruppen)</MenuItem>
                        <MenuItem value={"LineTalktime"}>Gesprächszeitauswertung (Lines)</MenuItem>
                        <MenuItem value={"News"}>Live-Nachrichten mit Video und Wetter</MenuItem>
                        <MenuItem value={"Distribution"}>Anrufverteilung</MenuItem>
                        <MenuItem value={"WQPrognosis"}>Wartefeldanalyse mit Prognose</MenuItem>
                        <MenuItem value={"WQLive"}>Wartefeld: Livedaten</MenuItem>


                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubscribe} color="primary">
                        Hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}