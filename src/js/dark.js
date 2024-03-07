const btnDark = document.querySelector('#switch');

btnDark.addEventListener('click', () => {
    btnDark.classList.toggle('header__switch--active');
    document.body.classList.toggle('dark');

})