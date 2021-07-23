`use strict`


fetch(`https://tinted-quixotic-tractor.glitch.me/movies`).then(response => {
    response.json().then(movies => {
        console.log(movies)
    })
})