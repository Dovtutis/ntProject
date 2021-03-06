// NAVBAR 

const navbar = document.getElementById("navbar-container");
const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".navbar-menu");
const navbarLinksContainer = document.querySelector(".navbar-links");
const navbarLinks = document.querySelectorAll(".navbar-link")

navbarToggle.addEventListener("click", () => {
    if (navbar.classList.contains("opened")) {
        closeMobileNavbar();
    } else {
        openMobileNavbar();
    }
});

navbarLinks.forEach(link => {
    link.addEventListener("click", closeMobileNavbar);
});

navbarLinksContainer.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
});

navbarMenu.addEventListener("click", closeMobileNavbar);

function openMobileNavbar() {
    navbar.classList.add("opened");
}

function closeMobileNavbar() {
    navbar.classList.remove("opened");
}


// GALLERY

const scrollLeftButton = document.getElementById('scroll-left-button');
const scrollRightButton = document.getElementById('scroll-right-button');
const galleryContainer = document.querySelector('.sliding-container');
const requestUrl = 'https://api.unsplash.com/search/collections?page=1&per_page=6&query=home interior&client_id=IW3u5fbyKrQ1PDWZn5ZLo56AoiSLuOBxR6Fjb76YkCI';
const imagesArray = [];

let coordinate = 0;

scrollLeftButton.addEventListener('click', scrollLeft);
scrollRightButton.addEventListener('click', scrollRight);

getImages();


async function getImages () {
    fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.results.forEach((image) => {
                imagesArray.push(image.preview_photos[0].urls.regular)
            });
            createGalleryCards(imagesArray);
        }).catch(error => console.error())
}

function createGalleryCards (imagesArray){
    imagesArray.forEach((image) => {
        let card = document.createElement("div");
        card.classList.add("card");
        let img = document.createElement("img");
        img.setAttribute('src', image);
        img.setAttribute('alt', 'home interior');
        img.classList.add("card-image");
        let textContainer = document.createElement("div");
        textContainer.classList.add("text-container");
        let headline = document.createElement("span");
        headline.innerText = "Lorem ipsum dolor sit amet";
        let paragraph = document.createElement("p");
        paragraph.innerText = "Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut"
        let arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fas");
        arrowIcon.classList.add("fa-arrow-right");
        textContainer.appendChild(headline);
        textContainer.appendChild(paragraph);
        textContainer.appendChild(arrowIcon);
        card.appendChild(img);
        card.appendChild(textContainer);
        galleryContainer.appendChild(card);
    })
}

function scrollLeft (){
    let cardWidth = document.querySelector('.card').offsetWidth;
    let maxCoordinateLeft = -6 * cardWidth;

    if (coordinate > maxCoordinateLeft){
        galleryContainer.style.transform = `translateX(${coordinate-(cardWidth * 1.4)}px)`;
        coordinate -= cardWidth * 1.4;
    }
}

function scrollRight (){
    let cardWidth = document.querySelector('.card').offsetWidth;
    let maxCoordinateRight = 2 * cardWidth;
    if (coordinate < maxCoordinateRight){
        galleryContainer.style.transform = `translateX(${coordinate+(cardWidth * 1.4)}px)`;
        coordinate += cardWidth * 1.4;
    }
}

//TABLE
const sizeButton = document.getElementById('size-selection-button');
const roomButton = document.getElementById('room-selection-button');
const windowsdirectionButton = document.getElementById('window-direction-selection-button')
const buildStatusButton = document.getElementById('build-status-selection-button');

const selectionButtons = document.querySelectorAll('.table-button');
const sizeButtons = document.querySelectorAll('.size-button');
const roomsQuantityButtons = document.querySelectorAll('.rooms-quantity-button');
const windowsDirrectionButtons = document.querySelectorAll('.windows-dirrection-button');
const buildStatusButtons = document.querySelectorAll('.build-status-button');

const sizeSelectBox = document.getElementById('size-select-box');
const roomsQuantitySelectionBox = document.getElementById('rooms-quantity-select-box');
const windowsDirectionSelectBox = document.getElementById('windows-direction-select-box');
const buildStatusSelectBox = document.getElementById('build-status-select-box');
const flatsTable = document.getElementById('flats-table');
const tableSearchMessageBox = document.getElementById('table-search-message-box');

const tableEl = document.getElementById('table-body');
const flatsArray = [];

selectionButtons.forEach((button, index) => {
    button.addEventListener('click', (event)=> showSelections(event, index));
});

sizeButtons.forEach((button) => {
    button.addEventListener('click', filterBySize);
})

roomsQuantityButtons.forEach((button) => {
    button.addEventListener('click', filterByRooms);
})

