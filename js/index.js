let userInput = document.getElementById("userInputTask");
let addTask = document.getElementById("addTask");
let allData;

if (localStorage.getItem("tasks") == null) {
  allData = [];
} else {
  allData = JSON.parse(localStorage.getItem("tasks"));
}

//even
addTask.addEventListener("click", function () {
  addTaskData();
});



// function
function addTaskData() {
  allData.push(userInput.value);
  localStorage.setItem("tasks", JSON.stringify(allData));

  clearInput ()
}

function clearInput (){
    userInput.value = null ;
}
