import Storage from "./storage.js"
export class MasterList {
  constructor() {
    this.projects = [];
    this.display = [];

    const saveStr = Storage.load();
    if (saveStr != null) {
      const save = JSON.parse(saveStr);
      console.log("loaded save:\n" + save);
      for (const project of save.projects) {
        this.saveOrUpdate(project);
      }
    } else {
      console.log("No save data in localStorage")
      //TODO: Handle intial / default state
    }
  }

  saveOrUpdate(item, originalItem) {
    if (originalItem) {
      const findOriginalByName = (element) => {
        return element.name == originalItem.name;
      }

      if (originalItem.itemType == "project") {
        const project = this.projects.find(findOriginalByName);
        project.name = item.name;
        for (const task of project.tasks) {
          task.project = project.name;
        }
        Storage.store(this);
      } else if (originalItem.itemType == "task") {
        const findOrigProjByName = (element) => {
          return element.name == originalItem.project;
        }
        const origProjIndex = this.projects.findIndex(findOrigProjByName);

        if (item.project != originalItem.project) {
          const origTaskIndex = this.projects[origProjIndex].tasks.findIndex(findOriginalByName);
          this.projects[origProjIndex].tasks.splice(origTaskIndex, 1);
          
          const newTask = new Task(item.name, item.notes, item.prio, 
            item.dueDate, item.project, item.isComplete);
          
          const findNewProjByName = (element) => {
            return element.name == item.project;
          }
          const newProjIndex = this.projects.findIndex(findNewProjByName);
          this.projects[newProjIndex].tasks.push(newTask);
          Storage.store(this);
        } else if (item.project == originalItem.project) {
          const origTask = this.projects[origProjIndex].tasks.find(findOriginalByName);
          origTask.name = item.name;
          origTask.notes = item.notes;
          origTask.prio = item.prio;
          origTask.dueDate = item.dueDate;
          origTask.isComplete = item.isComplete;
          Storage.store(this);
        }
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
        Storage.store(this);
      }
    }
  }

  delete(item) {
    //TODO: Delete Project or Task and save
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