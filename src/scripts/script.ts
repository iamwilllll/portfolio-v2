// Wait until the entire HTML content has fully loaded
addEventListener('DOMContentLoaded', () => {
    const openMenu = document.querySelector('#open-menu') as HTMLButtonElement | null;
    const nav = document.querySelector('.nav') as HTMLElement | null;

    if (openMenu && nav) {
        // Toggle the navigation menu when the menu button is clicked
        openMenu.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close the navigation menu when clicking outside of it
        document.addEventListener('click', event => {
            const target = event.target as Node;

            if (nav.classList.contains('active') && !nav.contains(target) && !openMenu.contains(target)) {
                nav.classList.remove('active');
            }
        });
    }

    if (nav) {
        // Shrink the navbar when scrolling down
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('shrunk');
            } else {
                nav.classList.remove('shrunk');
            }
        });

        // Remove shrink effect when mouse enters the navbar
        nav.addEventListener('mouseenter', () => {
            nav.classList.remove('shrunk');
        });

        // Reapply shrink effect when mouse leaves the navbar and scroll is down
        nav.addEventListener('mouseleave', () => {
            if (window.scrollY > 100) {
                nav.classList.add('shrunk');
            }
        });
    }

    const projectButtonLeft = document.querySelector('#projects__left') as HTMLButtonElement | null;
    const projectButtonRight = document.querySelector('#projects__right') as HTMLButtonElement | null;
    const projectsContainer = document.querySelector('.projects__container') as HTMLDivElement | null;

    let index: number = 1;

    if (projectButtonLeft && projectButtonRight && projectsContainer) {
        // Navigate to the previous project
        projectButtonLeft.addEventListener('click', () => {
            if (index > 0) {
                index--;
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            }
        });

        // Navigate to the next project
        projectButtonRight.addEventListener('click', () => {
            if (index < 2) {
                index++;
                projectsContainer.style.transform = `translateX(${(1 - index) * 110}%)`;
            } else {
                console.log('You are already on the last project');
            }
        });
    }

    const modalOverlay = document.querySelector('#modal-overlay') as HTMLElement | null;

    if (modalOverlay) {
        // Set up the modal HTML structure
        modalOverlay.innerHTML = `
        <section class="game__modal hidden">
            <div class="game__modal__info">
                <button class="button game__modal__button" id="close-modal">
                    <img src="/images/svg/close.svg" alt="close icon" loading="lazy" />
                </button>
                <p>Moves: <span id="attempts">0</span></p>
            </div>
            <div class="cards__container" id="game"></div>
            <button class="button play__again" id="play-again">Play again</button>
            <div class="game__modal__message display-none">cards__message</div>
        </section>
        `;

        const gameModal = modalOverlay.querySelector('.game__modal') as HTMLElement;
        const closeModalButton = modalOverlay.querySelector('#close-modal') as HTMLButtonElement;
        const playAgainButton = modalOverlay.querySelector('#play-again') as HTMLButtonElement;
        const cardsContainer = modalOverlay.querySelector('.cards__container') as HTMLDivElement | null;
        const gameMessage = modalOverlay.querySelector('.game__modal__message') as HTMLDivElement | null;

        // Toggle the visibility of the modal
        function toggleModal(): void {
            gameModal?.classList.toggle('hidden');
            gameModal?.classList.toggle('active');
            modalOverlay?.classList.toggle('active');
        }

        const floatingGameButton = document.querySelector('#floating-game-button') as HTMLButtonElement | null;

        if (floatingGameButton) {
            // Open the modal when the floating button is clicked
            floatingGameButton.addEventListener('click', toggleModal);
        }

        // Close the modal when clicking the overlay or close button
        document.addEventListener('click', event => {
            const target = event.target as HTMLElement;

            if (event.target === modalOverlay || (closeModalButton && closeModalButton.contains(target))) {
                toggleModal();
            }
        });

        // Function to generate a card's HTML
        function createCard(): string {
            return `
            <div class="cards">
                <div class="card__item">
                    <div class="card__item-header">A</div>
                    <div class="card__item-symbol">♠</div>
                    <div class="card__item-footer">A</div>
                </div>
                <div class="poker-chip">
                </div>
            </div>
            `;
        }

        // Object to manage remaining attempts
        const attempts = {
            remainingAttempts: 3,
            show() {
                const attemptsShow = modalOverlay.querySelector('#attempts') as HTMLSpanElement | null;
                if (attemptsShow) {
                    attemptsShow.innerHTML = this.remainingAttempts.toString();
                }
            },
            reset() {
                this.remainingAttempts = 3;
                this.show();
            },
            lessOne() {
                if (this.remainingAttempts > 0) {
                    this.remainingAttempts--;
                    this.show();
                }
            },
        };

        // Start a new game
        function startGame() {
            if (!cardsContainer) return;
            cardsContainer.innerHTML = '';

            for (let i = 0; i < 4; i++) {
                cardsContainer.innerHTML += createCard();
            }

            const cards = cardsContainer.querySelectorAll('.cards') as NodeListOf<HTMLElement>;
            const winnerIndex = Math.floor(Math.random() * cards.length);
            let gameOver = false;

            // Add click events to each card
            cards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    if (attempts.remainingAttempts <= 0) {
                        gameOver = true;
                        showgameMessage('No more attempts left');
                    }

                    if (gameOver || card.classList.contains('active')) return;

                    if (index === winnerIndex) {
                        card.classList.add('winner');
                        showgameMessage('You win!');
                        gameOver = true;

                        const chipContainer = card.querySelector('.poker-chip') as HTMLDivElement | null;

                        if (chipContainer && !chipContainer.querySelector('img')) {
                            let img = document.createElement('img');
                            img.loading = 'lazy';
                            img.src = '/images/webp/poker-chip.webp';
                            img.alt = 'poker-chip';

                            setTimeout(() => {
                                chipContainer.appendChild(img);
                            }, 200);
                        }
                    } else {
                        card.classList.add('active');

                        setTimeout(() => {
                            card.classList.remove('active');
                        }, 1500);

                        attempts.lessOne();
                    }
                });
            });
        }

        // Reset the game when clicking "Play again"
        function playAgain() {
            const cards = cardsContainer?.querySelectorAll('.cards') as NodeListOf<HTMLElement>;

            cards.forEach(card => {
                card.classList.remove('winner', 'active');
                const redBox = card.querySelector('.red-box');
                if (redBox) redBox.remove();
            });

            attempts.reset();
            startGame();
        }

        playAgainButton?.addEventListener('click', playAgain);

        attempts.show();
        startGame();
    }

    // Display a message in the modal
    function showgameMessage(message: string): void {
        const gameMessage = document.querySelector('.game__modal__message') as HTMLDivElement | null;
        if (gameMessage) {
            gameMessage.classList.remove('display-none');
            gameMessage.innerHTML = message;
            setTimeout(() => {
                gameMessage.classList.add('display-none');
            }, 3000);
        }
    }
});
