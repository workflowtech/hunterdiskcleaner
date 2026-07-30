<script>
    let currentSlideIndex = 0;
    let slideTimeout;
    const autoSlideInterval = 6000;

    const wrapper = document.getElementById("carouselWrapper");
    const container = document.getElementById("carouselContainer");
    const dots = document.getElementsByClassName("dot");
    const totalSlides = document.getElementsByClassName("carousel-slide").length;

    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener("DOMContentLoaded", () => {
        updateCarousel();
        startAutoSlide();
        setupTouchEvents();
    });

    function updateCarousel() {
        wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }
        if (dots[currentSlideIndex]) {
            dots[currentSlideIndex].classList.add("active");
        }
    }

    function moveSlide(n) {
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
            currentSlideIndex++;
            if (currentSlideIndex >= totalSlides) { currentSlideIndex = 0; }
            updateCarousel();
            startAutoSlide();
        }, autoSlideInterval);
    }

    function resetAutoSlide() {
        clearTimeout(slideTimeout);
        startAutoSlide();
    }

    function setupTouchEvents() {
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
</script>

<script>
function handleMSStoreDownload(event, productId) {
    // Detecta se o sistema operacional é Windows
    const isWindows = /Win/i.test(navigator.userAgent || navigator.platform);

    if (isWindows) {
        // Previne o comportamento padrão imediato do link web
        event.preventDefault();

        const webUrl = `https://apps.microsoft.com/detail/${productId}`;
        const storeProtocolUrl = `ms-windows-store://pdp/?ProductId=${productId}`;

        // Tenta abrir o protocolo nativo usando um iframe invisível
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = storeProtocolUrl;
        document.body.appendChild(iframe);

        // Fallback: se o aplicativo da loja não responder a tempo, abre o link Web
        const fallbackTimer = setTimeout(() => {
            document.body.removeChild(iframe);
            window.open(webUrl, '_blank', 'noopener,noreferrer');
        }, 1500);

        // Se a página perder o foco, significa que o app da Microsoft Store abriu com sucesso
        window.addEventListener('blur', function clearFallback() {
            clearTimeout(fallbackTimer);
            if (iframe.parentNode) {
                document.body.removeChild(iframe);
            }
            window.removeEventListener('blur', clearFallback);
        });
    }
    // Se NÃO for Windows, o evento não é interrompido e o link web (href) abre normalmente.
}
</script>
