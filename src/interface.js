const {format} = require ("date-fns");

export default class UI {
   initialize() {
    this.initButtons();
  }

  initButtons() {
    const menuBtn = document.querySelector("button#menu");
    const createBtn = document.querySelector("button#create");

    menuBtn.addEventListener("click", () =>{
      const displayArea = document.querySelector("div#display");
      if (displayArea.classList.contains("hidden")) {
        displayArea.classList.remove("hidden");
      } else {
        displayArea.classList.add("hidden");
      }
    });

    createBtn.addEventListener("click", () => {
      this.openDialog();
    });
  }

  openDialog() {
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    const form = document.querySelector("form")
    
    const nameDiv = UI.getNameDiv();
    const notesDiv = UI.getNotesDiv();
    const dateDiv = UI.getDateDiv();

    form.append(nameDiv, notesDiv, dateDiv);

  }

  static getNameDiv() {
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("form-input");
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = "NAME";
    const nameField = document.createElement("input");
    nameField.setAttribute("name", "name");
    nameField.setAttribute("type", "text");
    nameDiv.append(nameLabel, nameField);

    return nameDiv;
  }

  static getNotesDiv() {
    const notesDiv = document.createElement("div");
    notesDiv.classList.add("form-input");
    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes");
    notesLabel.innerText = "NOTES";
    const notesField = document.createElement("input");
    notesField.setAttribute("type", "text");
    notesField.setAttribute("name", "notes");
    notesDiv.append(notesLabel, notesField);

    return notesDiv;
  }

  static getDateDiv() {
    const today = new Date();
    const dateStr = format(today, "yyyy-MM-dd");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("form-input");
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerText = "DUE DATE";
    const dateField = document.createElement("input");
    dateField.setAttribute("type", "date");
    dateField.setAttribute("name", "date");
    dateField.setAttribute("min", dateStr);
    dateDiv.append(dateLabel, dateField);

    return dateDiv;
  }

  static getProjectDiv() {
    //TODO
  }
}