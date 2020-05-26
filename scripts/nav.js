const hamburger = document.querySelector('#hamburger');
hamburger.addEventListener('click', () => {
    const items = document.querySelectorAll('.menu .section');
    const icon = document.querySelector('#hamburger-icon');
    const menu_open = items[0].classList.contains('visible');

    if (menu_open) {
        // Closing menu
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
        for (const item of items) {
            item.classList.remove('visible');
        }
    } else {
        // opening menu
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
        for (const item of items) {
            item.classList.add('visible');
        }
    }
});
