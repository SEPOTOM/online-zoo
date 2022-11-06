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

function initFormFeed(pageWidth, hiddenRangeElements) {
  function hideShowRangeElements() {
    let counter = 0;

    if (pageWidth < 1600 && !hiddenRangeElements.first) {
      hiddenRangeElements.first = range.firstElementChild;
      range.firstElementChild.remove();
    } else if (pageWidth >= 1600 && hiddenRangeElements.first) {
      counter++;
    }

    if (pageWidth < 1000 && !hiddenRangeElements.second) {
      hiddenRangeElements.second = range.firstElementChild;
      range.firstElementChild.remove();
    } else if (pageWidth >= 1000 && hiddenRangeElements.second) {
      counter++;
    }

    if (pageWidth < 841 && !hiddenRangeElements.third) {
      hiddenRangeElements.third = range.firstElementChild;
      range.firstElementChild.remove();
    } else if (pageWidth >= 841 && hiddenRangeElements.third) {
      counter++;
    }

    if (counter) {
      for (let hiddenItem in hiddenRangeElements) {
        if (counter === 0) {
          break;
        }

        if (hiddenRangeElements[hiddenItem]) {
          range.prepend(hiddenRangeElements[hiddenItem]);
          hiddenRangeElements[hiddenItem] = null;
          counter--;
        }
      }
    }
  }

  function changeActive(e) {
    if (!e) {
      return;
    }

    const type = e.type;
    let currentItem = null;

    if (type === 'click') {
      const target = e.target;

      if (!target.closest('.form-feed__dot')) {
        return;
      }

      currentItem = target.closest('.form-feed__item');
    }

    if (type === 'input') {
      if (!rangeValues) {
        rangeValues = getRangeValues();
      }

      const activeItemIndex = rangeValues.indexOf(amountField.value);

      if (activeItemIndex !== -1) {
        currentItem = range.children[activeItemIndex];
      } else {
        removeActiveItem();
        return;
      }
    }

    if (currentItem) {
      if (currentItem === activeItem) {
        return;
      }

      currentItem.classList.add('_transform');

      setTimeout(() => {
        currentItem.classList.remove('_transform');
        currentItem.dataset.active = '';

        if (activeItem) {
          activeItem.removeAttribute('data-active');
        }

        activeItem = currentItem;
        if (type === 'click') {
          setFiledValue();
        }
      }, 100);
    }
  }

  function setActiveItem() {
    for (let rangeItem in hiddenRangeElements) {
      if (hiddenRangeElements[rangeItem] && hiddenRangeElements[rangeItem].hasAttribute('data-active')) {
        hiddenRangeElements[rangeItem].removeAttribute('data-active');
        break;
      }
    }

    let activeItem = form.querySelector('[data-active]');

    if (activeItem) {
      return;
    }

    activeItem = range.lastElementChild;
    activeItem.dataset.active = '';
  }

  function setFiledValue() {
    const value = activeItem.textContent.trim();
    amountField.value = value;
  }

  function getRangeValues() {
    const rangeItems = [...range.children];
    return rangeItems.map((item) => item.textContent.trim());
  }

  function removeActiveItem() {
    activeItem.removeAttribute('data-active');
    activeItem = null;
  }

  const form = document.querySelector('.form-feed');
  const range = form.querySelector('.form-feed__range');
  const amountField = form.querySelector('.form-feed__price-field');

  hideShowRangeElements();
  setActiveItem();

  let activeItem = form.querySelector('[data-active]');
  let rangeValues = null;

  setFiledValue();

  range.onclick = changeActive;
  amountField.oninput = changeActive;
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

  const hiddenFormFeedRangeElements = {
    third: null,
    second: null,
    first: null,
  };
  initFormFeed(pageWidth, hiddenFormFeedRangeElements);

  window.addEventListener('resize', () => {
    pageWidth = Math.max(document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);

    if (pageWidth <= 640) {
      removeNavigationActiveHeader();
    }

    if (pageWidth > 640) {
      closeHeaderMenu();
    }

    initFormFeed(pageWidth, hiddenFormFeedRangeElements);
  });
}
