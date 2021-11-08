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
import {setConfigValue, signup} from "../../../util/APIUtils";
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import {sweetAlerts} from "../../../util/swals";

const WeatherNewsConfig = ({groups}) => {
    const [weather, setWeather] = useState('https://www.meteoblue.com/de/wetter/widget/three/frankfurt-am-main_deutschland_2925533?geoloc=fixed&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image');
    const [news, setNews] = useState('https://www.youtube.com/embed/T9wF9QYVIXM?autoplay=1');
    const onSubmitWeather = () => {
        setConfigValue("weather", weather).then(response =>  sweetAlerts('success', 'Wetter-Quelle geupdated!')).catch(error => {
            sweetAlerts('error', 'Fehler: Bitte überprüfen Sie Ihre Eingaben!')
        })
    };
    const onSubmitNews = () => {
        setConfigValue("news", news).then(response =>  sweetAlerts('success', 'Nachrichten-Quelle geupdated!')).catch(error => {
            sweetAlerts('error', 'Fehler: Bitte überprüfen Sie Ihre Eingaben!')
        })
    };

    console.log(groups)
    return(
        <Card>
            <CardHeader className="card-header" title="Nachrichten- und Wetterquelle ändern"/>


            <CardContent className="card-body">
                <form action="" method="post">
                    <Box mb={2}>
                        <TextField
                            label="News-Quelle"
                            fullWidth
                            onChange={event => setNews(event.target.value)}
                            defaultValue="https://www.youtube.com/embed/T9wF9QYVIXM?autoplay=1"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={onSubmitNews} variant="contained" color="primary">
                            Bestätigen
                        </Button>
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Wetter-Quelle"
                            fullWidth
                            onChange={event => setWeather(event.target.value)}
                            defaultValue="https://www.meteoblue.com/de/wetter/widget/three/frankfurt-am-main_deutschland_2925533?geoloc=fixed&nocurrent=0&noforecast=0&days=4&tempunit=CELSIUS&windunit=KILOMETER_PER_HOUR&layout=image"
                            margin="normal"
                            variant="outlined"
                        />
                        <Button onClick={onSubmitWeather} variant="contained" color="primary">
                            Bestätigen
                        </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    )
}
export default WeatherNewsConfig;