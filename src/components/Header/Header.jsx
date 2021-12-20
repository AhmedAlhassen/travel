import React , {useState} from 'react';
import {Autocomplete} from '@react-google-maps/api';
import {AppBar, Toolbar , Typography ,InputBase , Box} from '@material-ui/core';
import SearchIcon  from '@material-ui/icons/Search';
import useStyles from './styles';
import { getPlacesData } from './../../api/index';

export default function Header({setCoordinates}) {

    const [autocomplete , setAutocomplete] = useState(null);

    const onLoad = (auotoC) => setAutocomplete(auotoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace.geometry.location.lat();
        const lng = autocomplete.getPlace.geometry.location.lng();
        setCoordinates({lat, lng});
    }

    const classes = useStyles();
    return (
        <div>
            <AppBar position='static'>

                <Toolbar className={classes.toolbar}>

                    <Typography variant="h5" className={classes.title}>
                        Advice Me
                    </Typography>
                    
                    <Box display="flex">

                        <Typography variant="h6" className={classes.title}>
                            Find New Cool Places
                        </Typography>

                        <Autocomplete 
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                        >
                            <div className={classes.search}>

                                <div className={classes.searchIcon} >

                                    <SearchIcon />
                                </div>
                                    <InputBase placeholder="Search ..." classes={{ root:classes.inputRoot , input:classes.inputInput}} />
                                

                            </div>
                        </Autocomplete>
                    </Box>

                </Toolbar>

            </AppBar>
        </div>
    )
}
