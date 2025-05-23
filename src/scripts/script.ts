// Wait until the entire HTML content has fully loaded

addEventListener('DOMContentLoaded', () => {
    /*For the menu navigation bar on mobile devices*/

    // Select the button with the id 'open-menu' and store it in the constant openMenu
    const openMenu = document.querySelector('#open-menu') as HTMLButtonElement | null;
    // Select the element with the class 'nav' and store it in the constant nav
    const nav = document.querySelector('.nav') as HTMLElement | null;

    if (openMenu && nav) {
        // Add a 'click' event listener to the openMenu button
        openMenu.addEventListener('click', () => {
            // When clicked, toggle the 'active' class on the nav element
            // This allows showing or hiding the navigation menu
            nav.classList.toggle('active');
        });
    }

    if (nav) {
        //add 'scroll' event listener to the window object
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                //when the scroll position is greater than 100, add the 'shrunk' class to the nav element
                nav.classList.add('shrunk');
            } else {
                //when the scroll position than 0, remove the 'shrunk' class from the nav element
                nav.classList.remove('shrunk');
            }
        });
        //add 'mouseenter' and 'mouseleave' event listeners to the nav element
        nav.addEventListener('mouseenter', () => {
            nav.classList.remove('shrunk');
        });

        nav.addEventListener('mouseleave', () => {
            if (window.scrollY > 100) {
                nav.classList.add('shrunk');
            }
        });
    }

    const projectButtonLeft = document.querySelector('#projects__left') as HTMLButtonElement | null;
    const projectButtonRight = document.querySelector('#projects__rigth') as HTMLButtonElement | null;
    const projectsContainer = document.querySelector('.projects__container') as HTMLDivElement | null;

    let index: number = 1;

    if (projectButtonLeft && projectButtonRight && projectsContainer) {
        projectButtonLeft.addEventListener('click', () => {
            if (index > 0) {
                index--;
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            } else {
                const projectsContent = document.querySelectorAll('.projects__content') as NodeList | null;

                if (projectsContent) {
                    projectsContent.forEach(i => {
                        console.log(i.classList);
                    });
                }
            }
        });

        projectButtonRight.addEventListener('click', () => {
            if (index < 2) {
                index++;
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            } else {
                console.log('Ya estás en el último proyecto');
                // También podrías aplicar animación
            }
        });
    }
});
