const btn = document.querySelector('.appointment-btn');

btn.addEventListener('click', handleClickBtn);

function handleClickBtn(event) {
    alert("Вы успешно записались на прием");
}