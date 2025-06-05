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

        document.addEventListener('click', event => {
            const target = event.target as Node;

            if (nav.classList.contains('active') && !nav.contains(target) && !openMenu.contains(target)) {
                nav.classList.remove('active');
            }
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

// game.ts
// =====================
// Select modal and buttons

const modal = document.querySelector<HTMLElement>('#modal') || null;
if (modal) {
    modal.innerHTML = `  
    <section class="game__modal hidden" >              
        <div class="game__modal__info">
            <button class="button game__modal__button" id="close-modal"><img src="/build/images/svg/close.svg" alt="close icon" loading="lazy" /></button>
            <p>Moves: <span id="attempts">0</span></p>
        </div>
        <div class="game__modal__container" id="game"></div>
        <button class="button play__again" id="play-again">Play again</button>
        <div class="game__modal__message display-none">cards__message</div>
    </section>
`;
}

document.addEventListener('click', event => {
    if (event.target === modal) {
        toggleModal();

        modal?.classList.toggle('modal');
    }
});

const gameModal = document.querySelector<HTMLElement>('.game__modal');
const closeModalButton = document.getElementById('close-modal');
const playAgainButton = document.getElementById('play-again');
const playButton = document.getElementById('play');

// Message and attempts display
const message = document.querySelector<HTMLElement>('.game__modal__message');
const attempts = document.getElementById('attempts');

// Game state
let cardItems: NodeListOf<HTMLElement>;
let randomNumber = 0;
let attemptsLeft = 0;

// Attach modal toggle and control listeners
closeModalButton?.addEventListener('click', toggleModal);
playButton?.addEventListener('click', () => {
    startGame();
});
playAgainButton?.addEventListener('click', resetGame);

// Toggle modal visibility
function toggleModal(): void {
    gameModal?.classList.toggle('hidden');
    gameModal?.classList.toggle('active');
}

// Initialize the game with a given number of cards and attempts
function startGame(): void {
    toggleModal();
    modal?.classList.toggle('modal');

    let numCards = 3;
    let maxAttempts = 2;
    const container = document.querySelector<HTMLElement>('.game__modal__container');
    if (!container) return;

    // Reset container and state
    container.innerHTML = '';
    randomNumber = Math.floor(Math.random() * numCards) + 1;
    attemptsLeft = maxAttempts;

    // Render cards
    for (let i = 1; i <= numCards; i++) {
        container.innerHTML += `
        <div class="cards">
            <div class="card__item">
                <div class="card__item-header">A</div>
                <div class="card__item-symbol">♠</div>
                <div class="card__item-footer">A</div>
            </div>
            <div class="poker-chip"><img src="/build/images/webp/poker-chip.webp" alt="poker-chip"></div>
        </div>
    `;
    }

    // Query items and bind click handlers
    cardItems = container.querySelectorAll<HTMLElement>('.cards');
    cardItems.forEach((card, idx) => {
        card.addEventListener('click', () => handleCardClick(card, idx + 1));
    });

    updateAttemptsDisplay();
}

// Handle card click logic
function handleCardClick(card: HTMLElement, id: number): void {
    if (attemptsLeft <= 0) return;
    const chip = card.querySelector<HTMLElement>('.poker-chip');

    if (id === randomNumber) {
        card.classList.add('active', 'winner');
        setTimeout(() => chip?.classList.add('active'), 500);
        showMessage('You win!');
        attemptsLeft = 0;
    } else {
        card.classList.add('active');
        attemptsLeft--;
        setTimeout(() => {
            cardItems.forEach(c => c.classList.remove('active'));
        }, 2500);

        if (attemptsLeft === 0 && !document.querySelector('.winner')) {
            showMessage('You lost!');
        }
    }

    updateAttemptsDisplay();
}

// Display remaining attempts
function updateAttemptsDisplay(): void {
    if (attempts) attempts.textContent = attemptsLeft.toString();
}

// Show temporary message then reset
function showMessage(text: string): void {
    if (!message) return;
    message.textContent = text;
    message.classList.remove('display-none');
    message.classList.add('display-flex');

    setTimeout(() => {
        message.classList.add('display-none');
        message.classList.remove('display-flex');
        resetGame();
    }, 5000);
}

// Reset cards and restart game
function resetGame(): void {
    if (!cardItems) return;
    cardItems.forEach(card => {
        const chip = card.querySelector<HTMLElement>('.poker-chip');
        card.classList.remove('active', 'winner');
        chip?.classList.remove('show-poker-chip');
    });
    setTimeout(() => startGame(), 500);
}

// startGame();
