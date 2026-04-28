import "./style.css";
import UI from "./interface.js";
import Storage from "./storage.js"
import { MasterList, Project, Task } from "./items.js";

const myUI = new UI();
myUI.initialize();

let myList = new MasterList();
let item1 = new Task("item1", "get item1 done", new Date("2026-05-05"));
let project = new Project("project1", new Date("2026-06-06"), []);
project.items.push(new Task("item2", "do item2", new Date("2026-07-07")))
myList.items.push(item1);
myList.items.push(project);

const myListString = JSON.stringify(myList);
console.log("String ML: \n" + myListString);

Storage.store(myList);
console.log("Stored ML: \n" + Storage.load())