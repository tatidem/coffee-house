// Создаем новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();

// Указываем тип запроса (GET) и адрес файла JSON
xhr.open('GET', './products.json', true);

// Устанавливаем заголовок Content-Type
xhr.setRequestHeader('Content-Type', 'application/json');

// Обработчик события, срабатывающий при изменении состояния запроса
xhr.onreadystatechange = function () {
  // Если запрос успешно завершен (readyState === 4) и статус ответа 200 (OK)
  if (xhr.readyState === 4 && xhr.status === 200) {
    // Распарсим полученные данные JSON
    var products = JSON.parse(xhr.responseText);

    // Теперь переменная products содержит объекты товаров из вашего JSON-файла

    // Ваш код для обработки данных из products
    console.log(products);
  }
};

// Отправляем запрос
xhr.send();


