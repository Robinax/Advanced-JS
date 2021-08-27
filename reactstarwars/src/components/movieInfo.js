import React,{useState,useEffect} from 'react';

const MovieInfo = ({setView, starWarsMoviesInfo}) =>{
    const [loading, setLoading] = useState(true);
    const[movieVehicles, setMovieVehicles] = useState ([])
    const [moviePlanets, setMoviePlanets] = useState([])
    const [truecharacterlist,settruecharacterlist]= useState([])
    const characterApi=starWarsMoviesInfo.characters;
    const planetApi = starWarsMoviesInfo.planets;
    const vehiclesApi = starWarsMoviesInfo.vehicles;
    const backHandler = () => {
        setView('')
    }

    
    useEffect(() =>{
        async function fetchpeople(){
            const reschar = await Promise.all(characterApi.map(url => fetch(url).then(reschar => reschar.json()))
            );
            const resplanet = await Promise.all(planetApi.map(url => fetch(url).then(resplanet => resplanet.json()))
            );
            const resvehicles = await Promise.all(vehiclesApi.map(url => fetch(url).then(resvehicles => resvehicles.json()))
            );
            setMovieVehicles(resvehicles)
            setMoviePlanets(resplanet)
            settruecharacterlist(reschar)
            setLoading(false)
        }
        fetchpeople();
    });



    return(
        <div>{loading ? <h1>Loading....</h1> :(
    <div style={{textAlign:'center', fontWeight:"900"}}><h1>  {starWarsMoviesInfo.title}: </h1><br></br> 
    <p>These things are in the movie</p>
    <div style = {{display:'flex',justifyContent:'space-around'}}>
    <div style={{}}>
        <h3 style={{}}>Characters</h3>
    {truecharacterlist.sort((a,b)=>{ 
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;})
        .map((people,i)=>{
        return <div key={i}>{people.name}</div>
    })}
    </div>
    <div style={{}}>
        <h3>Planets</h3>
        {moviePlanets.map((planets,i)=>{
        return <div key={i}>{planets.name}</div>
    })}
    </div>
    <div>
        <h3>Vehicles</h3>
        {movieVehicles.map((Vehicles,i)=>{
        return <div key={i}>{Vehicles.name}</div>
    })}
    </div>
</div>
     <br></br><button onClick={backHandler}>Back</button>
    </div>
        )}
    </div>)

}



export default MovieInfo;