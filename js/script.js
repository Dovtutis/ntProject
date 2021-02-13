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

//EVENT LISTENERS

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

// <div className="card">
//     <img src="https://i.pinimg.com/originals/5b/65/31/5b65311e67cdc2ab9b5b1ba8516878cb.jpg"
//          alt="" className="card-image">
//         <div className="text-container">
//             <h2 className="py-1">Lorem ipsum dolor sit amet</h2>
//             <p>
//                 Lorem ipsum dolor sit amet in nam, consectetur adipisicing elit. Fugit hic, impedit
//                 in nam odio quia?
//             </p>
//             <i className="fas fa-arrow-right pb-2"></i>
//         </div>
// </div>

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
