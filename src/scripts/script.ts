// Wait until the entire HTML content has fully loaded
addEventListener('DOMContentLoaded', () => {
    /* For the menu navigation bar on mobile devices */

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
        // Add a 'scroll' event listener to the window object
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                // When the scroll position is greater than 100, add the 'shrunk' class to the nav element
                // This is typically used to shrink the size or change the appearance of the navbar
                nav.classList.add('shrunk');
            } else {
                // When the scroll position is less than or equal to 100, remove the 'shrunk' class from the nav element
                nav.classList.remove('shrunk');
            }
        });

        // Add 'mouseenter' event listener to the nav element
        nav.addEventListener('mouseenter', () => {
            // When the user hovers the mouse over the navbar, remove the 'shrunk' class
            nav.classList.remove('shrunk');
        });

        // Add 'mouseleave' event listener to the nav element
        nav.addEventListener('mouseleave', () => {
            // When the user stops hovering and scroll position is greater than 100,
            // reapply the 'shrunk' class to the navbar
            if (window.scrollY > 100) {
                nav.classList.add('shrunk');
            }
        });
    }

    /* For the horizontal project slider navigation */

    // Select the button with the id 'projects__left' and store it in projectButtonLeft
    const projectButtonLeft = document.querySelector('#projects__left') as HTMLButtonElement | null;
    // Select the button with the id 'projects__rigth' (likely a typo: should be 'right') and store it in projectButtonRight
    const projectButtonRight = document.querySelector('#projects__right') as HTMLButtonElement | null;
    // Select the element with the class 'projects__container' and store it in projectsContainer
    const projectsContainer = document.querySelector('.projects__container') as HTMLDivElement | null;

    // Initialize the index to track the currently visible project
    let index: number = 1;

    if (projectButtonLeft && projectButtonRight && projectsContainer) {
        // Add 'click' event listener to the left arrow button
        projectButtonLeft.addEventListener('click', () => {
            if (index > 0) {
                // If we're not at the first project, decrease the index
                index--;
                // Move the container to the left by updating the transform property
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            } else {
                // If already at the first project, we could show a message or animation
                const projectsContent = document.querySelectorAll('.projects__content') as NodeList | null;

                if (projectsContent) {
                    // Loop over the project elements (currently no action, could be used for animation)
                    projectsContent.forEach(i => {});
                }
            }
        });

        // Add 'click' event listener to the right arrow button
        projectButtonRight.addEventListener('click', () => {
            if (index < 2) {
                // If we're not at the last project, increase the index
                index++;
                // Move the container to the left by updating the transform property
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            } else {
                // If already at the last project, log a message or apply an animation
                console.log('Ya estás en el último proyecto');
                // También podrías aplicar animación
            }
        });
    }
});
