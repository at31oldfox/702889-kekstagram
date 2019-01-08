const commentsArray = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const descriptions = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море)))',
  'Как же круто тут кормят!',
  'Отдыхаем...что ли',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'];

const Num = 25;
/* блок , в который вставляем маленькое фото */
const blockPictures = document.querySelector('.pictures');
/* шаблон маленького фото */
const templateSmallPictures = document.querySelector('#picture').content.querySelector('.picture');
/* для единной вставки элементов в разметку */
const fragment = document.createDocumentFragment();
/* общий блок с большим фото и коментами */
const bigPicture = document.querySelector('.big-picture');
/* большое фото */
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
/* количество лайков большого фото */
const likesCount = bigPicture.querySelector('.likes-count');
/* количество лайков большого фото */
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
/* счетчик коментариев большого фото */
const commentsCount = socialCommentCount.querySelector('.comments-count');
/* список коментариев большого фото */
const socialComments = bigPicture.querySelector('.social__comments');
/* описание большого фото */
const socialCaption = bigPicture.querySelector('.social__caption');
/* счетчик загрузки новых коментариев большого фото */
const commentsLoader = bigPicture.querySelector('.comments-loader');

/* возвращает число в диапазоне мин - макс */
function getRandomNum(max, min) {
  return Math.round(Math.random() * (max - min) + min);
}
/* возвращает случайный елемент массива */
function getRandomElem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
/* удаляет класс hidden у переданого обьекта */
function removeClassHidden(obj) {
  obj.classList.remove('hidden');
}

function hidesClasses() {
  socialCommentCount.classList.add('visually-hidden'); // прячет счётчик комментариев
  commentsLoader.classList.add('visually-hidden'); // прячет загрузку новых комментариев
}
/* создает массив обьектов */
function createArrayObject(number) {
  const pictures = [];
  for (let i = 0; i < number; i++) {
    pictures[i] = {
      url: `photos/${i + 1}.jpg`,
      likes: getRandomNum(15, 200),
      comments: getRandomNum(0, descriptions.length),
      description: getRandomElem(descriptions),
    };
  }
  console.log(pictures);
  return pictures;
}
/* создает шаблон миниатюры фото */
function createSmallPicture(element) {
  const smallPicture = templateSmallPictures.cloneNode(true);
  smallPicture.querySelector('.picture__img').src = element.url;
  smallPicture.querySelector('.picture__comments').textContent = element.comments;
  smallPicture.querySelector('.picture__likes').textContent = element.likes;
  return smallPicture;
}
/* вставляет все  миниатюры фото в разметку */
function appendSmallPicture(array) {
  array.forEach((element) => {
    const picture = createSmallPicture(element);
    fragment.appendChild(picture);
  });
  blockPictures.appendChild(fragment);
}

appendSmallPicture(createArrayObject(Num));
/* вот тут не знаю правильно ли я их не запихнула в общий обьект */
const avatar = `img/avatar-${getRandomNum(1, 6)}.svg`;
/* в консоль иногда выпадает ошибка, что аватар не найден Почему?? 
не находит 5 и 2 картинку */
const message = `${getRandomElem(commentsArray)} ${getRandomElem(commentsArray)}`;

/* показывает и заполняет данными полноразмерное фото */
function createBigPicture(obj) {
  bigPictureImg.src = obj[0].url;
  likesCount.textContent = obj[0].likes;
  commentsCount.textContent = obj[0].comments;
  socialComments.innerHTML = `<li class="social__comment"> 
  <img class="social__picture"
   src= ${avatar} alt="Аватар комментатора фотографии"
   width="35" height="35"><p class="social__text">${message}</p></li>`;
  socialCaption.innerHTML = obj[0].description;
  removeClassHidden(bigPicture);
  hidesClasses();
}
createBigPicture(createArrayObject(1));
// Вопросы:
/* в задании еще было имя автора, ума не приложу куда в разметку его пихать??
почему линтер ругается, когда поиск по селектору производится по всему документу??
а как иначе его искать??
правильно ли я поняла ТЗ ? а то там запутано как то)
что из es6 еще было правильнее использовать? не давать готовое решение, подсказать способ или тему)))
*/
