const form = document.querySelector(".j-form");
const resultNode = document.querySelector(".j-result");

const useRequest = url => {
   return fetch(url)
      .then((response) => {
         return response.json();
      })
      .then(result => result)
      .catch((error) => { console.log(error) });
};

const displayResult = async (page, limit) => {
   const baseUrl = 'https://picsum.photos/v2/list';
   const url = `${baseUrl}?page=${page}&limit=${limit}`;
   const apiData = await useRequest(url);

   localStorage.setItem("pictures", JSON.stringify(apiData));
   setResultNodeContent(apiData);
}

const setResultNodeContent = (newPictures) => {
   let cards = '';

   newPictures.forEach(item => {
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

const checkInputValues = (page, limit) => {
   const pageWarningEl = document.querySelector('.j-page-warning');
   const limitWarningEl = document.querySelector('.j-limit-warning');

   pageWarningEl.textContent = '';
   limitWarningEl.textContent = '';

   if ((isNaN(page) || page < 1 || page > 10) && (isNaN(limit) || limit < 1 || limit > 10)) {
      limitWarningEl.textContent = "Номер страницы и лимит вне диапазона от 1 до 10";
      return false;
   }
   if (isNaN(page) || page < 1 || page > 10) {
      pageWarningEl.textContent = "Номер страницы вне диапазона от 1 до 10";
      return false;
   }
   if (isNaN(limit) || limit < 1 || limit > 10) {
      limitWarningEl.textContent = "Лимит вне диапазона от 1 до 10";
      return false;
   }

   return true;
};

const loadPicturesFromLocalStorage = () => {
   const picturesString = localStorage.getItem("pictures");

   if (picturesString === null) {
      return;
   }
   setResultNodeContent(JSON.parse(picturesString));
}

form.addEventListener("submit", event => {
   event.preventDefault();
   const formData = new FormData(form);
   const page = +formData.get('page');
   const limit = +formData.get('limit');

   if (!checkInputValues(page, limit)) {
      return;
   }

   displayResult(page, limit);
});

loadPicturesFromLocalStorage();
