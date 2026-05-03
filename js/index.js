let userInput = document.getElementById("userInputTask");
let addTask = document.getElementById("addTask");
let taskBox = document.getElementById("tasks");
let clearAll = document.getElementById("clearAll");
let finishedTasks = document.getElementById("finishedTasks");
let searchInput = document.getElementById("searchInput");
let allData = [];
let dataFinished = [];

if (localStorage.getItem("tasks") != null) {
  allData = JSON.parse(localStorage.getItem("tasks"));
  display(allData);
}

if (localStorage.getItem("finishedTasks") != null) {
  dataFinished = JSON.parse(localStorage.getItem("finishedTasks"));
  displayFinishedTasks(dataFinished);
}

//even
addTask.addEventListener("click", function () {
  addTaskData();
});
clearAll.addEventListener("click", function () {
  clearTask();
});

searchInput.addEventListener("input", function () {
  display(allData);
  
});

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
    checkTaskbtn[i].addEventListener("click", function () {
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
}

function clearInput() {
  userInput.value = null;
}

function clearTask() {
  allData = [];
  dataFinished = [];
  localStorage.removeItem("tasks");
  localStorage.removeItem("finishedTasks");
  display(allData);
  displayFinishedTasks(dataFinished);
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
}

function deletTasks(index) {
  allData.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(allData));
  display(allData);
}

