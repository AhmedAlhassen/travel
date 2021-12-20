import React , {useState, useEffect, createRef} from 'react'
import { CircularProgress, Grid, Typography , InputLabel , MenuItem, FormControl, Select } from '@material-ui/core'

import useStyle from './styles'
import PlaceDetails from './../PlaceDetails/PlaceDetails';

export default function List({places, childClicked, isLoading, type, rating ,setType, setRating}) {

    const classes = useStyle();

    

    const [elRefs,setElRefs] = useState([]);   

    console.log( );
    useEffect(()=>{
        
        const refs = Array(places?.length).fill().map((_,i) => elRefs[i] || createRef() );
        console.log('refs',refs)
        setElRefs(refs);
    },[places])

    return (
        <div className={classes.container}>
            
            <Typography variant='h4' > Restaurants , Hotels & Attractions around You</Typography>

            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem" />
                </div>
            ) : (
                    <>
                        <FormControl className={classes.formControl}>
                            <InputLabel>Type</InputLabel>
                            <Select value={type} onChange={(e)=>setType(e.target.value)} >
                                <MenuItem value="restaurants">
                                Restaurants
                                </MenuItem>
                                <MenuItem value="hotels">
                                Hotels
                                </MenuItem>
                                <MenuItem value="attractions">
                                Attractions
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel>Rating</InputLabel>
                            <Select value={rating} onChange={(e)=>setRating(e.target.value)} >
                                <MenuItem value={0}>
                                All
                                </MenuItem>
                                <MenuItem value={3}>
                                Above 3.0
                                </MenuItem>
                                <MenuItem value={4}>
                                Above 4
                                </MenuItem>
                                <MenuItem value={4.5}>
                                Above 4.5
                                </MenuItem>
                            </Select>
                        </FormControl>

                        <Grid spacing={3} className={classes.list}>
                            { places?.map((place ,i)=>(

                                <Grid  item key={i} xs={12}>

                                    <PlaceDetails
                                    place={place}
                                    selected={Number(childClicked) === i}
                                    refProp={elRefs[i]}
                                    />

                                </Grid>
                            ) )}
                        </Grid>
                    </>
                )}
        </div>
    )
}
