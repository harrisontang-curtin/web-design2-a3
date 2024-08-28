// Class for carousel images
class carouselImage {
    constructor(name, location, imageString) {
        this.name = name;
        this.location = location;
        this.imageString = imageString;
    }
}

// Initialisation
init();

// Initialise all functions
function init() {
    initBurgers();
    initReturnBtn();
    initCardAudio();
    initSplide();
    initNavScroll();
    initNavUnderline();
    initHeaderAnimation();
    initQFAnimations();
    initBenefitTabAnimations();
    initGalleryAnimation();
    initContactAnimation();
}

// FUNCTIONS
// Utility functions

// Creates a fade-in animation for elements with optional vertical movement.
// Parameters:
//   - element: The target element to animate.
//   - y: Vertical movement distance.
//   - duration: Duration of the animation.
//   - delay: Optional delay before starting the animation.
function createFadeInAnimation(element, y, duration, delay = 0) {
    return gsap.from(element, {
        opacity: 0,
        y: y,
        duration: duration,
        ease: "power2.out",
        delay: delay
    });
}

// Creates a GSAP timeline with ScrollTrigger settings for scroll-based animations.
// Parameters:
//   - trigger: The element that triggers the animation.
//   - start: The start position for the animation.
//   - end: The end position for the animation.
//   - toggleActions: Actions to perform when the animation is triggered.
//   - scrub: Whether the animation should be scrubbable.
function createTimeline(trigger, start, end, toggleActions, scrub) {
    return gsap.timeline({
        scrollTrigger: {
            trigger: trigger,
            start: start,
            end: end,
            toggleActions: toggleActions,
            scrub: scrub,
        }
    });
}

// Handles click events for gallery images and updates the dialog with image details.
// Parameters:
//   - index: Index of the clicked image in the galleryDetails array.
//   - galleryDetails: Array of carouselImage objects containing image details.
//   - spanLoc: Span element to update with the image location.
//   - spanName: Span element to update with the image name.
function handleImageClick(index, galleryDetails, spanLoc, spanName) {
    spanLoc.innerHTML = galleryDetails[index].location;
    spanName.innerHTML = galleryDetails[index].name;

    document.querySelector("section.gallery .dialog").show();
}

// Creates a side fade-in animation for elements with horizonal movement.
// Parameters:
//     - timeline: The GSAP timeline element.
//     - textElement: The relevant text element.
//     - otherElement: The accompanying element to the text element.
function sideAnimations(timeline, textElement, otherElement) {
    timeline.from(textElement, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, 0.5)
    .from(otherElement, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, 0.7);
}

// Navigation functions
// For toggling burger menu functionality in mobile view.
// Toggles the 'open' class on the navigation bar when the burger menu is clicked.
// This class controls the visibility and state of the navigation menu.
function initBurgers() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector('nav');

    // Event listener for burger menu click
    // If the nav contains class open, remove from the classlist
    burger.addEventListener("click", () => {
        if (nav.classList.contains("open")) {
            nav.classList.remove("open");
        }
        else {
            nav.classList.add("open");
        }
    });
}

// Initialises scroll-based animation for the navigation bar.
// Changes navigation bar's appearance and logo based on scroll position.
// Uses ScrollTrigger to update navigation class and logo image.
function initNavScroll() {
    const nav = document.querySelector("nav#nav-body");
    const logo = nav.querySelector("img");

    ScrollTrigger.create({
        trigger: "section.header",
        start: "50% top",
        end: "bottom top",
        onEnter: () => {
            nav.classList.remove("active");
            logo.src = "images/icons/LOGO-for-light.png";
        },
        onLeave: () => {
            nav.classList.add("active");
            logo.src = "images/icons/LOGO-for-dark.png";
        },
    });
}

// Initializes the underline effect for the active navigation link based on scroll position.
// Uses ScrollTrigger to add or remove 'active' class on navigation links as sections enter or leave the viewport.
function initNavUnderline() {
    const navLinks = document.querySelectorAll("#nav-body a");

    document.querySelectorAll("section").forEach(section => {
        ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            
            onEnter: () => updateNav(section),
            onEnterBack: () => updateNav(section),
            onLeave: () => clearNav(section),
            onLeaveBack: () => clearNav(section)
        });
    });

    // Update navigation link based on current section
    function updateNav(section) {
        const id = section.getAttribute("id");

        navLinks.forEach(link => {

            if (link.getAttribute("href").includes(id)) {
                link.classList.add("active");
            }
        });
    }

    // Clear 'active' class from navigation links when section is out of view
    function clearNav(section) {
        const id = section.getAttribute("id");

        navLinks.forEach(link => {

            if (link.getAttribute("href").includes(id)) {
                link.classList.remove("active");
            }
        });
    }
}

// SVG Animation functions
// Initializes SVG animation for return button.
// Sets up event listeners for mouse enter and leave events to animate
// the SVG stroke dash offset.
function initReturnBtn() {
    const btnReturn = document.querySelector(".btn-return");
    const circle = document.querySelector(".circle");

    // Event listeners for when mouse enters and leaves SVG element
    btnReturn.addEventListener('mouseenter', () => {
        returnHomeSvg(circle, '0');
    });

    btnReturn.addEventListener('mouseleave', () => {
        returnHomeSvg(circle, '300');
    });

    // Animates the SVG stroke dash offset
    // Function updates the strokeDashoffset property based on the given value
    function returnHomeSvg(element, value) {
        element.style.strokeDashoffset = value;
    };
}

