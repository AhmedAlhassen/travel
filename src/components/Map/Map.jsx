import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper ,Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

import useStyle from './styles'

function Map({coordinates,setCoordinates,setBounders,places,setChildClicked}) {
    const classes = useStyle();

    const isDesktop = useMediaQuery('(min-width:600px)');
    

    return (
        <div>

            <div className={classes.mapContainer}>

                <GoogleMapReact
                bootstrapURLKeys={{key:'AIzaSyArZ1BqwufRf4eT221QdBY9hZBl4MwaWAc'}}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={''}
                onChange={(e)=>{
                    setCoordinates({lat:e.center.lat, lng:e.center.lng});
                    setBounders({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child)=> setChildClicked(child)}

                >
                {places?.map((place,i)=>(
                    <div
                    className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                    >
                        {
                            !isDesktop ? (
                                <LocationOnOutlinedIcon color="primary" fontSize="large" />
                            ) : (
                                <Paper elevation={3} className={classes.paper} >
                                    <Typography className={classes.Typography} gutterBottom variant="subtitle2">
                                        {place.name}
                                    </Typography>
                                    <img 
                                        className={classes.pointer}
                                        src={place.photo ? place.photo.images.large.url :  'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                        alt={place.name}
                                    />
                                    <Rating size="small" value={Number(place.rating)} readOnly />
                                </Paper>
                            )
                        }
                    </div>
                ))}

                </GoogleMapReact>

            </div>

        </div>
    )
}

export default Map
