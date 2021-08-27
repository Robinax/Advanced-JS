import React from 'react';



function Movies({movies,starWarsMoviesInformation}){
const movieInformationHandler = () =>{
    const movieInformation = movies;
    starWarsMoviesInformation(movieInformation)
}


    return(
        <div style={{textAlign:'center',border:'2px solid blue', padding:"10px"}} onClick={movieInformationHandler}>
          <div>Date of realease:{movies.release_date} -- Movie name: {movies.title}</div>
        </div>
    )

}
    
 
export default Movies;