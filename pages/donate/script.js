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
