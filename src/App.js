import React , {useState, useEffect} from 'react';
import {CssBaseline , Grid } from '@material-ui/core'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import {getPlacesData} from './api'


const App = () =>{

        const [places,setPlaces] = useState([]);
        const [coordinates,setCoordinates] = useState({});
        const [bounders,setBounders] = useState({});
        const [childClicked, setChildClicked] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const [type , setType] = useState('restaurants');
        const [filteredPlaces , setFilteredPlaces] =useState([]);
    
    const [rating , setRating] = useState('');


        useEffect(()=>{
            navigator.geolocation.getCurrentPosition( ({coords:{latitude,longitude}})=>{
                // console.log(latitude,longitude)
                setCoordinates({lat:latitude,lng:longitude});
            } )
        },[]);

        useEffect(()=>{
            const filteredPlaces = places.filter((place)=>place.rating > rating);
            setFilteredPlaces(filteredPlaces);
        },[rating])

        useEffect(() => {
            // console.log(coordinates , bounders)
            // console.log(rating , type)
            if(bounders.sw && bounders.ne){
            setIsLoading(true);
            
            getPlacesData(type,bounders.sw , bounders.ne )
            .then((data)=>{
                setPlaces(data?.filter((place)=> place.name && place.num_reviews >0));
                setFilteredPlaces([]);
                setIsLoading(false);
            })
        }
        }, [type, bounders]);

        console.log(childClicked);


        return (
            <>
            <CssBaseline />
                <Header setCoordinates={setCoordinates} />
                <Grid container spacing={3} style={{width:'100%'}}>
                    <Grid item xs={12} md={4}>
                        <List 
                        places={ filteredPlaces.length  ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        rating={rating}
                        setRating={setRating}
                        setType={setType}

                         />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Map 
                            coordinates={coordinates}
                            setCoordinates={setCoordinates}
                            setBounders ={setBounders}
                            places={filteredPlaces.length  ? filteredPlaces : places}
                            setChildClicked={setChildClicked}

                        />
                    </Grid>
                </Grid>
                
            </>
        );

}
export default App;