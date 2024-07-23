/* jshint esversion: 6 */
let sliderCount = 0;
let sliderWidth;

const sliderImg = document.querySelectorAll(".slider-image");
const sliderLine = document.querySelector(".slider-line");
const sliderDots = document.querySelectorAll(".dot");

export function initializeSlider() {
    setInterval(() => {
    nextSlider();
}, 5000);
showSlide();

function showSlide() {
    sliderWidth = document.querySelector(".slider").offsetWidth;
    sliderLine.style.width = sliderWidth * sliderImg.length + "px";
    sliderImg.forEach(item => item.style.width = sliderWidth + "px");
    rollSlider();
}

function nextSlider() {
    sliderCount++;
    if (sliderCount >= sliderImg.length) sliderCount = 0;
    rollSlider();
    thisSlide(sliderCount);
}

function rollSlider() {
    sliderLine.style.transform = `translateX(${-sliderCount * sliderWidth}px)`;
}

function thisSlide(index) {
    sliderDots.forEach(item => item.classList.remove("active"));
    sliderDots[index].classList.add("active");
}

sliderDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        sliderCount = index;
        rollSlider();
        thisSlide(sliderCount);
    });
});
}