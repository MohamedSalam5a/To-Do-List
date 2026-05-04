let userInput = document.getElementById("userInputTask");
let addTask = document.getElementById("addTask");
let taskBox = document.getElementById("tasks");
let clearAll = document.getElementById("clearAll");
let finishedTasks = document.getElementById("finishedTasks");
let searchInput = document.getElementById("searchInput");
let editOverlay = document.querySelector(".edit-overlay");
let closeEdit = document.getElementById("closeEdit");
let cancelEdit = document.getElementById("cancelEdit");
let editTaskInput = document.getElementById("editTaskInput");
let saveEdit = document.getElementById("saveEdit");
let alertEdit = document.getElementById("alertEdit");
let progressBar = document.getElementById("progressBar");
let removeCheckedBtn = document.getElementById("removeCheckedBtn");
let taskStatus = document.getElementById("taskStatus")
let allData = [];
let dataFinished = [];
let currentIndex;

if (localStorage.getItem("tasks") != null) {
  allData = JSON.parse(localStorage.getItem("tasks"));
  display(allData);
}

if (localStorage.getItem("finishedTasks") != null) {
  dataFinished = JSON.parse(localStorage.getItem("finishedTasks"));
  displayFinishedTasks(dataFinished);
}

//event
addTask.addEventListener("click", function () {
  addTaskData();
});
clearAll.addEventListener("click", function () {
  clearTask();
});

searchInput.addEventListener("input", function () {
  display(allData);
});

closeEdit.addEventListener("click", closeEditTask);
cancelEdit.addEventListener("click", closeEditTask);
saveEdit.addEventListener("click", saveData);
removeCheckedBtn.addEventListener("click",removeCheckedAll);
// function
function addTaskData() {
  if (userInput.value.trim() === "") return;

  allData.push(userInput.value);

  localStorage.setItem("tasks", JSON.stringify(allData));
  display(allData);
  clearInput();
}

function display(data) {
  let box = "";
  let term = searchInput.value;
  for (let i = 0; i < data.length; i++) {
    if (data[i].toLocaleLowerCase().includes(term.toLocaleLowerCase())) {
      box += ` <div class="col-lg-7">
                        <div class="task d-flex justify-content-between p-2 rounded-2">
                            <p class=" m-0 d-flex align-items-center ">${data[i]}</p>
                            <div class="icons ">
                                <button   class="btn  check checkTasks" data-index = ${i} >                                   
                                    <i class="fa-solid fa-check"></i>
                                </button>

                                <button   class="btn edit" data-index = ${i} >                                   
                                    <i class="fa-solid fa-pen"></i>
                                </button>
                                
                                <button class="btn delete" data-index = ${i}>
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>`;
    }
  }

  taskBox.innerHTML = box;

  let checkTaskbtn = document.querySelectorAll(".checkTasks");
  for (let i = 0; i < checkTaskbtn.length; i++) {
    checkTaskbtn[i].addEventListener("click", function (e) {
      let indexCheck = e.currentTarget.dataset.index;
      checkTaskBox(indexCheck);
    });
  }

  let delet = document.querySelectorAll(".delete");
  for (let i = 0; i < delet.length; i++) {
    delet[i].addEventListener("click", function (e) {
      let indexDelete = e.currentTarget.dataset.index;

      deletTasks(indexDelete);
    });
  }

  let edit = document.querySelectorAll(".edit");
  for (let i = 0; i < edit.length; i++) {
    edit[i].addEventListener("click", function (e) {
      let indexedit = e.currentTarget.dataset.index;

      editTasks(indexedit);
    });
  }

  progressBarTask();
}

function clearInput() {
  userInput.value = null;
}

function clearTask() {
  allData = [];
  localStorage.removeItem("tasks");
  display(allData);
}

function checkTaskBox(index) {
  dataFinished.push(allData[index]);
  allData.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allData));
  localStorage.setItem("finishedTasks", JSON.stringify(dataFinished));
  display(allData);
  displayFinishedTasks(dataFinished);
}

function displayFinishedTasks(data) {
  let box = "";

  for (let i = 0; i < data.length; i++) {
    box += `
    <div class="col-lg-7">
                        <div class="task d-flex justify-content-between p-2 rounded-2">
                            <p class=" m-0 d-flex align-items-center text-decoration-line-through"> ${data[i]}</p>
                        </div>
                    </div> `;
  }

  finishedTasks.innerHTML = box;
  progressBarTask();
}

function deletTasks(index) {
  allData.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allData));
  display(allData);
}

function editTasks(index) {
  currentIndex = index;
  editOverlay.classList.add("visible");

  editTaskInput.value = allData[index];
  editTaskInput.classList.add("text-light");
}

function saveData() {
  if (editTaskInput.value === "") {
    alertEdit.classList.remove("d-none");
  } else {
    allData.splice(currentIndex, 1, editTaskInput.value);
    localStorage.setItem("tasks", JSON.stringify(allData));
    display(allData);
    closeEditTask();
    progressBarTask();
  }
}

function closeEditTask() {
  editOverlay.classList.remove("visible");
  alertEdit.classList.add("d-none");
}

function progressBarTask() {
  let totalTask = allData.length + dataFinished.length;
  let totalFinished = dataFinished.length;

  if (totalTask === 0) {
    progressBar.style.width = "0%";
    progressBar.setAttribute("aria-valuenow", "0");
    return;
  }

  let percentage = (totalFinished / totalTask) * 100;

  progressBar.style.width = `${percentage}%`;
  progressBar.setAttribute("aria-valuenow", percentage);
  taskStatus.innerText =  ` ${totalFinished} of ${totalTask} tasks done `  
}

function removeCheckedAll() {
  dataFinished = [];
  localStorage.removeItem("finishedTasks");
  displayFinishedTasks(dataFinished);
  progressBarTask()
}
