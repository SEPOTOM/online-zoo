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
