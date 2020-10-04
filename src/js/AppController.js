export default class AppController {
  constructor(appDOM) {
    this.appDOM = appDOM;
  }

  init() {
    this.appDOM.init();
    this.appDOM.onBtnAddListeners.push(this.onBtnAddClick.bind(this));
  }

  onBtnAddClick(event) {
    event.preventDefault();

    if (!this.checkInputs(this.appDOM.inputs).success) return;

    this.appDOM.addPicture();
  }

  checkInputs(inputs) {
    const result = { success: true };

    inputs.forEach((input) => {
      if (input.el.value === '') {
        this.appDOM.showImgErrMessage(input);
        result.success = false;
      }
    });

    return result;
  }
}
