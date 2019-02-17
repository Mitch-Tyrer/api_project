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

fetchData('https://randomuser.me/api/?results=12')
    .then(data => data.results)
    .then(results => generateGalleryHTML(results))