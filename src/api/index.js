import axios from 'axios';

const URL = '';


var options = {
  
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
    
  },
  headers: {
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
    'x-rapidapi-key': 'be1aa39750mshd38678dc0eabe9ep15374fjsn205e66490777'
  }
};

export  const getPlacesData =  async(type ,sw , ne)=>{
    console.log(sw , ne)
    try {
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,{
  
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': 'be1aa39750mshd38678dc0eabe9ep15374fjsn205e66490777'
            }
          });
        // console.log(data);
        return data;
    }catch(error){
        console.log(error);
    }
}