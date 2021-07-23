const serverURL = `https://tinted-quixotic-tractor.glitch.me/movies`

// this is a simple get request


// const objToSend = {
//     user: `Sherman'n`,
//     message: `Really enjoyed the Movies Application!`
// };
//
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json', //response in json format
//     },
//     body: JSON.stringify(objToSend),
// };
// fetch(serverURL, options)
//     .then( response => console.log(response) ) /* review was created successfully */
//     .catch( error => console.error(error) ); /* handle errors */


// basically jquery ajax request

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

// AJAX(serverURL, `POST`, {title: `We built our own ajax function`})
// .then((data) => {
//     console.log(data)
// })
//This is to fetch a single movie
// AJAX(serverURL + `/3`)
// .then(data => console.log(data))


// send request to server and target whatever had id of 9 and
// will override message and name with what we have
// //this is to updatae an indiviual movie
// PATCH METHOD
AJAX(serverURL + `/9`, `PATCH`, {
    message: `We are really ready for the weekend!`
})
    .then(data => console.log(data))


//
// AJAX(serverURL)
// .then(data => console.log(data))