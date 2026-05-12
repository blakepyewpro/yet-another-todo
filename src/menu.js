export default class Menu {
  constructor(masterList, UI) {
    this.masterList = masterList;
    this.interface = UI;

    this.projectsList = document.querySelector("ul#projects");
    this.allTasks = document.querySelector("li#all");
    this.today = document.querySelector("li#today");
    this.week = document.querySelector("li#week");

    this.filterMode = "default";
    this.makeProjectList;
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
          this.masterList.filterByProject(project.id);
          this.interface.redrawList;
        });
      }
    }
  }
}