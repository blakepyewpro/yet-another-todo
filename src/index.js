import "./style.css";
import UI from "./interface.js";
import Storage from "./storage.js"
import { MasterList, Project, Task } from "./items.js";

// Storage.clear();

const myUI = new UI();

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

// const myList = new MasterList();

// let testProject1 = new Project("None", true);
// myList.saveOrUpdate(testProject1);
// testProject1 = myList.projects[0];
// console.log("Add Default Project:\n"
//   + Storage.load()
// );

// let testTask1 = new Task("test task", "do some testing", 
//   "low", new Date (), testProject1.id);
// myList.saveOrUpdate(testTask1);
// testTask1 = myList.projects[0].tasks[0];
// console.log("Add Task:\n"
//   + Storage.load()
// );

// let testProject2 = new Project("Work");
// myList.saveOrUpdate(testProject2);
// testProject2 = myList.projects[1];
// console.log("Add 2nd Project:\n"
//   + Storage.load()
// );

// let testTask2 = new Task("edited task", "do edit stuff", 
//   "med", new Date("2026-05-30"), testProject2.id);
// myList.saveOrUpdate(testTask2, testTask1);
// testTask2 = myList.projects[1].tasks[0]
// console.log("Edit Task and Switch Project:\n"
//   + Storage.load()
// );

// const replacementProject = new Project ("Play");
// myList.saveOrUpdate(replacementProject, testProject2);
// console.log("Rename Project:\n" + Storage.load());

// const testTask3 = new Task ("even more edited task",
//   "do more edited stuff",
//   "high",
//   "2026-06-01",
//   testProject2.id,
// );
// myList.saveOrUpdate(testTask3, testTask2);
// console.log("Edit Task in Place:\n" + Storage.load());

// myList.delete(testTask3);
// console.log("Delete Task:\n" + Storage.load());

// myList.delete(testProject2);
// console.log("Delete Project:\n" + Storage.load());
