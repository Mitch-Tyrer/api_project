const gallery = document.getElementById('gallery');
//create a modal div to hold the generated modals
const modalWindow = document.createElement('div');
modalWindow.setAttribute('id', 'modal-window');
document.querySelector('body').appendChild(modalWindow);

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
    `<div class="card" id="${el.login.username}">
        <div class="card-img-container">
            <img class="card-img" src="${el.picture.thumbnail}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${el.name.first} ${el.name.last}</h3>
            <p class="card-text">${el.email}</p>
            <p class="card-text cap">${el.location.city}, ${el.location.state}</p>
        </div>
    </div>` ).join('')

    gallery.innerHTML = html;
}

// generate modal
function generateModal (data) {
    
    data.forEach(el =>  {
        const modalDiv = document.createElement('div');
        modalDiv.className = 'modal-container'
        modalDiv.setAttribute('id', `${el.login.username}`);
        modalDiv.style.display = 'none'
        let modalHtml =  `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${el.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${el.name.first} ${el.name.last}</h3>
            <p class="modal-text">${el.email}</p>
            <p class="modal-text cap">${el.location.city}</p>
            <hr>
            <p class="modal-text">${el.phone}</p>
            <p class="modal-text">${el.location.street}, ${el.location.city},  ${el.location.state} ${el.location.postcode}</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>`
        modalDiv.innerHTML = modalHtml 
        document.querySelector('#modal-window').append(modalDiv);
    }); // end modal map
    
}


// Fetch card data and display in gallery
fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(results => {
        console.log(results)
        generateGalleryHTML(results);
        generateModal(results);
    });

//event listener
gallery.addEventListener('click', (e) => {
    let card;
    const modals = document.querySelectorAll('.modal-container');
    if(e.target.parentNode.parentNode.getAttribute('class') === 'card'){
        card = e.target.parentNode.parentNode
    } else {
        card = e.target
    }
    cardID = card.getAttribute('id');
    modals.forEach(el => {
        if(el.getAttribute('id') === cardID){
            el.style.display = 'block'
        }
    });//end iteration of modal elements
});//end card click listener

modalWindow.addEventListener('click', (e) => {
    if(e.target.getAttribute('class') === 'modal-container'){
        e.target.style.display = 'none'
    } else if (e.target.parentNode.type === 'button'){
        e.target.parentNode.parentNode.parentNode.style.display = 'none'
    }
});//end modal close buton