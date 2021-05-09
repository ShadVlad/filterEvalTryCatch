// описание функций
// фильтр данных по типу
const filterByType = (type, ...values) =>
    //выборка элементов у которых тип равен заданному
    values.filter((value) => typeof value === type),
  //очистка результата
  hideAllResponseBlocks = () => {
    // массив блоков с результатом
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    // очистка формы: блоки с результатом скрываются
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  //ф-ция отображения блока с результатом
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    //вызов очистки
    hideAllResponseBlocks();
    //отображение выбранного блока
    document.querySelector(blockSelector).style.display = "block";
    if (spanSelector) {
      //вывод значка ок или "error"
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // функции отображения результата
  showError = (msgText) =>
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  showResults = (msgText) =>
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  //собственно функция фильтрации данных по типу
  tryFilterByType = (type, values) => {
    try {
      //массив выборки из данных: вызов функции фильтрации и добавление в массив
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      //если массив не пустой формируется сообщение с данными заданного типа иначе сообщение об отсутствии таких данных
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      //вызов функции отображения успешной попытки
      showResults(alertMsg);
    } catch (e) {
      // при вызове исключения сообщение об ошибке
      showError(`Ошибка: ${e}`);
    }
  };
// кнопка фильтровать
const filterButton = document.querySelector("#filter-btn");
//ожидание события нажатия кнопки
filterButton.addEventListener("click", (e) => {
  //поля ввода типа и данных
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data");

  //проверка на заполнение поля с данными
  if (dataInput.value === "") {
    //сообщение пользователю
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //отображение блока пока нечего показывать
    showNoResults();
  } else {
    //сообщение пользователю очитить
    dataInput.setCustomValidity("");
    //отмена действий по умолчанию
    e.preventDefault();
    //вызов функции фильтрации
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
