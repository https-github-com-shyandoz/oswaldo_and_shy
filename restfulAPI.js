const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`


fetch(serverURL)
    .then(res => res.json())
    .then(data => console.log(data))