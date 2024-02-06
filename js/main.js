document.addEventListener('DOMContentLoaded', function () {
    let sliderContainer = document.querySelector('.slider-container');
    let slider = document.querySelector('.slider');

    let initialX = null;
    let initialScrollY = window.scrollY + 500;
    let middleY = window.innerHeight / 2;

    window.addEventListener('scroll', function () {
        if (initialX === null) {
            initialX = slider.getBoundingClientRect().left + window.scrollX;
        }

        let scrollY = window.scrollY + 500;

        let offsetX = (scrollY - initialScrollY) * 1;

        slider.style.transform = `translateX(${initialX - offsetX}px)`;
    });
});

function togglemenu(){
    const navbar = document.querySelector('.navbar-mobile');
    const burger = document.querySelector('.burger');
    burger.addEventListener('click', () => {
 navbar.classList.toggle('show-nav');
    })
}
togglemenu();