import React,{useState,useEffect} from 'react';
import Movies from './components/Movies'
import './App.css';
import MovieInfo from './components/movieInfo';

function App(){
   const [starWarsMovies, setStarWarsMovie] = useState([]);
   const [starWarsMoviesInfo, setstarWarsMoviesInfo] = useState({});
   const [loading, setLoading] = useState(true);
   const [view, setView] = useState('');
    const initialUrl = 'https://swapi.dev/api/films/'
    
    useEffect(() =>{
        async function fetchMovies(){
            let res = await fetch(initialUrl)
            let data = await res.json();
            setStarWarsMovie(data.results);
            setLoading(false)
        }
        fetchMovies();
    },[]);


    const starWarsMoviesInformation = (movieInformation) => {
        setstarWarsMoviesInfo(movieInformation)
        setView('movieInfo')
    }

switch (view){
    case 'movieInfo':
        return(
            <div>
            <MovieInfo setView={setView} starWarsMoviesInfo={starWarsMoviesInfo} />
            </div> 
        )
        default:
            return(
                <div className="Card">
                    <div>{loading ? <h1>Loading....</h1> :(<div>
                    <div><h1 style={{
                        color:'white',
                        backgroundColor:'black',
                        padding:"10px",
                        textAlign:'center'}}
                        >StarWars Collection</h1></div>
                       {starWarsMovies.map((movies,i) =>{
                           return <Movies key={i} movies = {movies} starWarsMoviesInformation={starWarsMoviesInformation} />
                       })}
                    </div>
                    ) }
                </div>   
                </div>
            )}
}
export default App;
