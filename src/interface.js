export default class UI {
  static initialize() {
    UI.initButtons();
  }

  static initButtons() {
    const menuBtn = document.querySelector("button#menu");
    const createBtn = document.querySelector("button#create");

    menuBtn.addEventListener("click", () =>{
      const displayArea = document.querySelector("div#display");
      if (displayArea.classList.contains("hidden")) {
        displayArea.classList.remove("hidden");
      } else {
        displayArea.classList.add("hidden");
      }
    })
  }
}