import { Project } from "./items";

const {format} = require ("date-fns");

export default class UI {
  constructor() {
    this.taskBtn = document.querySelector("button#task-btn");
    this.projBtn = document.querySelector("button#proj-btn");
  }

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
    const dialog = document.querySelector("dialog");
    dialog.showModal();
    this.configDialog("task");
    });

    this.taskBtn.addEventListener("click", () => {
      this.handleToggle("task");
    });
    this.projBtn.addEventListener("click", () => {
      this.handleToggle("proj");
    });
  }

  configDialog(type) {
    const nameDiv = UI.getNameDiv();
    const btnDiv = this.getButtonsDiv();
    const form = document.querySelector("form");
    form.replaceChildren();

    if (type === "task") {
    const notesDiv = UI.getNotesDiv();
    const dateDiv = UI.getDateDiv();
    const projDiv = UI.getProjectDiv(["Planner", "Work"]);

    form.append(nameDiv, notesDiv, dateDiv, projDiv, btnDiv);
    } else if (type === "proj") {
      form.append(nameDiv, btnDiv);
    }
  }

  handleToggle(type) {
   if (this.taskBtn.classList.contains("selected")) {
    if (type === "task") return;
    else {
      this.taskBtn.classList.remove("selected");
      this.projBtn.classList.add("selected");
      this.configDialog("proj");
    }
   } else if (this.projBtn.classList.contains("selected")) {
    if (type === "proj") return;
    else {
      this.projBtn.classList.remove("selected");
      this.taskBtn.classList.add("selected");
      this.configDialog("task");
    }
   }
  }

  resetToggle() {
    this.taskBtn.classList.add("selected");
    this.projBtn.classList.remove("selected");
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
    const notesField = document.createElement("textarea");
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

  static getProjectDiv(projectNames) {
    const projDiv = document.createElement("div");
    projDiv.classList.add("form-input");
    const projLabel = document.createElement("label");
    projLabel.setAttribute("for", "proj");
    projLabel.innerText = "PROJECT";
    const projSelect = document.createElement("select");
    projSelect.setAttribute("name", "proj");

    for (const project of projectNames) {
      const option = document.createElement("option");
      option.setAttribute("value", project);
      option.innerText = project;
      if (project === "Planner") {
        option.setAttribute("selected", "");
      };
      projSelect.append(option);
    };

    projDiv.append(projLabel, projSelect);
    return projDiv;
  }

  getButtonsDiv() {
    const btnDiv = document.createElement("div");
    btnDiv.id = "form-btns"
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.innerText = "Save";
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-btn";
    cancelBtn.innerText = "Cancel";
    btnDiv.append(saveBtn, cancelBtn);

    saveBtn.addEventListener("click", () => {
      const dialog = document.querySelector("dialog");
      const form = document.querySelector("form");

      if (this.taskBtn.classList.contains("selected")) {
        const name = document.querySelector('input[name="name"]');
        const notes = document.querySelector('textarea[name="notes"]');
        const date = document.querySelector('input[name="date"]');
        const project = document.querySelector('select[name="proj"]');

        const nameVal = name.value;
        const notesVal = notes.value;
        const dateVal = date.value;
        const projVal = project.value;

        console.log (
          "name: " + nameVal + "\nnotes: " + notesVal + "\ndate: " + dateVal 
          + "\nproj: " + projVal + "\ntype: Task");
        this.resetToggle();

      } else if (this.projBtn.classList.contains("selected")) {
        const name = document.querySelector('input[name="name"]');
        const nameVal = name.value;

        console.log ("name: " + nameVal + "\ntype: Project");
        this.resetToggle();
      }
      
      dialog.close();
      form.replaceChildren();
    });
    
    cancelBtn.addEventListener("click", () => {
      const dialog = document.querySelector("dialog");
      const form = document.querySelector("form");

      this.resetToggle();
      dialog.close();
      form.replaceChildren();
    });

    return btnDiv;
  }
}