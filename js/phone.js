const loadPhone = async(inputValue, dataLimet) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimet)
}

const displayPhone = (phones, dataLimet) =>{
    const container = document.getElementById('card-container')
    container.textContent = ``
    const showAll = document.getElementById('Show-all');
    if(dataLimet && phones.length > 10){
      phones = phones.slice(0, 10)
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
  const noPhone = document.getElementById('hiden-note')
  if (phones.length === 0) {
    noPhone.classList.remove('d-none')
  }
  else{
    noPhone.classList.add('d-none')
  }

    phones.forEach(phone => {
        // console.log(phone)
        const card = document.createElement('div');
        
        card.classList.add('card');
        card.innerHTML = `
        <div class="col">
            <div class="card p-4">
              <img style="width:60% ;" src="${phone.image}" class="card-img-top" alt="...">
              <div class="card-body">
              <h4 class="card-title">Name: ${phone.phone_name}</h4>
              <h5 class="card-text">Brand: ${phone.brand}</h5>
              <p><button class="btn btn-primary me-2" onclick="ShowPhoneDetails('${phone.slug}')"   data-bs-toggle="modal" data-bs-target="#phoneDeatles">Show Details</button>  <button class="btn btn-primary">Buy Now</button></p>
            </div>
        </div>
        `
        container.appendChild(card)
    });
    toggleSpiner(false)
}

const processSearch = (dataLimet) =>{
  toggleSpiner(true)
  const input = document.getElementById('input-name');
  const inputValue = input.value;
  loadPhone(inputValue, dataLimet)
}


document.getElementById('btn-search').addEventListener('click', function(){
  processSearch(10);
  
})

document.getElementById('input-name').addEventListener('keyup', function(e){
  if (e.key === 'Enter') {
    processSearch(10);
  }
})

const toggleSpiner =isLoading => {
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('d-none')
  }
  else{
    loader.classList.add('d-none')
  }
}

document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})

const ShowPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url);
  const data =await res.json();
  displayPhoneDetails(data.data)
}

const displayPhoneDetails = phone => {
  console.log(phone)
 const modalTitle =  document.getElementById('phoneDeatlesLabel');
 modalTitle.innerText = phone.name;
 const phoneDetails = document.getElementById('phone-details');
 phoneDetails.innerHTML = `
 <p>Release Date : ${phone.releaseDate }</p>
 <p>Memory : ${phone.mainFeatures.memory }</p>
 <p> Display Size : ${phone.mainFeatures.displaySize}</p>
 <p> sensors : ${phone.mainFeatures.sensors }</p>
 
 `
}

// loadPhone()