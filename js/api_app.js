const gallery = document.getElementById('gallery');


// Fetch Data Function
function fetchData(url) {
    return fetch(url).then(checkStatus).then(res => res.json())
        .catch(error => console.log('Looks like there was a problem', error))
}

//Check Status Function
function checkStatus(response) {
    if (response.ok === true) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//Gallery HTML Generator
function generateGalleryHTML(data) {
    const html = data.map(el =>
    `<div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${el.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${el.name.first} ${el.name.last}</h3>
            <p class="card-text">${el.email}</p>
            <p class="card-text cap">${el.location.city}, ${el.location.state}</p>
        </div>
    </div>` )

    gallery.innerHTML = html;
}

// generate modal
function generateModal (target) {
    const modalHTML = 
    `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${target.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">name</h3>
            <p class="modal-text">email</p>
            <p class="modal-text cap">city</p>
            <hr>
            <p class="modal-text">(555) 555-5555</p>
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>`
    document.querySelector('body').innerHTML = modalHTML;
}

let resultsArr = [];
// Fetch card data and display in gallery
fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(results => {
        resultsArr.push(results);
        generateGalleryHTML(results)
    })

//event listener
gallery.addEventListener('click', (e) => {
    console.log(e.target)
    let card = resultsArr.filter(el => el === e.target);
    console.log(card)
})