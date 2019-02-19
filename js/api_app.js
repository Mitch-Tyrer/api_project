const gallery = document.getElementById('gallery');
let dataResults;

//create a no results for search
const noResults = document.createElement('h3');
noResults.innerText = 'No Results Found';
noResults.style.display = 'none'


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
    gallery.appendChild(noResults);
}

// generate modal
function generateModal(el, index) {
    //data.forEach(el => {
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container'
    modalDiv.setAttribute('id', `${el.login.username}`);
    //modalDiv.style.display = 'none'
    let modalHtml = `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src=${el.picture.large} alt="profile picture">
            <h3 id="name" class="modal-name cap">${el.name.first} ${el.name.last}</h3>
            <p class="modal-text">${el.email}</p>
            <p class="modal-text cap">${el.location.city}</p>
            <hr>
            <p class="modal-text">${el.phone}</p>
            <p class="modal-text">${el.location.street}, ${el.location.city},  ${el.location.state} ${el.location.postcode}</p>
            <p class="modal-text">Birthday: ${el.dob.date}</p>
        </div>
        <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`
    modalDiv.innerHTML = modalHtml
    document.querySelector('#modal-window').append(modalDiv);
    modalScroll(index)
    // }); // end modal map

}


// Fetch card data and display in gallery and generate the modals to be manipulated
fetchData('https://randomuser.me/api/?results=12&nat=us,gb,au')
    .then(data => data.results)
    .then(results => {
        dataResults = results
        generateGalleryHTML(results);
        //generateModal(results);
        generateSearch();
    });

//SearchBar
function generateSearch() {
    document.querySelector('.search-container').innerHTML = `<form action="#" method="get">
    <input type="text" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
    </form>`
    const form = document.querySelector('form');
    const cards = document.querySelectorAll('.card');
    const userInput = document.querySelector('#search-input');

    //filter event listener
    form.addEventListener('keyup', (e) => {
        const userInput = e.target.value.toLowerCase();
        let filterArr = [];
        cards.forEach(employee => {
            employee.style.display = ""
            noResults.style.display = 'none'
            if (employee.textContent.indexOf(userInput) === -1) {
                employee.style.display = 'none'
            } else {
                filterArr.push(employee);
            }
            if (filterArr.length === 0) {
                noResults.style.display = 'block';
            }
        });//end for each for cards
    }); //end keyup listener (for filtering)

    //submit listener
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        userInput.value.toLowerCase();
        cards.forEach(employee => {
            if (!employee.innerText.includes(userInput)) {
                employee.style.display = "none"
            }
        }); //end submit listener
    });
}



//function for modal scrolling
function modalScroll(index) {
    const modal = document.querySelector('.modal-container')
    const next = document.querySelector('#modal-next');
    const prev = document.querySelector('#modal-prev');
    const amount = dataResults.length

    next.addEventListener('click', (e) => {
        modal.remove();
        index += 1
        if (index < amount) {
            generateModal(dataResults[index], index)
        } else {
            index = 0;
            generateModal(dataResults[index], index)
        }

    });
    prev.addEventListener('click', (e) => {
        modal.remove();
        index -= 1
        if (index > 0) {
            generateModal(dataResults[index], index)
        } else {
            index = amount - 1;
            generateModal(dataResults[index], index)
        }
    });
}

//event listeners

gallery.addEventListener('click', (e) => {
    let card;
    let index;

    if (e.target.parentNode.parentNode.getAttribute('class') === 'card') {
        card = e.target.parentNode.parentNode
    } else {
        card = e.target
    }
    let cardID = card.getAttribute('id');
    dataResults.forEach(el => {
        if (el.login.username === cardID) {
            index = dataResults.indexOf(el);
            generateModal(el, index);
        }
    });
});

//close modal
modalWindow.addEventListener('click', (e) => {
    let modal = document.querySelector('.modal-container')
    if (e.target.getAttribute('class') === 'modal-container' || e.target.parentNode.type === 'button') {
        modal.remove();
    }
});//end modal close buton




//######################## original modal listeners ##############################
//open modal of target card clicked
/* gallery.addEventListener('click', (e) => {
    let card;
    let index;
    const modals = document.querySelectorAll('.modal-container');

    if (e.target.parentNode.parentNode.getAttribute('class') === 'card') {
        card = e.target.parentNode.parentNode
    } else {
        card = e.target
    }
    cardID = card.getAttribute('id');
    modals.forEach(el => {
        if (el.getAttribute('id') === cardID) {
            el.style.display = 'block';
            index = Array.from(modals).indexOf(el)
        }
    });//end iteration of modal elements
    modalScroll(index);
});//end card click listener */
/*
//close modal
modalWindow.addEventListener('click', (e) => {
    if (e.target.getAttribute('class') === 'modal-container') {
        e.target.style.display = 'none'
    } else if (e.target.parentNode.type === 'button') {
        e.target.parentNode.parentNode.parentNode.style.display = 'none'
    }
});//end modal close buton */

