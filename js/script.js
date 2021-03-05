// NAVBAR FOR MOBILE

const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector(".navbar-toggle");
const navbarMenu = navbar.querySelector(".navbar-menu");
const navbarLinksContainer = navbar.querySelector(".navbar-links");

navbarToggle.addEventListener("click", () => {
    if (navbar.classList.contains("opened")) {
        closeMobileNavbar();
    } else {
        openMobileNavbar();
    }
});

navbarLinksContainer.addEventListener("click", (clickEvent) => {
    clickEvent.stopPropagation();
});

navbarMenu.addEventListener("click", closeMobileNavbar);

function openMobileNavbar() {
    navbar.classList.add("opened");
    navbarToggle.setAttribute("aria-label", "Close navigation menu.");
}

function closeMobileNavbar() {
    navbar.classList.remove("opened");
    navbarToggle.setAttribute("aria-label", "Open navigation menu.");
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
        let headline = document.createElement("h2");
        headline.innerText = "Lorem ipsum dolor sit amet";
        headline.classList.add("py-1");
        let paragraph = document.createElement("p");
        paragraph.innerText = "Lorem ipsum dolor sit amet in nam, consectetur adipisicing elit. Fugit hic, impedit in nam odio quia?"
        let arrowIcon = document.createElement("i");
        arrowIcon.classList.add("fas");
        arrowIcon.classList.add("fa-arrow-right");
        arrowIcon.classList.add("pb-2");
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
        galleryContainer.style.transform = `translateX(${coordinate-(cardWidth * 1.3)}px)`;
        coordinate -= cardWidth * 1.3;
    }
}

function scrollRight (){
    let cardWidth = document.querySelector('.card').offsetWidth;
    let maxCoordinateRight = 2 * cardWidth;
    if (coordinate < maxCoordinateRight){
        galleryContainer.style.transform = `translateX(${coordinate+(cardWidth * 1.3)}px)`;
        coordinate += cardWidth * 1.3;
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

sizeButton.addEventListener('click', showSelections);

// selectionButtons.forEach((button) => {
//     button.addEventListener('click', showSelections);
// });

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

function showSelections (event) {
    event.path[1].children[1].classList.toggle("display-none");
    event.path[1].children[1].classList.toggle("display-flex");
    event.path[1].children[0].classList.toggle("border-radius-closed");
    event.path[1].children[0].classList.toggle("border-radius-open");
    event.path[1].children[0].children[0].children[0].children[0].classList.toggle("fa-chevron-down");
    event.path[1].children[0].children[0].children[0].children[0].classList.toggle("fa-chevron-up");
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
        windows = windowsArray[Math.floor(Math.random() * 4)],
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
    const filterType = event.path[0].children[0].innerText;
    const size = event.path[0].children[1].innerHTML;
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
    const roomQuantity = event.path[0].innerHTML;
    let filteredArray = [];
    filteredArray = flatsArray.filter(flat => flat.room == roomQuantity);
    findSelectionBox(event);
    generateTable(filteredArray);
}

function filterByWindows(event) {
    const windowsDirrection = event.path[0].innerHTML;
    let filteredArray = [];
    filteredArray = flatsArray.filter(flat => flat.windows === windowsDirrection);
    findSelectionBox(event);
    generateTable(filteredArray);
}

function filterByBuildingStatus(event) {
    const buildStatus = event.path[0].innerHTML;
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
    buttonType.children[0].children[0].children[0].classList.toggle("fa-chevron-down");
    buttonType.children[0].children[0].children[0].classList.toggle("fa-chevron-up");
}
