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
scrollLeftButton.addEventListener('click', scrollLeft);
scrollRightButton.addEventListener('click', scrollRight);

let coordinate = 0;
let maxCoordinateLeft = -4 * 450;
let maxCoordinateRight = 3 * 450;

function scrollLeft (){
    if (coordinate > maxCoordinateLeft){
        galleryContainer.style.transform = `translateX(${coordinate-450}px)`;
        coordinate -= 450;
    }
}

function scrollRight (){
    if (coordinate < maxCoordinateRight){
        galleryContainer.style.transform = `translateX(${coordinate+450}px)`;
        coordinate += 450;
    }
}
