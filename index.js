`use strict`


fetch(serverURL).then(response => {
    response.json().then(movies => {
        console.log(movies)
    })
})