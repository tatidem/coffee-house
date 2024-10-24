document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.burger-icon');
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelectorAll('.nav_show a.nav-link');
  const menuLinks = document.querySelectorAll('.burger_menu-button');
  const categoryLinks = document.querySelectorAll('.category');
  const offerButtons = document.querySelectorAll('.offer__button-content');

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


menuLinks.forEach(link => {
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

function sliderstart(){

document.addEventListener('DOMContentLoaded', function () {
	//SLIDER

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
});
}

//Modal window

function modalLoad() {
	var products;
	var current_product;
	var price_size;
	var price_add;
	var price_total;
	
	document.addEventListener('DOMContentLoaded', function () {
		const galleryItems = document.querySelectorAll('.gallery-item');
		const overlay = document.querySelector('.overlay');
		const menuWindow = document.querySelector('.menu-window');
		const closeButton = document.querySelector('.menu-window .close-button');
		var prod = current_product;
		function setPrice(product, but) {
			price_total = parseFloat(current_product.price);
			var butvol = but ? but.querySelector('.volume') : undefined;
			if (butvol) {
				butvol.classList.forEach(function(cls){
					if (cls === "s" || cls === "m" || cls === "l") {
						price_size = parseFloat(current_product.sizes[cls]["add-price"]);
					}
				});
			}
			price_add = 0;
			menuWindow.querySelectorAll('.additives-buttons .additives').forEach(function(bbt){
				if (bbt.classList.contains("active")) {
					var addname = bbt.querySelector('.name').textContent;
					var adddata = current_product.additives.find(function(n){ if (n.name === addname) return n;});
					if (adddata) {
						price_add += parseFloat(adddata["add-price"]);
					} else {
						alert("error, additives data not found");
					}
				}		
			});					
			price_total += price_size;
			price_total += price_add;
			menuWindow.querySelector('.price').textContent = "$" + price_total.toFixed(2);
		}
		
		const size_button = menuWindow.querySelectorAll('.size-button');
		size_button.forEach(function(but){
			but.addEventListener('click', function (t) {
				size_button.forEach(function(b){if(b != but) b.classList.remove('active');});
				but.classList.toggle('active');
				var clear_all = true; 
				size_button.forEach(function(b){if(b.classList.contains('active')) {clear_all = false; return;}});
				if (clear_all) {size_button[0].classList.add('active');}
				setPrice(menuWindow.querySelector('.menu-window__content h3').textContent, but);
			});
		});
		
		const additives_buttons = menuWindow.querySelectorAll('.additives');
		additives_buttons.forEach(function(but){
			but.addEventListener('click', function () {
				but.classList.toggle('active');
				setPrice(menuWindow.querySelector('.menu-window__content h3').textContent, undefined);
			});
		});
		
		function openMenuWindow() {
			menuWindow.style.display = 'block';
			overlay.style.display = 'block';
			document.body.style.overflow = 'hidden'; 
		}
		
		function closeMenuWindow() {
			menuWindow.style.display = 'none';
			overlay.style.display = 'none';
			document.body.style.overflow = ''; 
		}
		function getPageName(url) {
			var pageName = url.split('/').pop().split('.')[0];
			return pageName.length > 0 ? pageName : null;
		}
		galleryItems.forEach(function (item) {
			item.addEventListener('click', function () {
				openMenuWindow();
				size_button.forEach(function(b, index){ if (index == 0) {b.classList.add('active')} else  {b.classList.remove('active');}});
				additives_buttons.forEach(function(b){ b.classList.remove('active');});
				var coffname = item.querySelector('.gallery-item__text h3').textContent;
				var active_page_name = getPageName(window.location.href);
				var active_category;
				var additives_names;
				var mass;
				switch (active_page_name) {
					case 'menu':
						active_category = "coffee";
						additives_names = ["Sugar", "Cinnamon", "Syrup"];
						mass = ["200&#160;ml", "300&#160;ml ", "400&#160;ml"];
						break;
					case 'tea':
						active_category = "tea";
						additives_names = ["Sugar", "Lemon", "Syrup"];
						mass = ["200&#160;ml", "300&#160;ml ", "400&#160;ml"];
						break;
					case 'dessert':
						active_category = "dessert";
						additives_names = ["Berries", "Nuts", "Jam"];
						mass = ["50&#160;g", "100&#160;g ", "200&#160;g"];
				}
				menuWindow.querySelectorAll('.additives-buttons .additives').forEach(function(bbt, i){
					//alert(bbt.querySelector('.additive.name').innerHTML);
					bbt.querySelector('.additive.name').innerHTML = additives_names[i];
					//bbt.querySelector('.additive.name').textContent = additives_names[i];
				});
				menuWindow.querySelectorAll('.size-buttons .size-button').forEach(function(bbt, i){
					//alert(bbt.querySelector('.additive.name').innerHTML);
					bbt.querySelector('.size').innerHTML = mass[i];
					//bbt.querySelector('.additive.name').textContent = additives_names[i];
				});
				var j = 0;
				products.forEach(function(prod, i){
					if (prod.category === active_category) {
						if (prod.name === coffname){
							menuWindow.querySelector('.menu-window__content h3').textContent = prod.name;
							menuWindow.querySelector('.menu-window__content .description').textContent = prod.description;
							var imgReplace = menuWindow.querySelector(".menu-window_coffee-image img");
							switch (active_page_name) {
								case 'menu':
									imgReplace.src = "../img/coffee-"+(j+1).toString()+".jpg";
									break;
								case 'tea':
									imgReplace.src = "../img/tea-"+(j+1).toString()+".png";
									break;
								case 'dessert':
									imgReplace.src = "../img/dessert-"+(j+1).toString()+".png";
									break;
								default:
									console.log("error src(");
							}
							price_total = parseFloat(prod.price);
							price_size = parseFloat(prod.sizes.s["add-price"]);
							price_add = 0;
							price_total += price_size;
							price_total += price_add;
							menuWindow.querySelector('.price').textContent = "$" + price_total.toFixed(2);
							current_product = prod;
						}
						j += 1;
					}
				});
				var clbut = menuWindow.querySelector('.close-button');
				menuWindow.querySelector('.close-button').addEventListener('click', function (e) {
					clbut.classList.add('active');
				});
				clbut.classList.remove('active');
			});
		});

		closeButton.addEventListener('click', function () {
			setTimeout(closeMenuWindow, 200);
		});

		overlay.addEventListener('click', function () {
			closeMenuWindow();
		});
		  
		menuWindow.addEventListener("contextmenu", function(e) {e.preventDefault();});
		menuWindow.onselectstart = function(e) {e.preventDefault();};
		const refreshButton = document.querySelector('.refresh-button');
		if (refreshButton) {
			const galleryItemsToHide = document.querySelectorAll('.gallery-item:nth-child(5), .gallery-item:nth-child(6), .gallery-item:nth-child(7), .gallery-item:nth-child(8)');
			refreshButton.addEventListener('click', function() {
			  refreshButton.style.display = 'none';
			  galleryItemsToHide.forEach(item => {
				item.style.display = 'flex';
			  });
			});
		}
		//JSON:  
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'products.json', true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				products = JSON.parse(xhr.responseText);
				
			} else {
				console.log("error, JSON not loaded(");
				
			}
		};
		xhr.send();
	});
}


