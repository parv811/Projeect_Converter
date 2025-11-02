const swiper = new Swiper('.slider-wrapper', {
    // Enhanced visual effects
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    speed: 800,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    
    // Improved coverflow effect
    coverflowEffect: {
        rotate: 5,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: false,
    },
    
    // Enhanced navigation
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    
    // Dynamic pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '"></span>';
        }
    },

    // Responsive design
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    },

    // Smooth animations and interactions
    on: {
        init: function() {
            document.querySelectorAll('.swiper-slide').forEach(slide => {
                slide.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        },
        slideChangeTransitionStart: function() {
            document.querySelectorAll('.card-item').forEach(card => {
                card.style.transform = 'scale(1)';
                card.style.opacity = '0.7';
            });
        },
        slideChangeTransitionEnd: function() {
            const activeSlide = this.slides[this.activeIndex];
            if (activeSlide) {
                const card = activeSlide.querySelector('.card-item');
                if (card) {
                    card.style.transform = 'scale(1.1)';
                    card.style.opacity = '1';
                }
            }
        }
    }
});