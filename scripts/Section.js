export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this._items = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.prepend(item);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderItems() {
        this.clear();
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
}