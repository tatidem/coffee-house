// document.addEventListener('DOMContentLoaded', function () {
//   const burgerIcon = document.querySelector('.burger-icon');
//   const burgerMenu = document.querySelector('.burger-menu');
//   const navLinks = document.querySelectorAll('.nav_show a.nav-link');

//   burgerIcon.addEventListener('click', function () {
//     toggleMenu();
//   });

 

//   function toggleMenu() {
//     burgerIcon.classList.toggle('active');
//     burgerMenu.classList.toggle('active');

//     if (burgerMenu.classList.contains('active')) {
//       burgerMenu.style.transform = 'translateX(0)';
//       document.body.classList.add('no-scroll');
//     } else {
//       burgerMenu.style.transform = 'translateX(100%)';
//       document.body.classList.remove('no-scroll');
//     }
//   }

//    // Закрывать burger-menu при клике на элементы списка nav
//    navLinks.forEach(link => {
//     link.addEventListener('click', function () {
//       closeMenu();
//     });
//   });

//   function closeMenu() {
//     burgerIcon.classList.remove('active');
//     burgerMenu.classList.remove('active');
//     burgerMenu.style.transform = 'translateX(100%)';
//     document.body.classList.remove('no-scroll');
//   }
// });

document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelectorAll('.nav_show a.nav-link');

  burgerIcon.addEventListener('click', function () {
    toggleMenu();
  });

  // Закрывать burger-menu при клике на элементы списка nav
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвратить стандартное поведение ссылки

      // Сначала закрыть burger-menu, затем открыть раздел
      closeMenu(() => {
        // Ваш код для открытия нужного раздела
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