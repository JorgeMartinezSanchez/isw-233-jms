(function() {
    'use strict';

    const carousel = document.getElementById('carousel');
    const cards = Array.from(document.querySelectorAll('.card'));

    // --- DRAG TO SCROLL ---
    let isDragging = false;
    let startX, scrollLeft;

    // drag start
    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        // disable smooth scroll while dragging
        carousel.style.scrollBehavior = 'auto';
    };

    const dragEnd = () => {
        isDragging = false;
        carousel.classList.remove('dragging');
        // re-enable smooth scroll (for optional programmatic)
        carousel.style.scrollBehavior = 'smooth';
    };

    const dragMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.8; // scroll speed
        carousel.scrollLeft = scrollLeft - walk;
        
        // after drag move, recalc opacities immediately
        requestAnimationFrame(updateOpacities);
    };

    // mouse & touch events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('mouseup', dragEnd);
    window.addEventListener('touchend', dragEnd);

    // --- OPACITY BASED ON PROXIMITY TO CENTER ---
    function updateOpacities() {
        // carousel center relative to viewport
        const carouselRect = carousel.getBoundingClientRect();
        const carouselCenterX = carouselRect.left + carouselRect.width / 2;

        // find distances from each card's center to carouselCenterX
        const cardDistances = cards.map(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenterX - carouselCenterX);
            return { card, distance };
        });

        // find minimum distance (closest to center)
        const minDistance = Math.min(...cardDistances.map(d => d.distance));
        
        cardDistances.forEach(({ card, distance }) => {
            let opacity;
            if (distance === minDistance) {
                opacity = 1.0;   // highlighted
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

    // initial update and on scroll
    carousel.addEventListener('scroll', () => {
        requestAnimationFrame(updateOpacities);
    });

    // also after any reflow / resize
    window.addEventListener('resize', () => {
        requestAnimationFrame(updateOpacities);
    });

    // initial update after layout
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