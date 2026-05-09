const {compareDesc} = require("date-fns");

import editOutline from "./assets/file-edit-outline.svg";
import deleteOutline from "./assets/delete-outline.svg";

export default class TaskDiv {
  constructor(task, masterList, UI) {
    this.id = task.id;
    this.masterList = masterList;
    this.interface = UI;

    this.taskDiv = document.createElement("div");
    this.taskDiv.classList.add("task");
    this.taskDiv.setAttribute("data-id", task.id);
    if (task.isComplete) {
      this.taskDiv.classList.add("complete");
    }

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("task-content");
    this.taskDiv.append(contentDiv);

    const taskHeader = document.createElement("div");
    taskHeader.classList.add("task-header");
    contentDiv.append(taskHeader);


    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");
    taskHeader.append(taskLeft);
    
    this.checkbox = document.createElement("input");
    this.checkbox.setAttribute("type", "checkbox");
    if (task.isComplete) this.checkbox.checked = true;
    taskLeft.append(this.checkbox);
    this.#addCheckboxListener();

    this.title = document.createElement("span");
    this.title.classList.add("task-title");
    this.title.innerText = task.name;
    taskLeft.append(this.title);


    const taskCenter = document.createElement("div");
    taskCenter.classList.add("task-center");
    taskHeader.append(taskCenter);

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
    taskCenter.append(this.prio);


    const taskRight = document.createElement("div");
    taskRight.classList.add("task-right");
    taskHeader.append(taskRight);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("due-date");
    taskRight.append(dateDiv);

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("date-label");
    dateLabel.innerText = "DUE BY";
    dateDiv.append(dateLabel);

    this.date = document.createElement("span");
    this.date.classList.add("date");
    const today = new Date();
    if (compareDesc(task.dueDate, today) >= 0) {
      this.date.classList.add("due");
    }
    this.date.innerText = task.dueDate;
    dateDiv.append(this.date);


    const notesDiv = document.createElement("div");
    notesDiv.classList.add("task-notes");
    contentDiv.append(notesDiv);

    const notesLabel = document.createElement("span");
    notesLabel.classList.add("notes-label");
    notesLabel.innerText = "NOTES";
    notesDiv.append(notesLabel);

    this.notes = document.createElement("span");
    this.notes.classList.add("notes");
    this.notes.innerText = task.notes;
    notesDiv.append(this.notes);


    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("task-buttons");
    this.taskDiv.append(buttonDiv);

    this.editButton = document.createElement("button");
    this.editButton.classList.add("task-edit");
    buttonDiv.append(this.editButton);
    this.#addEditButtonListener();

    const editImg = document.createElement("img");
    editImg.src = editOutline;
    editImg.alt = "edit task";
    this.editButton.append(editImg);

    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("task-delete");
    buttonDiv.append(this.deleteButton);
    this.#addDeleteButtonListener();

    const deleteImg = document.createElement("img");
    deleteImg.src = deleteOutline;
    deleteImg.alt = "delete task";
    this.deleteButton.append(deleteImg);
  }

  #addCheckboxListener() {
    this.checkbox.addEventListener("click", () => {
      const task = this.masterList.findTaskByID(this.id);
      if (this.checkbox.checked) {
        task.isComplete = true;
        this.taskDiv.classList.add("complete");
      } else if (!this.checkbox.checked) {
        task.isComplete = false;
        this.taskDiv.classList.remove("complete");
      }
    });
  }

  #addDeleteButtonListener() {
    this.deleteButton.addEventListener("click", () => {
      const task = this.masterList.findTaskByID(this.id);
      this.masterList.delete(task);
      this.interface.redrawList();  
    })
  }

  #addEditButtonListener() {
    this.editButton.addEventListener("click", () => {
      const task = this.masterList.findTaskByID(this.id);
      this.interface.dialog.showModal();
      this.interface.editDialog(task);
    })
  }
}