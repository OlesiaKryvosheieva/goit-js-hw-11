

export default class LoadMoreButton {
  constructor(selector, isHidden = true) {
    this.button = this.getButton(selector);

    if (isHidden) this.hide();
  }

  getButton(selector) {
    return document.querySelector(selector);
  }

  hide() {
    this.button.classList.add('hidden');
  }
  show() {
    this.button.classList.remove('hidden');
  }
}
