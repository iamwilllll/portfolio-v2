// Wait until the entire HTML content has fully loaded

addEventListener('DOMContentLoaded', () => {
    /*For the menu navigation bar on mobile devices*/

    // Select the button with the id 'open-menu' and store it in the constant openMenu
    const openMenu = document.querySelector('#open-menu') as HTMLButtonElement |null;
    // Select the element with the class 'nav' and store it in the constant nav
    const nav = document.querySelector('.nav') as HTMLElement |null;

if(openMenu && nav) {
        // Add a 'click' event listener to the openMenu button
        openMenu.addEventListener('click', () => {
            // When clicked, toggle the 'active' class on the nav element
            // This allows showing or hiding the navigation menu
            nav.classList.toggle('active');
        });
    
}





if (nav) 
{
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) { // ajusta 100 al valor que quieras
            nav.classList.add('shrunk');
        } else {
            nav.classList.remove('shrunk');
        }
    });
    
    nav.addEventListener('mouseenter', (()=>{
        nav.classList.remove('shrunk');
    }))

    nav.addEventListener('mouseleave', (()=>{
        nav.classList.add('shrunk');

     
    }))
}


















});
