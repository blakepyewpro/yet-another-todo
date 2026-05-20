const {format} = require("date-fns");
import { MasterList, Project, Task } from "./items";
import TaskDiv from "./taskdiv";
import ProjectDiv from "./projectdiv";
import Menu from "./menu";

import editOutline from "./assets/file-edit-outline.svg";
import deleteOutline from "./assets/delete-outline.svg";

export default class UI {
  constructor() {
    this.taskBtn = document.querySelector("button#task-btn");
    this.projBtn = document.querySelector("button#proj-btn");
    this.dialog = document.querySelector("dialog");
    this.dialogHeader = document.querySelector("span#dialog-title")
    this.form = document.querySelector("form");
    this.listArea = document.querySelector("div#list-area");
    this.menuBtn = document.querySelector("button#menu");
    this.createBtn = document.querySelector("button#create");

    this.masterList = new MasterList();
    this.menu = new Menu(this.masterList, this);
    this.projectDivs = [];
    this.redrawList();

    this.dialog.addEventListener('cancel', (event) => {
      event.preventDefault(); // Prevents the dialog from closing
    });

    this.menuBtn.addEventListener("click", () => {
      const displayArea = document.querySelector("div#display");
      if (displayArea.classList.contains("hidden")) {
        displayArea.classList.remove("hidden");
      } else {
        displayArea.classList.add("hidden");
      }
    });

    this.createBtn.addEventListener("click", () => {
      this.dialog.showModal();
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
    this.form.replaceChildren();

    if (this.dialogHeader.innerText == "Edit...") {
      this.dialogHeader.innerText = "Create...";
    }

    if (type === "task") {
      const notesDiv = UI.getNotesDiv();
      const prioDiv = UI.getPrioDiv();
      const dateDiv = UI.getDateDiv();
      const projDiv = UI.getProjectDiv(this.masterList.projects);

      this.form.append(nameDiv, notesDiv, prioDiv, dateDiv, projDiv, btnDiv);
    } else if (type === "proj") {
      this.form.append(nameDiv, btnDiv);
    }
  }

  editDialog(item) {
    const nameDiv = UI.getNameDiv(item.name);
    const btnDiv = this.getButtonsDiv(item);

    if (this.dialogHeader.innerText == "Create...") {
      this.dialogHeader.innerText = "Edit...";
    }

    this.taskBtn.classList.add("disabled");
    this.projBtn.classList.add("disabled");

    if (item.itemType === "task") {
      this.taskBtn.classList.add("selected");
      this.projBtn.classList.remove("selected");
      const notesDiv = UI.getNotesDiv(item.notes);
      const prioDiv = UI.getPrioDiv(item.prio);
      const dateDiv = UI.getDateDiv(item.dueDate);
      const projDiv = UI.getProjectDiv(this.masterList.projects, item.projectID);
      this.form.append(nameDiv, notesDiv, prioDiv, dateDiv, projDiv, btnDiv);
    } else if (item.itemType === "project") {
      this.taskBtn.classList.remove("selected");
      this.projBtn.classList.add("selected");
      this.form.append(nameDiv, btnDiv);
    }
  }

  handleToggle(type) {
    if (this.taskBtn.classList.contains("selected")) {
      if (type === "task" || this.taskBtn.classList.contains("disabled")) return;
      else {
        this.taskBtn.classList.remove("selected");
        this.projBtn.classList.add("selected");
        this.configDialog("proj");
      }
    } else if (this.projBtn.classList.contains("selected")) {
      if (type === "proj" || this.projBtn.classList.contains("disabled")) return;
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
    this.taskBtn.classList.remove("disabled");
    this.projBtn.classList.remove("disabled");
  }

  static getNameDiv(value) {
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("form-input");
    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = "NAME";
    const nameField = document.createElement("input");
    nameField.setAttribute("name", "name");
    nameField.setAttribute("type", "text");
    if (value) nameField.value = value;
    nameDiv.append(nameLabel, nameField);

    return nameDiv;
  }

  static getNotesDiv(value) {
    const notesDiv = document.createElement("div");
    notesDiv.classList.add("form-input");
    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes");
    notesLabel.innerText = "NOTES";
    const notesField = document.createElement("textarea");
    notesField.setAttribute("name", "notes");
    if (value) notesField.value = value;
    notesDiv.append(notesLabel, notesField);

    return notesDiv;
  }

  static getDateDiv(date) {
    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("form-input");
    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date");
    dateLabel.innerText = "DUE DATE";
    const dateField = document.createElement("input");
    dateField.setAttribute("type", "date");
    dateField.setAttribute("name", "date");
    if (date) {
      dateField.value = date;
    } else {
      dateField.value = todayStr;
    }
    dateDiv.append(dateLabel, dateField);

    return dateDiv;
  }

  static getProjectDiv(projects, projectID) {
    const projDiv = document.createElement("div");
    projDiv.classList.add("form-input");
    const projLabel = document.createElement("label");
    projLabel.setAttribute("for", "proj");
    projLabel.innerText = "PROJECT";
    const projSelect = document.createElement("select");
    projSelect.setAttribute("name", "proj");

    for (const project of projects) {
      const option = document.createElement("option");
      option.setAttribute("value", project.id);
      option.innerText = project.name;
      if (project.id === projectID) {
        option.setAttribute("selected", "");
      } else if (!projectID && project.isDefault) {
        option.setAttribute("selected", "");
      }
      projSelect.append(option);
    }

    projDiv.append(projLabel, projSelect);
    return projDiv;
  }

  static getPrioDiv(prio) {
    const prioDiv = document.createElement("div");
    prioDiv.classList.add("form-input");
    const prioLabel = document.createElement("label");
    prioLabel.innerText = "PRIORITY";
    const innerDiv = document.createElement("div");
    innerDiv.classList.add("prio-buttons");
    const lowBtn = document.createElement("button");
    lowBtn.setAttribute("type", "button");
    lowBtn.classList.add("low-prio")
    lowBtn.innerText = "Low";
    const medBtn = document.createElement("button");
    medBtn.setAttribute("type", "button");
    medBtn.classList.add("med-prio");
    medBtn.innerText = "Medium";
    const highBtn = document.createElement("button");
    highBtn.setAttribute("type", "button");
    highBtn.classList.add("high-prio");
    highBtn.innerText = "High";
    innerDiv.append(lowBtn, medBtn, highBtn);
    prioDiv.append(prioLabel, innerDiv);

    if (prio === "low" || !prio) lowBtn.classList.add("selected");
    else if (prio === "med") medBtn.classList.add("selected");
    else if (prio === "high") highBtn.classList.add("selected");

    lowBtn.addEventListener("click", () => {this.handlePrioToggle("low")});
    medBtn.addEventListener("click", () => {this.handlePrioToggle("med")});
    highBtn.addEventListener("click", () => {this.handlePrioToggle("high")});
    
    return prioDiv;
  }

  static handlePrioToggle(prioClicked) {
    const lowBtn = document.querySelector("button.low-prio");
    const medBtn = document.querySelector("button.med-prio");
    const highBtn = document.querySelector("button.high-prio");

    const isLow = lowBtn.classList.contains("selected");
    const isMed = medBtn.classList.contains("selected");
    const isHigh = highBtn.classList.contains("selected");

    if (prioClicked === "low") {
      if (isLow) return;
      else {
        medBtn.classList.remove("selected");
        highBtn.classList.remove("selected");
        lowBtn.classList.add("selected");
      }
    } else if (prioClicked === "med") {
      if (isMed) return;
      else {
        lowBtn.classList.remove("selected");
        highBtn.classList.remove("selected");
        medBtn.classList.add("selected");
      }
    } else if (prioClicked === "high") {
      if (isHigh) return;
      else {
        lowBtn.classList.remove("selected");
        medBtn.classList.remove("selected");
        highBtn.classList.add("selected");
      }
    }
  }

  getButtonsDiv(item) {
    const btnDiv = document.createElement("div");
    btnDiv.id = "form-btns";
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.innerText = "Save";
    saveBtn.setAttribute("type", "button");
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-btn";
    cancelBtn.innerText = "Cancel";
    cancelBtn.setAttribute("type", "button");
    btnDiv.append(saveBtn, cancelBtn);

    saveBtn.addEventListener("click", () => {

      if (this.taskBtn.classList.contains("selected")) {
        const name = document.querySelector('input[name="name"]');
        const notes = document.querySelector('textarea[name="notes"]');
        const date = document.querySelector('input[name="date"]');
        const project = document.querySelector('select[name="proj"]');

        const nameVal = name.value;
        const notesVal = notes.value;
        const dateVal = date.value;
        const projVal = project.value;

        const lowBtn = document.querySelector("button.low-prio");
        const medBtn = document.querySelector("button.med-prio");
        const highBtn = document.querySelector("button.high-prio");

        const isLow = lowBtn.classList.contains("selected");
        const isMed = medBtn.classList.contains("selected");
        const isHigh = highBtn.classList.contains("selected");

        let prioVal = "";
        if (isLow) prioVal = "low";
        else if (isMed) prioVal = "med";
        else if (isHigh) prioVal = "high";

        let isComplete;
        if (item) isComplete = item.isComplete;
        else isComplete = false;

        
        if (item) {
          const newTask = new Task(
            nameVal,
            notesVal,
            prioVal,
            dateVal,
            projVal,
            item.isComplete,
            item.id
          );
          this.masterList.saveOrUpdate(newTask, item);
        } else {
          const newTask = new Task(
            nameVal,
            notesVal,
            prioVal,
            dateVal,
            projVal,
          );
          this.masterList.saveOrUpdate(newTask); 
        }     
        this.redrawList();

      } else if (this.projBtn.classList.contains("selected")) {
        const name = document.querySelector('input[name="name"]');
        const nameVal = name.value;

        if (item) {
          const newProject = new Project(nameVal, item.isDefault, item.id);
          this.masterList.saveOrUpdate(newProject, item);
        } else {
          const newProject = new Project(nameVal);
          this.masterList.saveOrUpdate(newProject);
        }
        this.menu.makeProjectList();
        this.redrawList();
      }

      this.resetToggle();
      this.dialog.close();
      this.form.replaceChildren();
    });

    cancelBtn.addEventListener("click", () => {
      this.resetToggle();
      this.dialog.close();
      this.form.replaceChildren();
    });

    return btnDiv;
  }

  updateTaskCounters() {
    for (const projectDiv of this.projectDivs) {
      projectDiv.updateTaskCounter();
    }
  }

  redrawList() {
    this.listArea.replaceChildren();
    this.projectDivs = [];
    this.menu.recalculateFilters();
    if (!this.masterList.isEmpty()) {
      this.listArea.classList.remove("empty");
      for (const project of this.masterList.display) {
        if (project.isDefault) {
          for (const task of project.tasks) {
            const newDiv = new TaskDiv(task, this);
            this.listArea.append(newDiv.taskDiv);
          }
        } else {
          if (project.tasks.length >= 1) {
            const newDiv = new ProjectDiv(project, this);
            this.projectDivs.push(newDiv);
            this.listArea.append(newDiv.projectDiv);
            for (const task of project.tasks) {
              const NewTaskDiv = new TaskDiv(task, this);
              newDiv.taskList.append(NewTaskDiv.taskDiv);
            }
          }
        }
      }
    } else {
      this.listArea.classList.add("empty");
      const placeholder = document.createElement("div");
      placeholder.id = "placeholder";
      this.listArea.append(placeholder);

      const title = document.createElement("span");
      title.id = "ph-title";
      title.textContent = "Nothing to do!"
      placeholder.append(title);

      const body = document.createElement("span");
      body.id = "ph-body";
      body.textContent = 'Click "Create" to get started';
      placeholder.append(body);
    }
  }
}