windowsDirrectionButtons.forEach((button) => {
    button.addEventListener('click', filterByWindows);
})

buildStatusButtons.forEach((button) => {
    button.addEventListener('click', filterByBuildingStatus);
})

generateFlatData();
generateTable(flatsArray);

function showSelections (event, index) {

    selectionButtons[index].children[0].classList.toggle("fa-chevron-down");
    selectionButtons[index].children[0].classList.toggle("fa-chevron-up");
    selectionButtons[index].classList.toggle("border-radius-closed");
    selectionButtons[index].classList.toggle("border-radius-open");
    selectionButtons[index].parentElement.children[1].classList.toggle("display-none");
    selectionButtons[index].parentElement.children[1].classList.toggle("display-flex");
}

function generateFlatData () {
    const discountArray = ['', '5%', '10%'];
    const windowsArray = ['Pietūs', 'Rytai', 'Šiaurė', 'Vakarai'];
    const buildStatusArray = ['Pastatyta', 'Statoma'];

    function randomFlat(discount, number, size, room, windows, finishStatus) {
        this.discount = discount;
        this.number = number;
        this.size = size;
        this.room = room;
        this.windows = windows;
        this.buildStatus = buildStatus;
    }

    for (let x = 0; x < 12; x++) {
        discount = discountArray[Math.floor(Math.random() * 3)],
        number = Math.ceil(Math.random() * 2),
        size = Math.floor(Math.random() * (80 - 35 + 1) ) + 35,
        room = Math.ceil(Math.random() * 4),
        windows = windowsArray[Math.floor(Math.random() * 3)],
        buildStatus = buildStatusArray[Math.floor(Math.random() * 2)]

        const flat = new randomFlat(discount, number, size, room, windows, buildStatus);
        flatsArray.push(flat)
    }
}

function generateTable(flats) {
    if (flats.length > 0) {
        tableSearchMessageBox.innerHTML = "";
        flatsTable.style.display = "block";
        tableEl.innerHTML = '';
        flats.forEach(flat => {
            let backgroundColorClass = '';
            if (flat.discount !== "") {
                backgroundColorClass = "bg-light-blue";
            }
        
            tableEl.innerHTML += 
            `
            <tr class="table-row ${backgroundColorClass}">
                <td class="discount-table-data">-${flat.discount}</td>
                <td>${flat.number}</td>
                <td>${flat.size}.00</td>
                <td>${flat.room}</td>
                <td>${flat.windows}</td>
                <td>${flat.buildStatus}</td>
            </tr>
            `
        });
    } else {
        flatsTable.style.display = "none";
        tableSearchMessageBox.innerHTML = "Atsiprašome, tačiau šiuo metu tokių pasiūlymų neturime."
    }

}

function filterBySize(event) {
    const filterType = event.target.children[0].innerText;
    const size = event.target.children[1].innerText;
    let filteredArray = [];
    if (filterType === "<"){
        filteredArray = flatsArray.filter(flat => flat.size < size);
    } else {
        filteredArray = flatsArray.filter(flat => flat.size > size);
    }
    findSelectionBox(event);
    generateTable(filteredArray);
}

function filterByRooms(event) {
    const roomQuantity = event.target.innerText;
    let filteredArray = [];
    filteredArray = flatsArray.filter(flat => flat.room == roomQuantity);
    findSelectionBox(event);
    generateTable(filteredArray);
}

function filterByWindows(event) {
    const windowsDirrection = event.target.innerText;
    let filteredArray = [];
    filteredArray = flatsArray.filter(flat => flat.windows === windowsDirrection);
    findSelectionBox(event);
    generateTable(filteredArray);
}

function filterByBuildingStatus(event) {
    const buildStatus = event.target.innerText;
    console.log(buildStatus);
    let filteredArray = [];
    filteredArray = flatsArray.filter(flat => flat.buildStatus === buildStatus);
    findSelectionBox(event);
    generateTable(filteredArray);
}

function findSelectionBox(event) {
    if (sizeSelectBox.classList.contains("display-flex")) {
        closeSelectionBox(sizeSelectBox, sizeButton);
    }
    if (roomsQuantitySelectionBox.classList.contains("display-flex")) {
        closeSelectionBox(roomsQuantitySelectionBox, roomButton);
    }
    if (windowsDirectionSelectBox.classList.contains("display-flex")) {
        closeSelectionBox(windowsDirectionSelectBox, windowsdirectionButton);
    }
    if (buildStatusSelectBox.classList.contains("display-flex")) {
        closeSelectionBox(buildStatusSelectBox, buildStatusButton);
    }
}

