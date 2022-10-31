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

function changeFormRangeActive(pageWidth) {
  const activeItem = document.querySelector('[data-active]');

  if (pageWidth <= 840) {
    activeItem.classList.add('_active');
  } else {
    activeItem.classList.remove('_active');
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

// Price input logic

{
  const input = document.querySelector('.form-feed__price-field');
  const inputParent = input.parentElement;

  input.addEventListener('input', () => {
    if (input.value.length > 4) {
      input.value = input.value.slice(0, 4);
    }
  });
  input.addEventListener('focus', () => {
    inputParent.classList.add('_active');
  });
  input.addEventListener('blur', () => {
    inputParent.classList.remove('_active');
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

  changeFormRangeActive(pageWidth);

  window.addEventListener('resize', () => {
    pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

    if (pageWidth <= 640) {
      removeNavigationActiveHeader();
    }

    if (pageWidth > 640) {
      closeHeaderMenu();
    }

    changeFormRangeActive(pageWidth);
  });
}
