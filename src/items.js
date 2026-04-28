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
  constructor(name, dueDate, items, isDefault = false) {
    this.itemType = "project";
    this.name = name;
    this.items = items;
    isDefault = isDefault;
  }

  sortByDueDate() {
    //TODO
  }
}

export class Task {
  constructor(name, description, dueDate, isComplete = false) {
    this.itemType = "task";
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.isComplete = isComplete;
  }
}