function closeSelectionBox(selectBox, buttonType) {
    selectBox.classList.toggle("display-none");
    selectBox.classList.toggle("display-flex");
    buttonType.classList.toggle("border-radius-closed");
    buttonType.classList.toggle("border-radius-open");
    buttonType.children[0].classList.toggle("fa-chevron-down");
    buttonType.children[0].classList.toggle("fa-chevron-up");
}


// NEWS

const newsContainerEl = document.getElementById('news-cards-container');
const requestUrlNews = 'https://api.unsplash.com/search/collections?page=1&per_page=6&query=lifestyle&client_id=IW3u5fbyKrQ1PDWZn5ZLo56AoiSLuOBxR6Fjb76YkCI';
const newsImagesArray = [];

getNewsImages();

async function getNewsImages () {
    fetch(requestUrlNews)
        .then((response) => response.json())
        .then((data) => {
            data.results.forEach((image) => {
                newsImagesArray.push(image.preview_photos[0].urls.regular)
            });
            createNewsCards(newsImagesArray);
        }).catch(error => console.error())
}

function createNewsCards (imagesArray){
    imagesArray.forEach((image) => {
        let card = document.createElement("div");
        card.classList.add("news-card");
        let img = document.createElement("img");
        img.setAttribute('src', image);
        img.setAttribute('alt', 'lifestyle');
        let textContainer = document.createElement("p");
        textContainer.innerText = "Lorem ipsum dolor sit amet";
        card.appendChild(img);
        card.appendChild(textContainer);
        newsContainerEl.appendChild(card);
    })
}


// CONTACTS

const formNameEl = document.getElementById('form-name');
const formEmailEl = document.getElementById('form-email');
const formPhoneEl = document.getElementById('form-phone');
const formMessageEl = document.getElementById('form-message');
const formCheckBoxEl = document.getElementById('form-checkbox');
const formSubmitButton = document.getElementById('form-submit-button');
const formNameErrorEl = document.getElementById('name-error');
const formEmailErrorEl = document.getElementById('email-error');
const formPhoneErrorEl = document.getElementById('phone-error');
const formMessageErrorEl = document.getElementById('message-error');
const formCheckBoxErrorEl = document.getElementById('checkbox-error');

const inputElArray = [formNameEl, formEmailEl, formPhoneEl, formMessageEl];
const inputElErrorArray = [formNameErrorEl, formEmailErrorEl, formPhoneErrorEl, formMessageErrorEl, formCheckBoxErrorEl];

formSubmitButton.addEventListener('click', checkTheForm);
inputElArray.map(element => {
    element.addEventListener('input', enableSubmitButton);
})
formCheckBoxEl.addEventListener('change', enableSubmitButton);

function enableSubmitButton() {
    formSubmitButton.disabled = false;
    formSubmitButton.style.backgroundColor = "#30333C";
    formSubmitButton.style.cursor = "pointer";
}

function checkTheForm(e) {
    e.preventDefault();
    // Checking if field values is not empty
    inputElArray.map((input, index )=> {
        checkIfFieldIsEmpty(input, index);
    })
    // Checking checkbox value
    checkCheckboxValue(formCheckBoxEl);

    // Checking email
    formEmailEl.value.length > 0 ? checkEmail(formEmailEl.value) : null;

    // Check phone number 
    formPhoneEl.value.length > 0 ? checkPhoneNumber(formPhoneEl.value) : null;

    checkIfSubmitIsPossible();
}
 
function checkIfFieldIsEmpty(inputField, index) {
    if (inputField.value === "") {
        inputElErrorArray[index].innerText = "Privalomas laukas"
    } else {
        inputElErrorArray[index].innerText = "";
    }
}

function checkCheckboxValue(checkbox) {
    if (checkbox.checked === false) {
        formCheckBoxErrorEl.innerText = "Privalomas laukas"
    }else {
        formCheckBoxErrorEl.innerText = ""
    }
}

function checkEmail(emailField) {
    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailField)){
        formEmailErrorEl.innerText = "Įvestas neteisingas el. paštas";
    }
}

function checkPhoneNumber(phoneField) {
    if (!/^[-+]?[0-9]+$/.test(phoneField)){
        formPhoneErrorEl.innerText = "Įvestas neteisingas telefono numeris, galimi tik skaičiai";
    }
}

function checkIfSubmitIsPossible() {   
    inputElErrorArray.map(input => {
        if (input.value !== "") {
            formSubmitButton.disabled = true;
            formSubmitButton.style.backgroundColor = "#D9DBE2";
            formSubmitButton.style.cursor = "auto";
        } else {
            formSubmitButton.disabled = false;
            formSubmitButton.style.backgroundColor = $text-black-color;
        }
    })
}


