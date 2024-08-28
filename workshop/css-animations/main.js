console.log("JavaScript is working!");

// const img = document.querySelector('img');

// img.addEventListener('click', (event) => {
//     img.style.transform = "scale(1.2)";

// })


// Get the button and the circle element
const btnReturn = document.querySelector('.btn-return');
const circle = document.querySelector('.circle');

// Add event listeners for mouse enter and leave
btnReturn.addEventListener('mouseenter', () => {
    circle.style.strokeDashoffset = '0';
});

btnReturn.addEventListener('mouseleave', () => {
    circle.style.strokeDashoffset = '300'; // Reset the offset on mouse leave 
});
