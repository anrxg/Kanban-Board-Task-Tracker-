const todo = document.querySelector("#to-do");
const inProgress = document.querySelector("#in-progress");
const done = document.querySelector("#done");

const tasks = document.querySelectorAll('.task');
let dragElememt = null;
let taskData = {}; 

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach(task => {
      const div = document.createElement("div");
      div.classList.add("task");
      div.setAttribute("draggable", "true");

      div.innerHTML = `
  <h2>${task.title}</h2>
  <p>${task.desc}</p>
  <button>Delete</button>
`
      column.appendChild(div);
      div.addEventListener("drag", (e) => {
        dragElememt = div;
      })
      const delBtn = div.querySelector("button");
      delBtn.addEventListener("click", ()=>{
         div.remove();
         TaskCounter();
      })
    })
  }
  TaskCounter();
}

tasks.forEach(task => {
  task.addEventListener("drag", (e) => {
    dragElememt = task;
  })
})

DragFeature(todo);
DragFeature(inProgress);
DragFeature(done);

function DragFeature(column) {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  })

  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  })
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  })

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    
    column.appendChild(dragElememt);
    column.classList.remove("hover-over");

    TaskCounter();
  })
}
function TaskCounter() {
  [todo, inProgress, done].forEach(col => {
    const tasks = col.querySelectorAll(".task");
    const count = col.querySelector(".right");

    taskData[col.id] = Array.from(tasks).map(t => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText
      }
    })
    localStorage.setItem("tasks", JSON.stringify(taskData));
    count.innerText = tasks.length;
  })
}

// Setting modal--------
const addTaskBtn = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
addTaskBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
})

const modalBG = document.querySelector(".modal .bg");
modalBG.addEventListener("click", () => {
  modal.classList.remove("active");
})
//Setting modal---------


// Adding task
const taskAddingBtn = document.querySelector("#add-new-task");
taskAddingBtn.addEventListener("click", AddNewTask);

function AddNewTask() {
  const taskTitle = document.querySelector("#add-task-name").value;
  const taskDesc = document.querySelector("#task-desc-input").value;
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
  <h2>${taskTitle}</h2>
  <p>${taskDesc}</p>
  <button>Delete</button>
`
  todo.appendChild(div);
  div.addEventListener("drag", (e) => {
    dragElememt = div;
  });
  TaskCounter();
  modal.classList.remove("active");
  document.querySelector("#add-task-name").value = "";
  document.querySelector("#task-desc-input").value = "";
}
//Adding task
