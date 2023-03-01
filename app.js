/// step -03

const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhones(data.data,dataLimit);
}

// step 04
const displayPhones = (phones,dataLimit) => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    //display only 10 items
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        // akhane jodi data limit kuno value nie ashe and sudu phones array er length ta jodi 10 er beshi hoy tahole aita korbe
        phones = phones.slice(0,10);//akhn phones tar array te only 10 ta element nie jabe and segular upore e foreach kore kaj korbe
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');//data limit jokhon undefined hobe tokhon directly akhane duke jabe array slice korar sujug pabe na and phones e foreach kore all phone dekhabe
    }
    
    //display no phones  jokhon right name e search dibo tokon phones tar array te sei element gula nie asbe but jokhon ultapalta name e search dibo tokhon phones tar array te kunoelement anbe na na mane tokhon array er length 0 thakbe
    const noPhone = document.getElementById('no-found-message');
    if(phones.length === 0 ){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    //display all phone   step 05
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');//prottek bar element eshe eshe akta kore div create korbe then oitar vitore nicher gula set korbe
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show Details</button>
                        </div>
                      </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    //stop loader
    toggleSpinner(false);
}

//search  step 02
const processSearch = (dataLimit) =>{
    //show all btn e click korle datalimit e kuno number pabe na undefined hoye jabe
    toggleSpinner(true);
    const searchText = document.getElementById('search-field').value;
    loadPhones(searchText,dataLimit);
}

//handle search button click   step 01
document.getElementById('btn-search').addEventListener('click',function(){
    //start loader
   processSearch(10);// jotogula dekhabe chaibo totogula e pathabo
})
//search field enter key
document.getElementById('search-field').addEventListener('keypress',function(e){
    console.log(e.key)//key board e kun button e klick kora hoche setar name dekhabe
    if(e.key === 'Enter'){
        processSearch(10);// jotogula dekhabe chaibo totogula e pathabo
    }
})


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none')
    }
}
//not the best way
document.getElementById('btn-show-all').addEventListener('click',function(){
   processSearch();//show all button er maddhome abar search k call kore all data k show korabo
})


//step 06
const loadPhoneDetails = async id => {
    const url =    `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}


// step -07
const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = 
    `
    <p> Release Date: ${phone.releaseDate ? phone.releaseDate : ' no found'};
    <p> storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'no'}
    <p> other: ${phone.others ? phone.others.Bluetooth : 'no'}
    <p> Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no'}

    `
}
loadPhones('apple');