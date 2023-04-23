const widthInputNode = document.querySelector(".j-input-width");
const heightInputNode = document.querySelector(".j-input-height");
const formNode = document.querySelector(".j-form");
const resultNode = document.querySelector(".j-result");
const baseUrl = 'https://picsum.photos/'

const useRequest = url => {
   return fetch(url)
      .then((response) => {
         console.log('response', response);
         return response.url;
      })
      .then(imageUrl => imageUrl)
      .catch((error) => { console.log(error) });
};

const displayResult = async (width, height) => {
   const url = `${baseUrl}${width}/${height}`;
   const imageUrl = await useRequest(url);

   const imageBlock = `
         <div class="image-container" style="width: ${width}px;height: ${height}px;">
            <img
               src="${imageUrl}"
               class="image"
            />
         </div>
      `;
   resultNode.innerHTML = imageBlock;
};

formNode.addEventListener("submit", event => {
   event.preventDefault();
   const width = +widthInputNode.value;
   const height = +heightInputNode.value;

   if (width < 100 || width > 300) {
      resultNode.classList.add("input_red");
      resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300"
      return;
   }
   if (height < 100 || height > 300) {
      resultNode.classList.add("input_red");
      resultNode.innerHTML = "Одно из чисел вне диапазона от 100 до 300"
      return;
   }
   if (resultNode.classList.contains("input_red")) {
      resultNode.classList.remove("input_red");
   }

   displayResult(width, height);
});