console.log("JavaScript is working!");

// document.addEventListener( 'DOMContentLoaded', function() {

// });

const splide = new Splide('.splide', {
    direction: 'ttb',
    type: 'loop',
    width: '100%',
    height: '70vh',
    arrows: {
        prev: 'splide-button-up',
        next: 'splide-button-down'
    }
} );
splide.mount();

// const img = document.querySelector('img');

// img.addEventListener('click', (event) => {
//     img.style.transform = "scale(1.2)";

// })


