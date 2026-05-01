import "./style.css";
import UI from "./interface.js";
import Storage from "./storage.js"
import { MasterList, Project, Task } from "./items.js";

const myUI = new UI();
myUI.initialize();

Storage.clear();
const myList = new MasterList();

const testProject1 = new Project("None", true);
myList.saveOrUpdate(testProject1);
console.log("Test 1:\n"
  + Storage.load()
);

const testTask1 = new Task("test task", "do some testing", 
  "low", new Date (), "None");
myList.saveOrUpdate(testTask1);
console.log("Test 2:\n"
  + Storage.load()
);

const testProject2 = new Project("Work");
myList.saveOrUpdate(testProject2);
console.log("Test 3:\n"
  + Storage.load()
);

const testTask2 = new Task("edited task", "do edit stuff", 
  "med", new Date("2026-05-30"), "Work");
myList.saveOrUpdate(testTask2, testTask1);
console.log("Test 4:\n"
  + Storage.load()
);

const replacementProject = new Project ("Play");
myList.saveOrUpdate(replacementProject, testProject2);
console.log("Test 5:\n" + Storage.load());

const testTask3 = new Task ("even more edited task",
  "do more edited stuff",
  "high",
  "2026-06-01",
  "Play",
);
console.log("Test 6:\n" + Storage.load());
