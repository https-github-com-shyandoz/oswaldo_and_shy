`use strict`

const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`


fetch(serverURL).then(response => {
    response.json().then(movies => {
        console.log(movies)

        let movieFilter = '';


        function allTheMovies(movies) {
            for (let i = 0; i < movies.length; i++) {

                movieFilter +=
                    `
                    <div class="container-fluid">
                        <div class="card-colums">
                          <div class="col-4 display-flex">
                            <div class="card">
                              <img src="${movies[i].poster}" class="card-img-top" alt="movie_poster">
                              <div class="card-body">
                                <h5 class="card-title">Title: ${movies[i].title}</h5>
                                <p class="card-text">Director: ${movies[i].director}</p>
                                <p class="card-text">Rating: ${movies[i].rating}</p>
                                <p class="card-text">Year: ${movies[i].year}</p>
                                <p class="card-text">Genre: ${movies[i].genre}</p>
                                <p class="card-text">Actors: ${movies[i].actors}</p>
                                <p class="card-text">Plot: ${movies[i].plot}</p>
                                <div>
                                <button id="edit" type="button" class="btn btn-light">Edit</button>
                                <button id="delete" type="button" class="btn btn-light">Delete</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
`
            }
            $(`#movie_body`).html(movieFilter)

        }
        movieFilter += `
        <div id="add_button" class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">Add Movie</div>
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
               
              </div>
            </div>
        `
        allTheMovies(movies);
    }) // end of .then

    function addMovies(){
        $('#add_button').click((newMovie)=>{

        })

    }
})

