import Storage from "./storage.js"
export class MasterList {
  constructor() {
    this.projects = [];
    this.display = [];

    const saveStr = Storage.load();
    if (saveStr != null && saveStr != false) {
      const save = JSON.parse(saveStr);
      console.log("loaded save");
      for (const project of save.projects) {
        this.saveOrUpdate(project);
      }
    } else {
      console.log("No save data in localStorage")
      //TODO: Handle intial / default state
      const defaultProject = new Project("None", true);
      this.saveOrUpdate(defaultProject);
    }
  }

  saveOrUpdate(item, originalItem) {
    if (originalItem) {
      const findOriginalByID = (element) => {
        return element.id == originalItem.id;
      }

      if (originalItem.itemType == "project") {
        const project = this.projects.find(findOriginalByID);
        project.name = item.name;
        Storage.store(this);
      } else if (originalItem.itemType == "task") {
        const findProjectByID = (element) => {
          return element.id == originalItem.projectID;
        }
        const origProjIndex = this.projects.findIndex(findProjectByID);

        if (item.projectID != originalItem.projectID) {
          const origTaskIndex = this.projects[origProjIndex].tasks.findIndex(findOriginalByID);
          this.projects[origProjIndex].tasks.splice(origTaskIndex, 1);
          
          const newTask = new Task(item.name, item.notes, item.prio, 
            item.dueDate, item.projectID, item.isComplete, item.id);
          
          const findNewProjectByID = (element) => {
            return element.id == item.projectID;
          }
          const newProjIndex = this.projects.findIndex(findNewProjectByID);
          this.projects[newProjIndex].tasks.push(newTask);
          Storage.store(this);
        } else if (item.project == originalItem.project) {
          const origTask = this.projects[origProjIndex].tasks.find(findOriginalByID);
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
        const newProj = new Project(item.name, item.isDefault, item.id);
        if (item.tasks.length >= 1) newProj.processSaveItems(item.tasks);
        this.projects.push(newProj);
        Storage.store(this);
      } else if (item.itemType == "task") {
        const newTask = new Task(item.name, item.notes, item.prio, 
          item.dueDate, item.projectID, item.isComplete, item.id
        );
        const findProject = (element) => element.id == newTask.projectID;
        const projIndex = this.projects.findIndex(findProject);
        this.projects[projIndex].tasks.push(newTask);
        Storage.store(this);
      }
    }
  }

  delete(item) {
    const findByID = (element) => element.id == item.id;
    if (item.itemType == "project") {
      if (item.name == "None" || item.isDefault == true) return false;
      const projectIndex = this.projects.findIndex(findByID);
      this.projects.splice(projectIndex, 1)
      Storage.store(this);
      return true;
    } else if (item.itemType == "task") {
      const findProject = (element) => element.id == item.projectID;
      const project = this.projects.find(findProject);
      const taskIndex = project.tasks.findIndex(findByID);
      project.tasks.splice(taskIndex, 1);
      Storage.store(this);
      return true;
    }
  }

  isEmpty() {
    let taskCounter = 0;
    for (const project of this.projects) {
      taskCounter += project.tasks.length;
    }
    if (taskCounter > 0) return false;
    else return true;
  }

  findProjectByID(id) {
    for (const project of this.projects) {
      if (project.id == id) return project;
    }
    return false;
  }

  findTaskByID(id) {
    for (const project of this.projects) {
      for (const task of project.tasks) {
        if (task.id == id) return task;
      }
    }
    return false;
  }
}

export class Project {
  constructor(name, isDefault = false, id) {
    this.itemType = "project";
    this.isDefault = isDefault;
    this.name = name;
    this.tasks = [];
    if (!id) this.id = crypto.randomUUID();
    else this.id = id;
  }

  processSaveItems(saveItems) {
    for (const task of saveItems) {
      const newTask = new Task(
        task.name, task.notes, task.prio, 
        task.dueDate, this.id, task.isComplete, task.id
      );
      this.tasks.push(newTask);
    }
  }
}

export class Task {
  constructor(name, notes, prio, dueDate, projectID, isComplete = false, id) {
    this.itemType = "task";
    this.name = name;
    this.notes = notes;
    this.prio = prio;
    this.dueDate = dueDate;
    this.projectID = projectID;
    this.isComplete = isComplete;
    if (!id) this.id = crypto.randomUUID();
    else this.id = id;
  }
}