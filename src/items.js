import Storage from "./storage.js"
export class MasterList {
  constructor() {
    this.projects = [];
    this.display = [];

    const saveStr = Storage.load();
    if (saveStr.projects) {
      const save = JSON.parse(saveStr);
      console.log(save);
      for (const project of save.projects) {
        this.saveOrUpdate(project);
      }
    } else {
      //TODO: create initial default project and use flag to create empty state
    }
  }

  saveOrUpdate(item, originalItem) {
    if (originalItem) {
      if (originalItem.itemType == "project") {
        const findProj = (element) => element.name == originalItem.name;
        const projIndex = this.projects.findIndex(findProj);
        this.projects[projIndex].name = item.name;
        Storage.store(this);
      } else if (originalItem.itemType == "task") {
        //TODO: find if project assigned changed, if so create new task under new project and delete old; else update existing task
      }
    } else {
      if (item.itemType == "project") {
        const newProj = new Project(item.name, item.isDefault);
        if (item.items) newProj.processSaveItems(item.items);
        this.projects.push(newProj);
        Storage.store(this);
      } else if (item.itemType) {
        const newTask = new Task(item.name, item.notes, item.prio, 
          item.dueDate, item.project, item.isComplete
        );
        const findProj = (element) => element.name == newTask.project;
        const projIndex = this.projects.findIndex(findProj);
        this.projects[projIndex].tasks.push(newTask);
      }
    }
  }
}

export class Project {
  constructor(name, isDefault = false) {
    this.itemType = "project";
    this.isDefault = isDefault;
    this.name = name;
    this.tasks = [];
  }

  processSaveItems(saveItems) {
    for (const task in saveItems) {
      const newTask = new Task(
        task.name, task.notes, task.prio, 
        task.dueDate, task.project, task.isComplete
      );
      this.tasks.push(newTask);
    }
  }
}

export class Task {
  constructor(name, notes, prio, dueDate, project, isComplete = false) {
    this.itemType = "task";
    this.name = name;
    this.notes = notes;
    this.prio = prio;
    this.dueDate = new Date(dueDate);
    this.project = project;
    this.isComplete = isComplete;
  }
}