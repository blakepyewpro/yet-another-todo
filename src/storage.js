export default class Storage {

  static storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    };
  };

  static store(masterList) {
    if (this.storageAvailable("localStorage") === true) {
      localStorage.setItem("masterList", JSON.stringify(masterList));
      return true;
    } else return false;
  }

  static load() {
    if (this.storageAvailable("localStorage") === true) {
      return localStorage.getItem("masterList");
    } else return false;
  }

  static clear() {
    localStorage.removeItem("masterList");
  }
}