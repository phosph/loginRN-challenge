import {makeAutoObservable} from 'mobx';

export default class Misc {
  constructor() {
    makeAutoObservable(this);
  }

  isLoading = false;

  setIsLoading(l: boolean) {
    this.isLoading = l;
  }
}
