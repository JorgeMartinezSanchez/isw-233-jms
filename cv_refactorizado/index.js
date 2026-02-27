(function() {
    'use strict';

    const carousel = document.getElementById('carousel');
    const cards = Array.from(document.querySelectorAll('.card'));

    // --- DRAG TO SCROLL ---
    let isDragging = false;
    let startX, scrollLeft;

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add('carousel--dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.scrollBehavior = 'auto';
    };

    const dragEnd = () => {
        isDragging = false;
        carousel.classList.remove('carousel--dragging');
        carousel.style.scrollBehavior = 'smooth';
    };

    const dragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.8;
        carousel.scrollLeft = scrollLeft - walk;
        
        requestAnimationFrame(updateOpacities);
    };

    // Mouse & touch events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    // --- OPACITY BASED ON PROXIMITY TO CENTER ---
    function updateOpacities() {
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenterX = carouselRect.left + carouselRect.width / 2;

        const cardDistances = cards.map(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenterX - carouselCenterX);
            return { card, distance };
        });

        const minDistance = Math.min(...cardDistances.map(d => d.distance));
        
        cardDistances.forEach(({ card, distance }) => {
            let opacity;
            if (distance === minDistance) {
                opacity = 1.0;
            } else {
                const diff = distance - minDistance;
                opacity = Math.max(0.35, 1.0 - diff / 600);
                if (opacity > 0.75) opacity = 0.8;
                else if (opacity > 0.6) opacity = 0.6;
                else opacity = Math.max(0.4, opacity);
            }
            card.style.opacity = opacity.toFixed(2);
        });
    }

    carousel.addEventListener('scroll', () => {
        requestAnimationFrame(updateOpacities);
    });

    window.addEventListener('resize', () => {
        requestAnimationFrame(updateOpacities);
    });

    // Initial update
    setTimeout(() => {
        updateOpacities();
        carousel.style.scrollBehavior = 'smooth';
        if (cards.length > 2) {
            const targetCard = cards[2];
            const cardLeft = targetCard.offsetLeft;
            const containerWidth = carousel.clientWidth;
            const cardWidth = targetCard.clientWidth;
            carousel.scrollLeft = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        }
        updateOpacities();
    }, 10);
})();