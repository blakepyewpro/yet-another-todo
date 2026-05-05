const {format} = require ("date-fns");
import { MasterList } from "./items";

//TODO: Add empty state handling to list-area
//  <div id="list-area" class="empty">
//     <div id="placeholder">
//       <span id="ph-title">Nothing to do!</span>
//       <span id="ph-body">Click "Create" to get started</span>
//     </div>
//   </div>
export default class UI {
  constructor() {
    this.taskBtn = document.querySelector("button#task-btn");
    this.projBtn = document.querySelector("button#proj-btn");
    this.dialog = document.querySelector("dialog");
    this.form = document.querySelector("form");

    this.initButtons();
    this.dialog.addEventListener('cancel', (event) => {
      event.preventDefault(); // Prevents the dialog from closing
    });
  }

  initButtons() {
    const menuBtn = document.querySelector("button#menu");
    const createBtn = document.querySelector("button#create");

    menuBtn.addEventListener("click", () => {
      const displayArea = document.querySelector("div#display");
      if (displayArea.classList.contains("hidden")) {
        displayArea.classList.remove("hidden");
      } else {
        displayArea.classList.add("hidden");
      }
    });

    createBtn.addEventListener("click", () => {
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

    if (type === "task") {
      const notesDiv = UI.getNotesDiv();
      const prioDiv = UI.getPrioDiv();
      const dateDiv = UI.getDateDiv();
      const projDiv = UI.getProjectDiv(["None", "Work"]);

      this.form.append(nameDiv, notesDiv, prioDiv, dateDiv, projDiv, btnDiv);
    } else if (type === "proj") {
      this.form.append(nameDiv, btnDiv);
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

  static getDateDiv(value) {
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
    if (value) dateField.value = value;
    dateDiv.append(dateLabel, dateField);

    return dateDiv;
  }

  static getProjectDiv(projectNames, value) {
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
      if (project === value) {
        option.setAttribute("selected", "");
      } else if (!value && project === "None") {
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

  getButtonsDiv() {
    const btnDiv = document.createElement("div");
    btnDiv.id = "form-btns";
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.innerText = "Save";
    const cancelBtn = document.createElement("button");
    cancelBtn.id = "cancel-btn";
    cancelBtn.innerText = "Cancel";
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

        console.log(
          "name: " +
            nameVal +
            "\nnotes: " +
            notesVal +
            "\nprio: " +
            prioVal +
            "\ndate: " +
            dateVal +
            "\nproj: " +
            projVal +
            "\ntype: Task",
        );
        this.resetToggle();
      } else if (this.projBtn.classList.contains("selected")) {
        const name = document.querySelector('input[name="name"]');
        const nameVal = name.value;

        console.log("name: " + nameVal + "\ntype: Project");
        this.resetToggle();
      }

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
}
class TaskDiv {
  constructor(task) {
    this.id = task.id;


    this.taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("data-id", task.id);
    if (task.isComplete) {
      taskDiv.classList.add("complete");
    }

    this.contentDiv = document.createElement("div");
    this.contentDiv.classList.add("task-content");
    this.taskDiv.append(this.contentDiv);

    this.taskHeader = document.createElement("div");
    this.taskHeader.classList.add("task-header");
    this.contentDiv.append(this.taskHeader);


    this.taskLeft = document.createElement("div");
    this.taskLeft.classList.add("task-left");
    this.taskHeader.append(this.taskLeft);
    
    this.checkbox = document.createElement("input");
    this.checkbox.setAttribute("type", "checkbox");
    this.taskLeft.append(this.checkbox);

    this.title = document.createElement("span");
    this.title.classList.add("task-title");
    this.title.innerText = task.name;
    this.taskLeft.append(this.title);


    this.taskCenter = document.createElement("div");
    this.taskCenter.classList.add("task-center");
    this.taskHeader.append(this.taskCenter);

    this.prio = document.createElement("span");
    if (task.prio == "low") {
      this.prio.classList.add("task-prio", "low");
      this.prio.innerText = "Low";
    } else if (task.prio == "med") {
      this.prio.classList.add("task-prio", "med");
      this.prio.innerText = "Medium";
    } else if (task.prio == "high") {
      this.prio.classList.add("task-prio", "high");
      this.prio.innerText = "High";
    }
    this.taskCenter.append(this.prio);


    this.taskRight = document.createElement("div");
    this.taskRight.classList.add("task-right");
    this.taskHeader.append(this.taskRight);

    this.dateDiv = document.createElement("div");
    this.dateDiv.classList.add("due-date");
    //TODO: Continue adding html elements
  }
}
