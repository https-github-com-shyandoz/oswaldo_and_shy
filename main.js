`use strict`

const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`
let cardsSubmitButton = $(`#card_submit_button`)

function addMovie(){
    let movieTitle = $(`#movie_title`).val();
    let directorName = $(`#director_name`).val();
    let rating = $(`#rating`).val();
    let year = $(`#year`).val();
    let genre = $(`#genre`).val();
    let actors = $(`#actors`).val();
    let plot = $(`#plot`).val();

    AJAX(serverURL, `POST`, {
        movieTitle,
        directorName,
        rating,
        year,
        genre,
        actors,
        plot
    })
        .then((data) => {
            console.log(data)
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

    return  fetch(url, options)
        .then(res => res.json())
        .then(responseData => console.log(responseData))
}

fetch(serverURL).then(response => {
    response.json().then(movies => {
        console.log(movies)

        let movieFilter = '';
        let movieTitle = $(`#movie_title`).val();
        let directorName = $(`#director_name`).val();
        let rating = $(`#rating`).val();
        let year = $(`#year`).val();
        let genre = $(`#genre`).val();
        let actors = $(`#actors`).val();
        let plot = $(`#plot`).val();







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
            $(`#card_submit_button`).click(()=>{
                addMovie()
                console.log('help')
            })
        }
        movieFilter += `
        <div id="add_button" class="card bg-light mb-3" style="max-width: 18rem;">
              <div class="card-header">Add Movie</div>
              <div class="card-body">
               <form>
                  <div class="form-row">
                    <div class="col">
                      <label for id="move_title">Title</label>
                      <input type="text" class="form-control" id="movie_title">
                      <label for id="director_name">Director Name</label>
                      <input type="text" class="form-control" id="director_name">
                      <label for id="rating">Rating</label>
                      <input type="text" class="form-control" id="rating">
                      <label for id="year">Year</label>
                      <input type="text" class="form-control" id="year">
                      <label for id="genre">Genre</label>
                      <input type="text" class="form-control" id="genre">
                      <label for id="actors">Actors</label>
                      <input type="text" class="form-control" id="actors">
                      <label for id="plot">Plot</label>
                      <textarea type="text" class="form-control" id="plot" width="30px" hight="10px"></textarea>
                      <hr>
                     <button type="button" class="btn btn-secondary btn-lg btn-block" id="card_submit_button">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        `
        allTheMovies(movies);
    }) // end of .then




    // AJAX(serverURL + `${this}`, `DELETE`)
    //     .then(data => console.log(data))
})

