

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelectorAll('.nav_show a.nav-link');

  burgerIcon.addEventListener('click', function () {
    toggleMenu();
  });

 
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); 

   
      closeMenu(() => {
   
        window.location.href = link.getAttribute('href');
      });
    });
  });

  function toggleMenu() {
    burgerIcon.classList.toggle('active');
    burgerMenu.classList.toggle('active');

    if (burgerMenu.classList.contains('active')) {
      burgerMenu.style.transform = 'translateX(0)';
      document.body.classList.add('no-scroll');
    } else {
      burgerMenu.style.transform = 'translateX(100%)';
      document.body.classList.remove('no-scroll');
    }
  }

  function closeMenu(callback) {
    burgerIcon.classList.remove('active');
    burgerMenu.classList.remove('active');
    burgerMenu.style.transform = 'translateX(100%)';
    document.body.classList.remove('no-scroll');

    setTimeout(callback, 300);
  }
});



const sliderLine = document.querySelector('.favorite__slider-line');
const arrowLeft = document.querySelector('.favorite__arrows_left');
const arrowRight = document.querySelector('.favorite__arrows_right');
const controls = document.querySelectorAll('.favorite-control');
const sliderWrapper = document.querySelector('.favorite__slider-wrapper');

let position = 0,
  controlIndex = 0;

// FUNCTIONS

const nextSlide = () => {
  clearInterval(interval);
  const slideWidth = sliderWrapper.clientWidth;
  if (position < (controls.length - 1) * slideWidth) {
    position += slideWidth;
    controlIndex++;
  } else {
    position = 0;
    controlIndex = 0;
  }
  sliderLine.style.left = -position + 'px';
  thisSlide(controlIndex);
  startInterval();
};

const prevSlide = () => {
  clearInterval(interval);
  const slideWidth = sliderWrapper.clientWidth;
  if (position > 0) {
    position -= slideWidth;
    controlIndex--;
  } else {
    position = (controls.length - 1) * slideWidth;
    controlIndex = controls.length - 1;
  }
  sliderLine.style.left = -position + 'px';
  thisSlide(controlIndex);
  startInterval();
};

const thisSlide = (index) => {
  clearInterval(interval);
  for (let control of controls) {
    control.classList.remove('active');
  }
  controls[index].classList.add('active');
};

// EVENT LISTENERS

arrowRight.addEventListener('click', nextSlide);
arrowLeft.addEventListener('click', prevSlide);

controls.forEach((control, index) => {
  control.addEventListener('click', () => {
    clearInterval(interval);
    const slideWidth = sliderWrapper.clientWidth;
    position = slideWidth * index;
    sliderLine.style.left = -position + 'px';
    controlIndex = index;
    thisSlide(controlIndex);
    startInterval();
  });
});

// Swipe functionality
sliderWrapper.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

sliderWrapper.addEventListener('touchmove', (e) => {
  clearInterval(interval);
  if (isSwiping) {
    const deltaX = e.touches[0].clientX - startX;
  
    if (Math.abs(deltaX) > 50) {
      isSwiping = false;
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      
    }
  }
});

sliderWrapper.addEventListener('touchend', () => {
  isSwiping = false;
  startInterval();
 
});


let interval;

const startInterval = () => {
  interval = setInterval(() => {
    nextSlide();
  }, 4000);
};


startInterval();
