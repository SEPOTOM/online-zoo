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
}

function openHeaderMenu() {
  const html = document.documentElement;
  const header = document.querySelector('.header');
  const headerNavigation = header.querySelector('.header__navigation');
  const headerLogo = header.querySelector('.header__main-link');

  headerNavigation.prepend(headerLogo);
  html.classList.add('_menu-open');
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

  if (pageWidth <= 640) {
    removeNavigationActiveHeader();
  }

  changeCardFeedArrows(pageWidth);

  window.addEventListener('resize', () => {
    pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

    if (pageWidth <= 640) {
      removeNavigationActiveHeader();
    }

    if (pageWidth > 640) {
      closeHeaderMenu();
    }

    changeCardFeedArrows(pageWidth);
  });
}
