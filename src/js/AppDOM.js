export default class AppDOM {
  constructor() {
    this.els = {
      btnAdd: null,
      imgName: {
        type: 'input',
        el: null,
        errMessage: null,
        errText: 'Введите название',
      },
      imgURL: {
        type: 'input',
        el: null,
        errMessage: null,
        errText: 'Введите ссылку',
      },
      gallery: null,
    };
    this.inputs = [];
    this.onBtnAddListeners = [];
  }

  init() {
    this.els.btnAdd = document.querySelector('.btnAdd');
    this.els.btnAdd.addEventListener('click', this.onBtnAddClick.bind(this));

    this.els.imgName.el = document.getElementById('imgName');
    this.els.imgName.el.addEventListener('input', this.onImgInput.bind(this));

    this.els.imgName.errMessage = document.querySelector('.imgName .error-message');

    this.els.imgURL.el = document.getElementById('imgURL');
    this.els.imgURL.el.addEventListener('input', this.onImgInput.bind(this));

    this.els.imgURL.errMessage = document.querySelector('.imgURL .error-message');

    this.els.gallery = document.querySelector('.gallery');
    this.els.gallery.addEventListener('click', this.onGalleryClick);

    for (const el of Object.values(this.els)) {
      if (Object.prototype.hasOwnProperty.call(el, 'type')) {
        if (el.type === 'input') this.inputs.push(el);
      }
    }
  }

  onBtnAddClick(event) {
    this.onBtnAddListeners.forEach((callback) => callback(event));
  }

  onImgInput(event) {
    const inputID = event.currentTarget.id;
    this.els[inputID].errMessage.classList.add('hidden');
  }

  showImgErrMessage(input, message) {
    let errMessage;
    if (message === undefined) errMessage = input.errText;
    else errMessage = message;
    this.els[input.el.id].errMessage.textContent = errMessage;
    this.els[input.el.id].errMessage.classList.remove('hidden');
  }

  addPicture() {
    const imgEl = document.createElement('img');
    imgEl.addEventListener('error', this.onImgError.bind(this));
    imgEl.addEventListener('load', this.onImgLoad.bind(this));

    imgEl.src = this.els.imgURL.el.value;
  }

  onImgError() {
    this.showImgErrMessage(this.els.imgURL, 'Неверный URL изображения');
  }

  onImgLoad(event) {
    const imgEl = event.currentTarget;

    const pictureEl = document.createElement('div');
    pictureEl.classList.add('picture');

    const removeEl = document.createElement('span');
    removeEl.classList.add('remove');
    pictureEl.append(removeEl);

    const figureEl = document.createElement('figure');
    figureEl.append(imgEl);
    pictureEl.append(figureEl);

    const figcaptionEl = document.createElement('figcaption');
    figcaptionEl.textContent = this.els.imgName.el.value;
    figureEl.append(figcaptionEl);

    this.els.gallery.append(pictureEl);
  }

  // eslint-disable-next-line class-methods-use-this
  onGalleryClick(event) {
    const { target } = event;
    if (target.classList.contains('remove')) {
      target.closest('.picture').remove();
    }
  }
}
