import editOutline from "./assets/file-edit-outline.svg";
import deleteOutline from "./assets/delete-outline.svg";

export default class ProjectDiv {
  constructor(project, masterList, UI) {
    this.id = project.id;
    this.masterList = masterList;
    this.interface = UI;

    this.projectDiv = document.createElement("div");
    this.projectDiv.classList.add("project");

    const projectHeader = document.createElement("div");
    projectHeader.classList.add("project-header");
    this.projectDiv.append(projectHeader);


    const HeaderLeft = document.createElement("div");
    HeaderLeft.classList.add("header-left");
    projectHeader.append(HeaderLeft);

    this.ProjectName = document.createElement("span");
    this.ProjectName.classList.add("project-name");
    this.ProjectName.innerText = project.name;
    HeaderLeft.append(this.ProjectName);

    this.editButton = document.createElement("button");
    this.editButton.classList.add("project-edit");
    HeaderLeft.append(this.editButton);
    this.#addEditButtonListener();

    const editImg = document.createElement("img");
    editImg.src = editOutline;
    editImg.alt = "Edit Project";
    this.editButton.append(editImg);

    this.deleteButton = document.createElement("button");
    this.deleteButton.classList.add("project-delete");
    HeaderLeft.append(this.deleteButton);
    this.#addDeleteButtonListener();

    const deleteImg = document.createElement("img");
    deleteImg.src = deleteOutline;
    deleteImg.alt = "Delete Project";
    this.deleteButton.append(deleteImg);


    const headerRight = document.createElement("div");
    headerRight.classList.add("header-right");
    projectHeader.append(headerRight);

    const taskCounterArea = document.createElement("div");
    taskCounterArea.classList.add("task-counter-area");
    headerRight.append(taskCounterArea);

    this.taskCounter = document.createElement("span");
    this.taskCounter.classList.add("task-counter");
    taskCounterArea.append(this.taskCounter);

    const taskCounterLabel = document.createElement("span");
    taskCounterLabel.innerText = " TASKS"
    taskCounterArea.append(taskCounterLabel);

    const completeCounterArea = document.createElement("div");
    completeCounterArea.classList.add("complete-counter-area");
    headerRight.append(completeCounterArea);

    this.completeCounter = document.createElement("span");
    this.completeCounter.classList.add("complete-counter");
    completeCounterArea.append(this.completeCounter);

    const completeCounterLabel = document.createElement("span");
    completeCounterLabel.innerText = " COMPLETE"
    completeCounterArea.append(completeCounterLabel);

    this.updateTaskCounter();


    this.taskList = document.createElement("div");
    this.taskList.classList.add("task-list");
    this.projectDiv.append(this.taskList);
    
  }

  updateTaskCounter() {
    const project = this.masterList.findProjectByID(this.id);
    const taskCount = project.tasks.length;

    let completeCount = 0;
    for (const task of project.tasks) {
      if (task.isComplete) completeCount += 1;
    }

    this.taskCounter.innerText = String(taskCount);
    this.completeCounter.innerText = String(completeCount);

    if (completeCount >= taskCount) {
      this.projectDiv.classList.add("complete");
    } else if (completeCount < taskCount) {
      this.projectDiv.classList.remove("complete");
    }
  }

  #addEditButtonListener() {
    //TODO
  }

  #addDeleteButtonListener() {
    //TODO
  }
}