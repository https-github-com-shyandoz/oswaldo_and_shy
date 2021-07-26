`use strict`

const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`



fetch(serverURL).then(response => {
    response.json().then(movies => {
        console.log(movies)
            $('#movie-body').html(
                `
            <div>
               <p>Title: ${movies[0].title}</p>
               <p>Director: ${movies[0].director}</p>
               <img src="${movies[0].poster}">
            </div>
`
            )
    })
})

