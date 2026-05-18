export default class Menu {
  constructor(masterList, UI) {
    this.masterList = masterList;
    this.interface = UI;

    this.projectsList = document.querySelector("ul#projects");
    this.allTasks = document.querySelector("li#all");
    this.today = document.querySelector("li#today");
    this.week = document.querySelector("li#week");

    this.filterMode = "default";
    this.filterID = null;
    this.makeProjectList;

    this.allTasks.addEventListener("click", () => {
      this.filterMode = "default";
      this.filterID = null;
      this.masterList.resetFilter();
      this.interface.redrawList();
    });

    this.today.addEventListener("click", () => {
      this.filterMode = "today";
      this.masterList.filterByDueDate("today");
      this.interface.redrawList();
    });

    this.week.addEventListener("click", () => {
      this.filterMode = "week";
      this.masterList.filterByDueDate("week");
      this.interface.redrawList();
    })
  }

  makeProjectList() {
    this.projectsList.replaceChildren();
    for (const project of this.masterList.projects) {
      if (!project.isDefault) {
        const li = document.createElement("li");
        li.id = project.id;
        const span = document.createElement("span");
        span.innerText = project.name;
        li.append(span);
        this.projectsList.append(li);
        li.addEventListener("click", () => {
          this.filterMode = "project";
          this.filterID = project.id;
          this.masterList.filterByProject(project.id);
          this.interface.redrawList;
        });
      }
    }
  }

  recalculateFilters() {
    if (this.filterMode == "default") {
      this.masterList.resetFilter();
    } else if (this.filterMode == "project") {
      this.masterList.filterByProject(this.filterID);
    } else if (this.filterMode == "today") {
      this.masterList.filterByDueDate("today");
    } else if (this.filterMode == "week") {
      this.masterList.filterByDueDate("week");
    }
  }
}