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
const sizeButton = document.getElementById('size-selection-button');
const roomButton = document.getElementById('room-selection-button');
const galleryContainer = document.querySelector('.sliding-container');
const selectionButtons = document.querySelectorAll('.table-button');
const requestUrl = 'https://api.unsplash.com/search/collections?page=1&per_page=6&query=home interior&client_id=IW3u5fbyKrQ1PDWZn5ZLo56AoiSLuOBxR6Fjb76YkCI';
const imagesArray = [];
let coordinate = 0;

//EVENT LISTENERS

scrollLeftButton.addEventListener('click', scrollLeft);
scrollRightButton.addEventListener('click', scrollRight);

selectionButtons.forEach((button) => {
    button.addEventListener('click', showSelections);
});

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

function showSelections (event) {
    console.log(event)
    event.path[1].children[1].classList.toggle("display-none");
    event.path[1].children[1].classList.toggle("display-flex");
    event.path[1].children[0].classList.toggle("border-radius-closed");
    event.path[1].children[0].classList.toggle("border-radius-open");
}