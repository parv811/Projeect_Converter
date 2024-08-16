const swiper = new Swiper('.slider-wrapper', {
   
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    //For Responsiveness
    breakpoints: {

      0: {
        slidesPerView: 2
      },

      
      620: {
        slidesPerView: 3
      },

      1024: {
        slidesPerView: 3
      }


    }


   
  });