`use strict`

const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`
let cardsSubmitButton = $(`#card_submit_button`)
let movieFilter = '';

let directorName = $(`#director_name`).val();
let rating = $(`#rating`).val();
let year = $(`#year`).val();
let genre = $(`#genre`).val();
let actors = $(`#actors`).val();
let plot = $(`#plot`).val();

function deleteMovie(id) {
    console.log(id); // calls specific ID
    AJAX(serverURL + `/${id}` , `DELETE`)
        .then((response) => {
            fetch(serverURL).then(response => {
                response.json().then(movies => {
                    console.log(movies)
                    allTheMovies(movies);
                })
            })
        })
}

function editMovie(id) {
    console.log(id); // calls specific ID
    AJAX(serverURL + `/${id}` , `PUT`)
        .then((response) => {
            fetch(serverURL).then(response => {
                response.json().then(movies => {
                    console.log(movies)
                    allTheMovies(movies);
                })
            })
        })
}


$(document).on('click', '.edit_button', function() {
    // console.log(`Hey Girl`)
    console.log($(this).attr('data-id'));
    let editHTML = `<form>
                      <div class="form-row">
                        <div class="col">
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
                    </form>`
    $(this).parent().parent().html(editHTML);
});




function allTheMovies(movies) {
    movieFilter = `
        <div id="add_button" class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">Add Movie</div>
              <div class="card-body">
               <form>
                  <div class="form-row">
                    <div class="col">
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
        `
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
                                <button id="edit" type="button" class="btn btn-light edit_button" data-id = ${movies[i].id}>Edit</button>
                                <button id="delete" type="button" class="btn btn-light" onclick="deleteMovie(${movies[i].id})">Delete</button>
                                </div>
                              </div>
                            </div>
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
    directorName = $(`#director_name`).val();
    rating = $(`#rating`).val();
    year = $(`#year`).val();
    genre = $(`#genre`).val();
    actors = $(`#actors`).val();
    plot = $(`#plot`).val();



    AJAX(serverURL, `POST`, {
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

fetch(serverURL).then(response => {
    response.json().then(movies => {
        console.log(movies)


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


