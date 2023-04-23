/*
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.
*/

const inputNode = document.querySelector(".j-input");
const btnNode = document.querySelector(".j-btn-request");
const resultNode = document.querySelector(".j-result");
const baseUrl = 'https://picsum.photos/v2/list?limit='

const useRequest = (url, callback) => {
   const xhr = new XMLHttpRequest();
   xhr.open('GET', url, true);

   xhr.onload = () => {
      if (xhr.status != 200) {
         console.log("Answer status: ", xhr.status);
      } else {
         const result = JSON.parse(xhr.response);
         if (callback) {
            callback(result);
         }
      }
   }

   xhr.onerror = () => {
      console.log('Error! Answer status: ', xhr.status);
   };

   xhr.send();
}

const displayResult = (apiData) => {
   let cards = '';

   apiData.forEach(item => {
      const cardBlock = `
         <div class="card">
            <img
               src="${item.download_url}"
               class="card-image"
            />
            <p>${item.author}</p>
         </div>
      `;
      cards += cardBlock;
   });

   resultNode.innerHTML = cards;
}

btnNode.addEventListener("click", () => {
   const value = +inputNode.value;
   console.log(value)
   if (value === 0) {
      resultNode.classList.add("input_red");
      resultNode.innerHTML = "Пожалуйста, введите количество изображений";
      return;
   }
   if (value < 1 || value > 10) {
      resultNode.classList.add("input_red");
      resultNode.innerHTML = "Число вне диапазона от 1 до 10";
      return;
   }
   resultNode.classList.remove("input_red");
   useRequest(baseUrl + value, displayResult);
});