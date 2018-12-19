import { default as BaseStats } from 'stats.js';

export default class Stats {
  constructor() {
    if (process.env.NODE_ENV === 'production') {
      return;
    }
    this._stats = new BaseStats();
    document.body.appendChild(this._stats.dom);
  }

  begin = () => {
    this._stats && this._stats.begin();
  }

  end = () => {
    this._stats && this._stats.end();
  }
}
