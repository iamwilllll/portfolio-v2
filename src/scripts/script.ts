addEventListener('DOMContentLoaded', () => {
    const openMenu = document.querySelector('#open-menu') as HTMLButtonElement;
    const nav = document.querySelector('.nav') as HTMLElement;

    openMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});
