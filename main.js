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
                        <div class="row row-cols-1 row-cols-md-2">
                          <div class="col mb-4">
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
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
`
            }
            $(`#movie_body`).html(movieFilter)
        }

        allTheMovies(movies);
    }) // end of .then


})

