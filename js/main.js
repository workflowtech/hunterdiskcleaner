// Variable declarations
let currentSlideIndex = 0;
let slideTimeout;
const autoSlideInterval = 6000;

let wrapper;
let container;
let dots;
let totalSlides = 0;

let touchStartX = 0;
let touchEndX = 0;

// Initialize features after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    wrapper = document.getElementById("carouselWrapper");
    container = document.getElementById("carouselContainer");
    dots = document.getElementsByClassName("dot");
    
    // Check if carousel exists on current page before initializing
    if (wrapper && container) {
        totalSlides = document.getElementsByClassName("carousel-slide").length;
        updateCarousel();
        startAutoSlide();
        setupTouchEvents();
    }
});

// Carousel functions (must remain global for HTML inline onclick calls)
function updateCarousel() {
    if (!wrapper) return;
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add("active");
    }
}

function moveSlide(n) {
    if (totalSlides === 0) return;
    currentSlideIndex += n;
    if (currentSlideIndex >= totalSlides) { currentSlideIndex = 0; }
    if (currentSlideIndex < 0) { currentSlideIndex = totalSlides - 1; }
    updateCarousel();
    resetAutoSlide();
}

function currentSlide(n) {
    currentSlideIndex = n;
    updateCarousel();
    resetAutoSlide();
}

function startAutoSlide() {
    slideTimeout = setTimeout(() => {
        if (totalSlides > 0) {
            currentSlideIndex++;
            if (currentSlideIndex >= totalSlides) { currentSlideIndex = 0; }
            updateCarousel();
            startAutoSlide();
        }
    }, autoSlideInterval);
}

function resetAutoSlide() {
    clearTimeout(slideTimeout);
    startAutoSlide();
}

function setupTouchEvents() {
    if (!container) return;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        moveSlide(1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        moveSlide(-1);
    }
}

// Microsoft Store Protocol Handler
function handleMSStoreDownload(event, productId) {
    const isWindows = /Win/i.test(navigator.userAgent || navigator.platform);

    if (isWindows) {
        event.preventDefault();

        const webUrl = `https://apps.microsoft.com/detail/${productId}`;
        const storeProtocolUrl = `ms-windows-store://pdp/?ProductId=${productId}`;

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = storeProtocolUrl;
        document.body.appendChild(iframe);

        const fallbackTimer = setTimeout(() => {
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        }, 1500);

        window.addEventListener('blur', function clearFallback() {
            clearTimeout(fallbackTimer);
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            window.removeEventListener('blur', clearFallback);
        });
    }
}
