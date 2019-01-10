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
 const getRandomNum = (max, min) => Math.round(Math.random() * (max - min) + min);

/* возвращает случайный елемент массива */
 const getRandomElem = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* удаляет класс hidden у переданого обьекта */
function removeClassHidden(obj) {
  obj.classList.remove('hidden');
}
/* прячет счётчик комментариев и загрузку новых комментариев */
function hidesClasses() {
  socialCommentCount.classList.add('visually-hidden'); 
  commentsLoader.classList.add('visually-hidden'); 
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

/**
 * создадим картинки и сохраним их в глобальной перменной 
 * чтобы иметь к ним доступ в любой момент
 */
const photos = createArrayObject(Num);
appendSmallPicture(photos);

/**
 *  функция  собирает один  коммент
 */
function createComment(){ 
const avatar = `img/avatar-${getRandomNum(1, 6)}.svg`;
const message = `${getRandomElem(commentsArray)} ${getRandomElem(commentsArray)}`;
const oneComent =  `<li class="social__comment"> 
<img class="social__picture"
 src= ${avatar} alt="Аватар комментатора фотографии"
 width="35" height="35"><p class="social__text">${message}</p></li>`;
 return oneComent;
}
/**
 * функцию  генерирует комментарии в рандомном количестве и аттачит их
 */
function attachComments(number){
let comments = [];
for (let i = 0; i < number; i++) {
let comment = createComment();
comments.push(comment);
  }
  socialComments.innerHTML = comments;
};

/*  */ 
function createBigPicture(obj) {
  bigPictureImg.src = obj[0].url;
  likesCount.textContent = obj[0].likes;
  commentsCount.textContent = obj[0].comments;
  attachComments(getRandomNum(1, 5));
  socialCaption.innerHTML = obj[0].description;
  removeClassHidden(bigPicture);
  hidesClasses();
}
createBigPicture(createArrayObject(1));
// правильно ли, что в функции createComment() я avatar и message перенесла в функцию?
// может было правильнее оставить их как переменные глобально?
//почему стрелочные функции присваиваются в переменную?
// в функции attachComments хотела через documentFragment, но не получмлось почему то(
