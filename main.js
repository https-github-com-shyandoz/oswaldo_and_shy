`use strict`

const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`
let cardsSubmitButton = $(`#card_submit_button`)
let movieFilter = '';
let poster = $(`#poster_url`).val();
let directorName = $(`#director_name`).val();
let rating = $(`#rating`).val();
let year = $(`#year`).val();
let genre = $(`#genre`).val();
let actors = $(`#actors`).val();
let plot = $(`#plot`).val();

let localMovies;


function deleteMovie(id) {
    console.log(id); // calls specific ID
    AJAX(serverURL + `/${id}`, `DELETE`)
        .then((response) => {
            fetch(serverURL).then(response => {
                response.json().then(movies => {
                    console.log(movies)
                    allTheMovies(movies);
                })
            })
        })
}

function editMovie(id, data) {
    console.log(id); // calls specific ID
    AJAX(serverURL + `/${id}`, `PUT`, data)
        .then(movies => {
            console.log(movies)
            updateMovies();
        })
}


$(document).on('click', '.edit_button', function () {
    // console.log(`Hey Girl`)
    const movieToEditId = $(this).attr('data-id');
    const movieObject = localMovies.filter(movie => movie.id == movieToEditId)[0]; // gets movie object
    let editHTML = `<form>
                      <div class="form-row">
                        <div class="col">
                          <label>Poster URL</label>
                          <input type="text" class="form-control" id="poster_url${movieToEditId}" value="${movieObject.poster}">
                          <label>Title</label>
                          <input type="text" class="form-control" value="${movieObject.title}" id="movie_title${movieToEditId}">
                          <label>Director Name</label>
                          <input type="text" class="form-control" value="${movieObject.director}" id="director_name${movieToEditId}">
                          <label>Rating</label>
                          <input type="text" class="form-control" value="${movieObject.rating}" id="rating${movieToEditId}">
                          <label>Year</label>
                          <input type="text" class="form-control" value="${movieObject.year}" id="year${movieToEditId}">
                          <label>Genre</label>
                          <input type="text" class="form-control" value="${movieObject.genre}" id="genre${movieToEditId}">
                          <label>Actors</label>
                          <input type="text" class="form-control" value="${movieObject.actors}" id="actors${movieToEditId}">
                          <label>Plot</label>
                          <textarea type="text" class="form-control" id="plot${movieToEditId}" width="30px" hight="10px">${movieObject.plot}</textarea>
                          <hr>
                         <button type="button" class="btn btn-secondary btn-lg btn-block" id="card_submit_button${movieToEditId}">Update Movie</button>
                        </div>
                      </div>
                    </form>`
    $(this).parent().parent().html(editHTML);
    $(`#card_submit_button${movieToEditId}`).click((e) => {
        e.preventDefault();
        const updatedMovieObject = {
            poster: $(`#poster_url${movieToEditId}`).val(),
            title: $(`#movie_title${movieToEditId}`).val(),
            director: $(`#director_name${movieToEditId}`).val(),
            rating: $(`#rating${movieToEditId}`).val(),
            year: $(`#year${movieToEditId}`).val(),
            genre: $(`#genre${movieToEditId}`).val(),
            actors: $(`#actors${movieToEditId}`).val(),
            plot: $(`#plot${movieToEditId}`).val()

        }
    editMovie(movieToEditId, updatedMovieObject);
    })
});

function addYourMovie(movies) {

}

function allTheMovies(movies) {
    movieFilter = `
    <div class="container">
        <div id="add_button" class="card bg-light mb-3 p-5" style="width: 28rem;">
              <div class="card-header">Add Movie</div>
              <div class="card-body">
               <form>
                  <div class="form-row">
                    <div class="col">
                      <label>Poster URL</label>
                      <input type="text" class="form-control" id="poster_url">
                      <label>Title</label>
                      <input type="text" class="form-control" id="movie_title">
                      <label>Director Name</label>
                      <input type="text" class="form-control" id="director_name">
                      <label>Rating</label>
                      <input type="text" class="form-control" id="rating">
                      <label>Year</label>
                      <input type="text" class="form-control" id="year">
                      <label>Genre</label>
                      <input type="text" class="form-control" id="genre">
                      <label>Actors</label>
                      <input type="text" class="form-control" id="actors">
                      <label>Plot</label>
                      <textarea type="text" class="form-control" id="plot" width="30px" hight="10px"></textarea>
                      <hr>
                     <button type="button" class="btn btn-secondary btn-lg btn-block" id="card_submit_button">Add New Movie</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
    </div>    
`
    for (let i = 0; i < movies.length; i++) {

        movieFilter +=
            `
                    
                        
                         
                            <div class="card col-4">
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
                                <button id="edit" type="button" class="btn btn-light edit_button" data-id = ${movies[i].id}>Edit</button>
                                <button id="delete" type="button" class="btn btn-light" onclick="deleteMovie(${movies[i].id})">Delete</button>
                                </div>
                              </div>
                            </div>
                        
                        
                    
`
    }
    $(`#movie_body`).html(movieFilter) // after this, delete buttons are capable of doing things
    $(`#card_submit_button`).click(() => {
        addMovie();
        // refresh the movies var, asychronus call(set up as promise) ajax(url,get).then{update and pass }


        console.log('Done')
    })
}


// assaign a class with jquery addClass or attribute, give it `contenteditable="true"`
function addMovie() {
    let movieTitle = $(`#movie_title`).val();
    poster = $(`#poster_url`).val();
    directorName = $(`#director_name`).val();
    rating = $(`#rating`).val();
    year = $(`#year`).val();
    genre = $(`#genre`).val();
    actors = $(`#actors`).val();
    plot = $(`#plot`).val();


    AJAX(serverURL, `POST`, {
        poster: poster,
        title: movieTitle,
        director: directorName,
        rating: rating,
        year: year,
        genre: genre,
        actors: actors,
        plot: plot
    })
        .then((data) => {
            // console.log(data)
            fetch(serverURL).then(response => {
                response.json().then(movies => {
                    console.log(movies)
                    allTheMovies(movies);
                })
            })
        })


}


function AJAX(url, method = `GET`, data) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json', //all API's use this for codeup
        },
        body: JSON.stringify(data),
    };

    return fetch(url, options)
        .then(res => res.json())
        .then(responseData => console.log(responseData))
}

function updateMovies() {
    fetch(serverURL).then(response => {
        response.json().then(movies => {
            console.log(movies)
            localMovies = movies;


            let poster = $(`#poster_url`).val;
            let movieTitle = $(`#movie_title`).val();
            let directorName = $(`#director_name`).val();
            let rating = $(`#rating`).val();
            let year = $(`#year`).val();
            let genre = $(`#genre`).val();
            let actors = $(`#actors`).val();
            let plot = $(`#plot`).val();

            allTheMovies(movies);
        }) // end of .then


    })

}
updateMovies();
