import CardHeader from "@material-ui/core/CardHeader";
import {Box, CardContent} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {AuhMethods} from "../../../services/auth";
import {signup} from "../../../util/APIUtils";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const NewUser = ({groups}) => {
    const [username, setUsername] = useState('Demo User');
    const [name, setName] = useState('Admin');
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('demo#123');
    const dispatch = useDispatch();
    const onSubmit = () => {
        const signupRequest = Object.assign({}, {username: username, name: name, email: email, password: password});
        signup(signupRequest).then(response =>  sweetAlerts('success', 'Neuer Benutzer wurde erfolgreich angelegt')).catch(error => {
            sweetAlerts('error', 'Fehler: Bitte überprüfen Sie ihre Eingaben!')
        })
    };
    const sweetAlerts = (variant, title) => {
        const Toast = MySwal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: toast => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: variant,
            title: title,
        });
    };

    console.log(groups)
    return(
        <Card>
            <CardHeader className="card-header" title="Benutzer Anlegen"/>


            <CardContent className="card-body">
                <form action="" method="post">
                    <Box mb={2}>
                        <TextField
                            label="Benutzername"
                            fullWidth
                            onChange={event => setUsername(event.target.value)}
                            defaultValue="Username"
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="EMail"
                            fullWidth
                            onChange={event => setEmail(event.target.value)}
                            defaultValue="eMail"
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            type="password"
                            label="Passwort"
                            fullWidth
                            onChange={event => setPassword(event.target.value)}
                            margin="normal"
                            variant="outlined"
                        />
                    </Box>
                    <InputLabel htmlFor="name-select">Rolle/Berechtigung für:</InputLabel>
                    <Select id="name-select" defaultValue={"Admin"}  onChange={event => setName(event.target.value)}>
                        <MenuItem value="Admin">Administrator/Supervisor</MenuItem>
                        {groups}
                    </Select>
                    <br />
                    <br/>
                    <br/>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
                        <Button onClick={onSubmit} variant="contained" color="primary">
                            Bestätigen
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    )
}
export default NewUser;