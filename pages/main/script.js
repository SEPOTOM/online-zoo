{
function removeNavigationActiveHeader() {
  const links = document.querySelectorAll('.header__link');

  links.forEach((link) => {
    link.classList.remove('_active');
  });
}

function closeHeaderMenu() {
  const html = document.documentElement;
  const header = document.querySelector('.header');
  const headerContainer = header.querySelector('.header__container');
  const headerLogo = header.querySelector('.header__main-link');

  html.classList.remove('_menu-open');
  headerContainer.prepend(headerLogo);
  setTimeout(() => {
    header.classList.remove('_visible');
  }, 300);
}

function openHeaderMenu() {
  const html = document.documentElement;
  const header = document.querySelector('.header');
  const headerNavigation = header.querySelector('.header__navigation');
  const headerLogo = header.querySelector('.header__main-link');

  headerNavigation.prepend(headerLogo);
  html.classList.add('_menu-open');
  header.classList.add('_visible');
}

function changeCardFeedArrows(pageWidth) {
  const cardFeedItems = document.querySelectorAll('.cards-feed__item');

  if (pageWidth >= 1000) {
    cardFeedItems.forEach((cardFeedItem) => {
      cardFeedItem.classList.remove('_icon-curved-arrow');
      cardFeedItem.classList.add('_icon-hollow-arrow');
    });
  } else {
    cardFeedItems.forEach((cardFeedItem) => {
      cardFeedItem.classList.remove('_icon-hollow-arrow');
      cardFeedItem.classList.add('_icon-curved-arrow');
    });
  }
}

async function initPetsSlider(maxCards, activeSlideNum) {
  async function getCardsData() {
    const response = await fetch('/assets/json/card-pets.json');
    const data = await response.json();
    return data;
  }

  async function addSlides(maxCards, cardsData) {
    let cards;

    if (!currentCardsQuantity || currentCardsQuantity === maxCards) {
      const petsSwiper = document.querySelector('.pets__swiper');
      if (petsSwiper.children.length) return;

      const shuffledCards = getShuffledCards(cardsData);
      const slidesQuantity = Math.ceil(shuffledCards.length / maxCards);

      for (let i = 0; i < slidesQuantity; i++) {
        cards = getCardsForSlide(shuffledCards, maxCards);

        petsSwiper.append(createSlide(cards, cardsData));
      }
    } else if (currentCardsQuantity !== maxCards) {
      cards = document.querySelectorAll('.pets__card');
      changeCardDistribution(cards, maxCards);
    }

    currentCardsQuantity = maxCards;
  }

  function getShuffledCards(cardsData) {
    const cards = cardsData.cardsContent;
    return shuffle([...cards])
  }

  function getCardsForSlide(allCards, maxCards) {
    let spliceStart;
    let spliceEnd = allCards.length;

    if (allCards.length < maxCards) {
      spliceStart = 0;
    } else {
      spliceStart = allCards.length - maxCards;
    }

    let cards = allCards.splice(spliceStart, spliceEnd);

    return cards;
  }

  function createSlide(cards, cardsData) {
    const slide = document.createElement('div');
    slide.className = 'pets__slide';

    for (let i = 0; i < cards.length; i++) {
      let card;

      if (cardsData) {
        card = createCard(cards[i], cardsData);
      } else {
        card = cards[i];
      }

      slide.append(card);
    }

    return slide;
  }

  function createCard(cardContent, cardsData) {
    const card = document.createElement('div');
    card.className = 'pets__card';

    const article = cardPetsFunctions.createCard(cardContent, cardsData);
    card.append(article);

    return card;
  }

  function changeCardDistribution(allCards, maxCards) {
    allCards = [...allCards];
    let cards;

    const petsSwiper = document.querySelector('.pets__swiper');
    petsSwiper.innerHTML = '';

    let slidesQuantity = Math.ceil(allCards.length / maxCards);

    for (let i = 0; i < slidesQuantity; i++) {
      cards = getCardsForSlide(allCards, maxCards);

      const slide = createSlide(cards);
      petsSwiper.append(slide);
    }
  }

  function setActiveSlide(activeSlideNum) {
    const slides = document.querySelectorAll('.pets__slide');
    slides[activeSlideNum].classList.add('_active');
  }

  function getActiveSlide() {
    return document.querySelector('.pets__slide._active');
  }

  function getSlideWidth() {
    const slide = document.querySelector('.pets__slide');
    return slide.scrollWidth;
  }

  function getSlidesGap() {
    const swiper = document.querySelector('.pets__swiper');
    const swiperStyles = getComputedStyle(swiper);
    return parseInt(swiperStyles.columnGap);
  }

  function swipeRight() {
    if (activeSlide.nextElementSibling) {
      translate += slideWidth + slidesGap;
      swiper.style.transform = `translate(-${translate}px, 0)`;

      activeSlide.classList.remove('_active');

      activeSlideNum++;
      setActiveSlide(activeSlideNum);
      activeSlide = getActiveSlide(activeSlideNum);
    } else {
      translate = 0;
      swiper.style.transform = `translate(-${translate}px, 0)`;

      activeSlide.classList.remove('_active');

      activeSlideNum = 0;
      setActiveSlide(activeSlideNum);
      activeSlide = getActiveSlide(activeSlideNum);
    }
  }

  function swipeLeft() {
    if (activeSlide.previousElementSibling) {
      translate -= slideWidth + slidesGap;
      swiper.style.transform = `translate(-${translate}px, 0)`;

      activeSlide.classList.remove('_active');

      activeSlideNum--;
      setActiveSlide(activeSlideNum);
      activeSlide = getActiveSlide(activeSlideNum);
    } else {
      translate = (slideWidth + slidesGap) * (slides.length - 1);
      swiper.style.transform = `translate(-${translate}px, 0)`;

      activeSlide.classList.remove('_active');

      activeSlideNum = slides.length - 1;
      setActiveSlide(activeSlideNum);
      activeSlide = getActiveSlide(activeSlideNum);
    }
  }

  function changeSwiperTransform() {
    const swiper = document.querySelector('.pets__swiper');
    let slideWidth = getSlideWidth();
    let slidesGap = getSlidesGap();
    swiper.style.transform = `translate(-${(slideWidth + slidesGap) * ((activeSlideNum > 0) ? activeSlideNum - 1 : activeSlideNum)}, 0)`;
  }

  function replaceButtonsWithClones() {
    const rightButton = document.querySelector('.pets__swipe-to-right');
    const leftButton = document.querySelector('.pets__swipe-to-left');
    const contentBlock = rightButton.parentElement;

    rightButton.remove();
    leftButton.remove();

    contentBlock.append(leftButton.cloneNode(true), rightButton.cloneNode(true));
  }

  replaceButtonsWithClones();

  const rightButton = document.querySelector('.pets__swipe-to-right');
  const leftButton = document.querySelector('.pets__swipe-to-left');
  const cardsData = await getCardsData();

  rightButton.removeEventListener('click', swipeRight);
  leftButton.removeEventListener('click', swipeLeft);

  addSlides(maxCards, cardsData);

  const slides = document.querySelectorAll('.pets__slide');

  if (slides.length - 1 < activeSlideNum) {
    activeSlideNum = slides.length - 1;
  }

  let slideWidth = getSlideWidth();
  let slidesGap = getSlidesGap();
  let translate = 0;
  let activeSlide = getActiveSlide();

  if (activeSlide) {
    activeSlide.classList.remove('_active');
  }

  setActiveSlide(activeSlideNum);
  activeSlide = getActiveSlide();
  changeSwiperTransform();

  const swiper = document.querySelector('.pets__swiper');

  rightButton.addEventListener('click', swipeRight);
  leftButton.addEventListener('click', swipeLeft);
}

function shuffle(arr) {
	let j, temp;
  const newArr = [...arr];

	for(let i = newArr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = newArr[j];
		newArr[j] = newArr[i];
		newArr[i] = temp;
	}

	return newArr;
}

function initTestimonialsSlider(elem, pageWidth, slides) {
  function moveThumb(e) {
    moveThumbOn(e);

    document.addEventListener('mousemove', moveThumbOn);
    document.addEventListener('mouseup', stopMoveThumb);
    document.addEventListener('touchmove', moveThumbOn);
    document.addEventListener('touchend', stopMoveThumb);
  }

  function moveThumbOn(e) {
    const clientX = e.clientX || e.changedTouches[0].clientX;
    const rangeX = clientX - range.getBoundingClientRect().left;
    let rangeXPrc = (rangeX * 100) / range.scrollWidth;

    moveThumbTo(findNearestStepPrc(rangeXPrc, stepsPrc));
  }

  function moveThumbTo(left) {
    const rangeThumb = range.firstElementChild;
    rangeThumb.style.left = left + '%';

    swipeTo(left);
  }

  function stopMoveThumb() {
    document.removeEventListener('mousemove', moveThumbOn);
    document.removeEventListener('mouseup', stopMoveThumb);
    document.removeEventListener('touchmove', moveThumbOn);
    document.removeEventListener('touchend', stopMoveThumb);
  }

  function swipeTo(left) {
    const rest = (left) ? swiperRest : 0;

    const multiplier = Math.round(left / step.valuePrc);
    const translateX = ((slideData.width + slideData.marginRight) * multiplier) + rest;
    swiper.style.transform = `translate3d(-${translateX}px, 0, 0)`;
  }

  function getStep() {
    const slides = swiper.children;

    const swiperWidth = swiper.offsetWidth;
    const stepWidth = slideData.width + slideData.marginRight;
    const slidesLength = slides.length;

    let value = slidesLength - Math.floor(swiperWidth / stepWidth);
    let fullSlidesWidth = 0;

    for (let i = 0; i <= value; i++) {
      fullSlidesWidth += stepWidth;
    }

    fullSlidesWidth -= slideData.marginRight;

    if (swiperWidth < fullSlidesWidth) {
      value--;
    }

    return {
      value: value,
      valuePrc: 100 / (value + 1),
    };
  }

  function getStepsPrc(step) {
    const steps = [];
    const lastStep = 100 - step.valuePrc;

    for (let i = 0; i < lastStep; i += step.valuePrc) {
      steps.push(i);
    }

    steps.push(lastStep);

    return steps;
  }

  function getSlideData() {
    const slide = swiper.firstElementChild;
    const slideStyles = getComputedStyle(slide);

    return {
      width: slide.offsetWidth,
      marginRight: parseInt(slideStyles.marginRight),
    };
  }

  function getSwiperRest() {
    const swiperWidth = swiper.offsetWidth;
    let maxSlidesWidth = 0;

    while (swiperWidth > maxSlidesWidth) {
      maxSlidesWidth += slideData.width + slideData.marginRight;
    }

    let rest = maxSlidesWidth - swiperWidth - slideData.marginRight;

    if (rest < 0) {
      rest = 0;
    }

    return rest;
  }

  function replaceRangeWithClone() {
    const range = elem.querySelector('[data-range]');
    const row = range.parentElement;

    row.innerHTML = '';
    row.append(range.cloneNode(true));
  }

  function findNearestStepPrc(prc, steps) {
    if (prc < 0) {
      return steps[0];
    } else if (prc > 100) {
      return steps[steps.length - 1];
    }

    let smallerStepPrc;

    for(let i = 1; steps[i] < prc; i++) {
      smallerStepPrc = steps[i];
    }

    if (!smallerStepPrc) {
      return steps[0];
    }

    return smallerStepPrc;
  }

  function setTogglerWidth() {
    toggler.style.width = `${step.valuePrc}%`;
  }

  function needRange() {
    const slidesQuantity = swiper.children.length;
    return swiper.offsetWidth < ((slideData.width + slideData.marginRight) * slidesQuantity) - slideData.marginRight;
  }

  function hideRange() {
    swiper.style.transform = '';
    toggler.style.left = '';
    row.style.display = 'none';
  }

  function showRange() {
    row.style.display = '';
  }

  replaceRangeWithClone();

  const swiper = elem.querySelector('[data-swiper]');
  const range = elem.querySelector('[data-range]');
  const toggler = range.firstElementChild;
  const row = range.parentElement;

  if (pageWidth < 1000) {
    const firstThreeSLides = slides.slice(0, 3);

    swiper.innerHTML = '';
    swiper.append(...firstThreeSLides);

    hideRange();

    return;
  } else {
    swiper.append(...slides);
  }


  const slideData = getSlideData();
  const swiperRest = getSwiperRest();

  if (!needRange()) {
    hideRange();
    return;
  } else {
    showRange();
  }

  const step = getStep();
  const stepsPrc = getStepsPrc(step);

  setTogglerWidth();

  range.addEventListener('mousedown', moveThumb);
  range.addEventListener('touchstart', moveThumb);
}

function initTestimonialsPopup(pageWidth) {
  function showPopup(e) {
    const target = e.target;
    let slide = target.closest('.testimonials__slide');

    if (slide && slide.classList.contains('popup')) {
      slide = slide.parentElement.closest('.testimonials__slide');
    }

    if (slide) {
      currentSlide = slide;

      document.documentElement.classList.add('_popup-open');

      addPopup();
      addBackground();
      addCloseButton();
      setTimeout(() => {
        centerPopup();

        setTimeout(() => {
          showPopupContent();

          if (isPopupFullHeight()) {
            makePopupFullHeight();
          }
        }, 200)
      }, 0);

      document.addEventListener('click', closePopup);
    }
  }

  function closePopup(e) {
    const target = e.target;

    if (target.closest('.popup-button') || target.closest('.testimonials__background')) {
      hidePopupContent();

      setTimeout(() => {
        popup.classList.remove('popup_centered');
        popup.classList.remove('popup_full-height');
        popup.style.width = `${currentSlide.offsetWidth}px`;
        setPopupPosition();

        closeButton.classList.remove('_active');
        background.classList.remove('_active');
      }, 200);

      setTimeout(() => {
        popup.remove();
        background.remove();

        currentSlide = null;
        popup = null;
        background = null;
        closeButton = null;

        document.documentElement.classList.remove('_popup-open');
      }, 400);

      document.removeEventListener('click', closePopup);
    }
  }

  function createBackground() {
    background = document.createElement('div');
    background.classList.add('testimonials__background');
    return background;
  }

  function addBackground() {
    if (background) {
      background.classList.add('_active');
      return;
    }

    createBackground();
    testimonialsSwiper.append(background);
    setTimeout(() => {
      background.classList.add('_active');
    }, 0);
  }

  function addCloseButton() {
    createCloseButton();
    popup.append(closeButton);
  }

  function createCloseButton() {
    closeButton = document.createElement('button');
    closeButton.classList.add('popup-button');
    closeButton.type = 'button';
    return closeButton;
  }

  function addPopup() {
    popup = currentSlide.cloneNode(true);
    popup.classList.add('popup');
    popup.style.width = `${currentSlide.offsetWidth}px`;

    setPopupPosition();

    testimonialsSwiper.append(popup);
  }

  function setPopupPosition() {
    const position = currentSlide.getBoundingClientRect();
    popup.style.top = `${position.top}px`;
    popup.style.left = `${position.left}px`;
    popup.style.right = `${position.left}px`;
  }

  function centerPopup() {
    popup.style.cssText = '';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.width = '267px';
    popup.classList.add('popup_centered');
  }

  function showPopupContent() {
    popup.style.maxHeight = `${popup.scrollHeight}px`;
    setTimeout(() => {
      popup.classList.add('popup_opened');
    }, 200);
  }

  function isPopupFullHeight() {
    const windowHeight = window.innerHeight;
    return windowHeight < popup.scrollHeight;
  }

  function makePopupFullHeight() {
    popup.classList.remove('popup_centered');
    popup.classList.add('popup_full-height');
    popup.style.top = '20px';
    popup.style.bottom = '20px';
    popup.style.left = '50%';
    popup.style.width = '277px';
    popup.style.maxHeight = `${window.innerHeight - 40}px`;
  }

  function hidePopupContent() {
    popup.classList.remove('popup_opened');
    popup.classList.remove('popup_full-height');
    centerPopup();
    popup.style.maxHeight = '';
    popup.style.bottom = '';
  }

  const testimonialsSwiper = document.querySelector('.testimonials__swiper');
  let currentSlide = null;
  let popup = null;
  let background = null;
  let closeButton = null;

  if (pageWidth < 1000) {
    testimonialsSwiper.onclick = showPopup;
  } else {
    testimonialsSwiper.onclick = '';
  }
}

const cardPetsFunctions = {
  createCard(cardContent, cardsData) {
    const classes = cardsData.classes;

    const article = document.createElement('article');
    article.className = classes.body;

    const link = cardPetsFunctions.createLink(cardContent, classes);
    const content = cardPetsFunctions.createContent(cardContent, classes);

    article.append(link, content);

    return article;
  },

  createLink(cardContent, classes) {
    const link = document.createElement('a');
    link.className = classes.imageLink;
    link.href = cardContent.linkTo;

    const image = cardPetsFunctions.createImage(cardContent, classes);
    const hiddenBlock = cardPetsFunctions.createHiddenBlock(cardContent, classes);

    link.append(image, hiddenBlock);

    return link;
  },

  createImage(cardContent, classes) {
    const image = document.createElement('img');
    image.className = classes.image;
    image.src = cardContent.imageURL;
    image.alt = cardContent.imageText;

    return image;
  },

  createHiddenBlock(cardContent, classes) {
    const hiddenBlock = document.createElement('div');
    hiddenBlock.className = classes.hiddenBlock;

    const title = cardPetsFunctions.createTitle(cardContent, classes);
    const description = cardPetsFunctions.createDescription(cardContent, classes);

    hiddenBlock.append(title, description);

    return hiddenBlock;
  },

  createTitle(cardContent, classes) {
    const title = document.createElement('h3');
    title.className = classes.title;
    title.textContent = cardContent.title;

    return title;
  },

  createDescription(cardContent, classes) {
    const description = document.createElement('p');
    description.className = classes.description;
    description.textContent = cardContent.description;

    return description;
  },

  createContent(cardContent, classes) {
    const content = document.createElement('div');
    content.className = classes.content;

    const title = cardPetsFunctions.createTitle(cardContent, classes);
    const place = cardPetsFunctions.createPlace(cardContent, classes);
    const icon = cardPetsFunctions.createIcon(cardContent, classes);

    content.append(title, place, icon);

    return content;
  },

  createPlace(cardContent, classes) {
    const place = document.createElement('p');
    place.className = classes.place;
    place.textContent = cardContent.place;

    return place;
  },

  createIcon(cardContent, classes) {
    const icon = document.createElement('img');
    icon.className = classes.icon;

    if (cardContent.food === 'herbivore') {
      icon.classList.add(classes.iconMargin);
      icon.src = '/assets/icons/banana-bamboo.svg';
      icon.alt = 'Banana and bamboo icon (this animal is herbivore)';
    } else {
      icon.src = '/assets/icons/meat-fish.svg';
      icon.alt = 'Meat and fish icon (this animal is carnivorous)';
    }

    return icon;
  },
}

let currentCardsQuantity;

// Footer form logic

{
  const footerInput = document.querySelector('.form-footer__input');
  const footerInputParent = footerInput.parentElement;

  if (footerInput.value === '') {
    footerInputParent.classList.add('_default');
  }

  footerInput.addEventListener('focus', () => {
    footerInputParent.classList.add('_active');
  });
  footerInput.addEventListener('blur', () => {
    footerInputParent.classList.remove('_active');
  });
  footerInput.addEventListener('input', () => {
    if (footerInput.value === '') {
      footerInputParent.classList.add('_default');
    } else {
      footerInputParent.classList.remove('_default');
    }
  });
}

// Header menu logic

{
  const html = document.documentElement;
  const header = document.querySelector('.header');

  header.addEventListener('click', (e) => {
    if (html.classList.contains('_menu-open') && (e.target.closest('.header__menu') || !e.target.closest('.header__navigation'))) {
      closeHeaderMenu();
    } else if (e.target.closest('.header__menu')) {
      openHeaderMenu();
    }
  });
}

// Resize listener

{
  let pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
  let maxCards = 6;
  let activeSlideNum = 0;

  if (pageWidth <= 640) {
    removeNavigationActiveHeader();
  }

  if (pageWidth < 1000) {
    maxCards = 4;
  } else {
    maxCards = 6;
  }

  const testimonialsSlider = document.querySelector('.testimonials__slider');
  const swiper = testimonialsSlider.querySelector('[data-swiper]');
  const slides = [...swiper.children];

  changeCardFeedArrows(pageWidth);
  initPetsSlider(maxCards, activeSlideNum);
  initTestimonialsSlider(testimonialsSlider, pageWidth, slides);
  initTestimonialsPopup(pageWidth);

  window.addEventListener('resize', () => {
    pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

    if (pageWidth <= 640) {
      removeNavigationActiveHeader();
    }

    if (pageWidth > 640) {
      closeHeaderMenu();
    }

    if (pageWidth < 1000) {
      maxCards = 4;
    } else {
      maxCards = 6;
    }

    changeCardFeedArrows(pageWidth);
    initPetsSlider(maxCards, activeSlideNum);
    initTestimonialsSlider(testimonialsSlider, pageWidth, slides);
    initTestimonialsPopup(pageWidth);
  });
}
}