// Fact card audio functions
// Initializes audio playback for fact cards.
// Each card is assigned a click event listener that plays a specific audio
// file associated with the card.
function initCardAudio() {
    
    // Audio playing elements
    const quickFactsAudio = [
        "audio/heartbeat.mp3",
        "audio/carhorn.mp3",
        "audio/stretch.mp3",
        "audio/bell.mp3"
    ];
    const cards = document.querySelectorAll(".fact-card");

    // Assign click event listener to each card
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => {
            const audio = new Audio(quickFactsAudio[i]);
            audio.play();
        })
    }
}

// Initializes the Splide carousel and sets up dynamic gallery functionality.
// Configures the carousel with vertical direction and custom navigation buttons.
// Sets up click event handlers for gallery images to show image details in a dialog.
function initSplide() {
    const splide = new Splide('.splide', {
        direction: 'ttb',
        // type: 'loop',
        width: '100%',
        height: '80vh',
        arrows: {
            prev: 'splide-button-up',
            next: 'splide-button-down'
        }
    });
    splide.mount();

    // Gallery image details
    const galleryDetails = [
        new carouselImage("John", "Maleny, Sunshine Coast", "images/photos/carousel/maleny.jpg"),
        new carouselImage("Troy", "Rockhampton, Queensland", "images/photos/carousel/rockhampton.jpg"),
        new carouselImage("Michael", "Enogerra Reserviour, Brisbane", "images/photos/carousel/enoggera-res.jpg"),
        new carouselImage("Jeanette", "Brisbane Riverwalk, Brisbane CBD", "images/photos/carousel/brisbane-river.jpg"),
        new carouselImage("Mae", "South Bank, Brisbane", "images/photos/carousel/south-bank.jpg"),
        new carouselImage("Tyson", "Atherton, Queensland", "images/photos/carousel/atherton.jpg"),
    ];

    // Select dialog and gallery item elements
    const dialogGallery = document.querySelector("section.gallery .dialog");
    const spanLoc = dialogGallery.querySelector('.span-loc');
    const spanName = dialogGallery.querySelector('.span-taken');
    const galleryImages = document.querySelectorAll(".splide__slide img");

    // Set up click event handlers for each gallery image
    galleryImages.forEach((img, i) => {
        img.addEventListener("click", () => handleImageClick(i, galleryDetails, spanLoc, spanName));
    });
}

// Header animation functions
// Initializes header section animation.
// Creates a GSAP timeline and applies side animations to the text and image elements
// in the header section.
function initHeaderAnimation() {
    const text = document.querySelector("section.header .textual");
    const image = document.querySelector("section.header .container-image");
    const tl = gsap.timeline();

    // Apply side animations to text and image elements
    sideAnimations(tl, text, image);
}

// Quick facts animation functions
// Initializes animations for the 'Quick Facts' section.
// Creates a GSAP timeline for the section and adds fade-in animations
// for the header and facts elements.
function initQFAnimations() {
    const header = document.querySelector("section.qf h2");
    const facts = document.querySelector("section.qf .facts");
    const tl = createTimeline("section.qf", "top 80%", "bottom 20%", "play reverse play reverse", false);
    
    // Apply fade-in animations to elements
    tl.add(createFadeInAnimation(header, 50, 0.5))
      .add(createFadeInAnimation(facts, 50, 0.8, '-=0.2'));
}

// Benefit tab animation functions
// Initializes animations for the Benefits tab section.
// Updates the image in the container based on the selected tab.
// Uses GSAP for fading out the old image, changing the image source, and fading it back in.
function initBenefitTabAnimations() {
    const tabGroup = document.querySelector("section.benefits sl-tab-group");
    const imageContainer = document.querySelector("section.benefits .container-image img");
    const images = {
        mental: "images/mental-health-cropped.png",
        physical: "images/physical-health.png",
        social: "images/social-benefits.png",
        environment: "images/environment.png"
    };

    // Event listener for tab show event
    tabGroup.addEventListener("sl-tab-show", (event) => {
        const panelName = event.detail.name;

        // Fade out the current image, change source, and fade in the new image
        gsap.to(imageContainer, {
            opacity: 0,
            duration: 0.3,

            onComplete: () => {
                imageContainer.src = images[panelName];
                gsap.to(imageContainer, { 
                    opacity: 1, 
                    duration: 0.3 
                });
            }
        });
    });
}

// Gallery animation functions
// Initializes animation for the Gallery section.
// Creates a GSAP timeline for the section and applies a fade-in animation
// to the textual element, with additional vertical movement.
function initGalleryAnimation() {
    const textual = document.querySelector("section.gallery .textual");
    const tl = createTimeline("section.gallery", "top 80%", "bottom 20%", "play reverse play reverse", false);

    // Add fade-in animation and vertical movement to textual element
    tl.add(createFadeInAnimation(textual, 150, 0.7))
    .to(textual, {
        y: 100
    });
}

// Contact animation functions
// Initializes animation for the Contact section.
// Creates a GSAP timeline with scrollTrigger to apply side animations
// to the textual and form elements in the Contact section.
function initContactAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "section.contact",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
            scrub: false
        }
    });
    const textual = document.querySelector("section.contact .textual");
    const form = document.querySelector("section.contact .container-forms");

    // Apply side animations to textual and form elements
    sideAnimations(tl, textual, form);
}