export class MasterList {
  constructor(saveData) {
    this.items = [];

    if (saveData) {
      for (let item in saveData.items) {
        if (item.itemType == "project") {
          this.items.push(
            new Project(item.name, new Date(item.dueDate),)
          )
        }
      } 
    }
  }

  static processItems (items) {
    //TODO
  }

  sortByDueDate() {
    //TODO
  }
}

export class Project {
  constructor(name, dueDate, items) {
    this.itemType = "project";
    this.name = name;
    this.dueDate = dueDate;
    this.items = items;
  }

  sortByDueDate() {
    //TODO
  }
}

export class Task {
  constructor(name, description, dueDate) {
    this.itemType = "project";
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.itemType = "task";
  }
}