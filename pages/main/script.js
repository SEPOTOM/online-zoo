function removeNavigationActiveHeader() {
  const links = document.querySelectorAll('.header__link');

  links.forEach((link) => {
    link.classList.remove('_active');
  });
}

function closeHeaderMenu() {
  const header = document.querySelector('.header');
  const headerContainer = header.querySelector('.header__container');
  const headerLogo = header.querySelector('.header__main-link');

  header.classList.remove('_menu-open');
  headerContainer.prepend(headerLogo);
}

function openHeaderMenu() {
  const header = document.querySelector('.header');
  const headerNavigation = header.querySelector('.header__navigation');
  const headerLogo = header.querySelector('.header__main-link');

  headerNavigation.prepend(headerLogo);
  header.classList.add('_menu-open');
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
  const header = document.querySelector('.header');
  const burgerButton = header.querySelector('.header__menu');

  burgerButton.addEventListener('click', () => {
    if (header.classList.contains('_menu-open')) {
      closeHeaderMenu();
    } else {
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

  window.addEventListener('resize', () => {
    pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

    if (pageWidth <= 640) {
      removeNavigationActiveHeader();
    }

    if (pageWidth > 640) {
      closeHeaderMenu();
    }
  });
}
