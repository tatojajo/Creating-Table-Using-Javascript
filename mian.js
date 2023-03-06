"use strict";

const studentAdderForm = document.getElementById("student-add");
const studentInput = document.getElementById("student-fullname");
const addDayBtn = document.getElementById("day-adder");
const removeLastDay = document.getElementById("day-remover");
const totalDays = document.getElementById("total-days");
const missedDays = document.getElementById("missed-days");

const students = [
  { id: 0, fullName: "Tato Jajanidze", average: 0 },
  { id: 1, fullName: "Tato Jajanidze", average: 0 },
  { id: 2, fullName: "Tato Jajanidze", average: 0 },
  { id: 3, fullName: "Tato Jajanidze", average: 0 },
  { id: 4, fullName: "Tato Jajanidze", average: 0 },
  { id: 5, fullName: "Tato Jajanidze", average: 0 },
  { id: 6, fullName: "Tato Jajanidze", average: 0 },
  { id: 7, fullName: "Tato Jajanidze", average: 0 },
  { id: 8, fullName: "Tato Jajanidze", average: 0 },
  { id: 9, fullName: "Tato Jajanidze", average: 0 },
];

// * create tableHead tag and elements

const tableContainer = document.getElementById("main-table");

function createTheadAndDayElements(table) {
  const tableHead = document.createElement("thead");
  tableHead.classList.add("table-head");
  const tableHeadRow = document.createElement("tr");
  tableHeadRow.classList.add("thead-head-row");
  const studentInfo = document.createElement("th");
  studentInfo.classList.add("student-info");
  studentInfo.innerText = "Student";
  const averagePoint = document.createElement("th");
  averagePoint.classList.add("student-average-mark");
  averagePoint.innerText = "Average";
  tableHeadRow.append(studentInfo, averagePoint);
  tableHead.append(tableHeadRow);
  table.append(tableHead);
  return tableHead;
}

createTheadAndDayElements(tableContainer);

// * create tableBody tag and element
const tableBody = document.createElement("tbody");
function createTbodyAndelements(table, student) {
  tableBody.classList.add("table-body");
  const tableBodyRow = document.createElement("tr");
  tableBodyRow.classList.add("tbody-content-row");
  const eachStudent = document.createElement("th");
  eachStudent.classList.add("fullname");
  eachStudent.innerText = student.fullName;
  const averagePointBox = document.createElement("th");
  averagePointBox.classList.add("average-point");
  averagePointBox.innerText = "0";
  tableBodyRow.append(eachStudent, averagePointBox);
  tableBody.append(tableBodyRow);
  table.append(tableBody);
}

// * add student in table

function addingStudentInTable(students) {
  students.forEach((element) => {
    createTbodyAndelements(tableContainer, element);
  });
  clacTotalStudents(students);
}
addingStudentInTable(students);

// * createing days array

function createDaysArray() {
  const startDate = new Date("2022-12-05");
  const endDate = new Date("2023-05-31");

  const dates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();

    if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5) {
      dates.push(new Date(currentDate).toDateString());
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

// * adding dayRow inTable
const days = createDaysArray();
function addDayRows(daysArray) {
  const tableHeadRow = document.querySelector(".thead-head-row");
  const newDay = document.createElement("th");
  newDay.classList.add("each-day");
  tableHeadRow.append(newDay);

  const classDays = document.querySelectorAll(".each-day");
  classDays.forEach((day, index) => {
    if (classDays.length <= daysArray.length) {
      addIndexAttributeOnEachDay();
      day.innerText = daysArray[index];
    }
  });
}

function addIndexAttributeOnEachDay() {
  const classDays = document.querySelectorAll(".each-day");
  classDays.forEach((day, index) => {
    day.setAttribute("day-index", index);
  });
}

// * adding mark box for each day for each student

function addStudentMarksBoxes() {
  const students = document.querySelectorAll(".tbody-content-row");
  students.forEach((student) => {
    const createBox = document.createElement("td");
    createBox.classList.add("mark");
    createBox.innerText = "0";
    createBox.style.backgroundColor = "red";
    student.append(createBox);
  });
}
// * mark boxes for new student

function markBoxForNewStudent(newStudent) {
  const studentRow = document.querySelectorAll(".tbody-content-row");
  const allDays = document.querySelectorAll(".each-day");
  allDays.forEach((day, index) => {
    const createBox = document.createElement("td");
    createBox.classList.add("mark");
    createBox.innerText = "0";
    createBox.style.backgroundColor = "red";
    studentRow.forEach((student) => {
      student.append(createBox);
    });
  });
  setAttributsEachMark();
}

// * set atributs on each mark
function setAttributsEachMark() {
  const eachMarkBox = document.querySelectorAll(".mark");
  eachMarkBox.forEach((mark) => {
    const index = Array.from(mark.parentElement.children).indexOf(mark) - 2;
    mark.setAttribute("mark-index", index);
  });
}

// * function createing and adding students

const addingform = document.querySelector("#student-add");
const addingInput = document.querySelector("#student-fullname");

function createNewStudent(students, startIndex = 0) {
  for (let i = startIndex; i < students.length; i++) {
    const start = students[i];
    const tbodyNewRow = document.createElement("tr");
    tbodyNewRow.classList.add("tbody-content-row");
    const newStudent = document.createElement("th");
    newStudent.classList.add("fullname");
    const newStudentAveragePoint = document.createElement("th");
    newStudentAveragePoint.classList.add(`average-point`);
    newStudentAveragePoint.innerText = 0;
    newStudent.innerText = start.fullName;
    newStudentAveragePoint.innerText = start.average;
    tbodyNewRow.append(newStudent, newStudentAveragePoint);
    tableBody.append(tbodyNewRow);
  }
  setStudentIndexToEachMark();
}

function addingStudent() {
  const newStudentId = students.length + 1;
  const newStudentFullName = studentInput.value;
  const newStudent = {
    id: newStudentId,
    fullName: newStudentFullName,
    average: 0,
  };
  students.push(newStudent);
  createNewStudent(students, students.length - 1);
  studentInput.value = "";
  clacTotalStudents(students);
}

// * check if entered student name

function checkIfEnteredStudent(inputValue) {
  if (inputValue === "") {
    alert("შეიყვენეთ სტუდენტის სახელი და გვარი!!!!!!");
    return false;
  }
  return true;
}

// * clickes on add Day
addDayBtn.addEventListener("click", () => {
  addDayRows(days);
  addStudentMarksBoxes(students);
  editStudentsMark();
  totalDaysCounter();
  setAttributsEachMark();
  createDayRemoverBtn();
  setStudentIndexToEachMark();
  clacAveargeForStudet();
  calcMissedDays();
});
// * click on form
studentAdderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkIfEnteredStudent(studentInput.value)) {
    addingStudent();
    markBoxForNewStudent();
    totalDaysCounter();
    setAttributsEachMark();
    editStudentsMark();
    setStudentIndexToEachMark();
    clacAveargeForStudet();
    calcMissedDays();
  }
});

// * click on remove last day

removeLastDay.addEventListener("click", () => {
  // * day box
  const days = document.querySelector(".thead-head-row");
  const daysArray = days.children;
  //   * mark box
  const students = document.querySelectorAll(".tbody-content-row");
  // * statement
  if (daysArray.length > 2) {
    days.removeChild(days.lastChild);
    students.forEach((student) => {
      student.removeChild(student.lastChild);
    });
  }
  totalDaysCounter();
  calcMissedDays();
  clacAveargeForStudet();
});

// * prompt to edit mark
function editMarkPrompt() {
  let editor = prompt("Enter the mark");
  while (editor < 0 || editor > 5 || isNaN(editor) || editor === "") {
    editor = prompt("Enter the mark");
  }
  return editor;
}

function editStudentsMark() {
  const markBoxes = document.querySelectorAll(".mark");
  markBoxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      if (box.innerText === "0") {
        box.innerText = editMarkPrompt();
        if (box.innerText !== "") {
          box.style.backgroundColor = "green";
          clacAveargeForStudet();
          calcMissedDays();
        } else if (box.innerText === "") {
          box.innerText = "0";
        }
      }
    });
  });
}

// * remove chosed day pressing button

function createDayRemoverBtn() {
  const eachDay = document.querySelectorAll(".each-day");
  eachDay.forEach((day, index) => {
    const removeChosedDay = document.createElement("button");
    removeChosedDay.classList.add("remove-chosed-day");
    removeChosedDay.innerText = "X";
    removeChosedDay.style.backgroundColor = "white";
    removeChosedDay.style.color = "black";
    removeChosedDay.style.border = "2px solid #f44336";
    removeChosedDay.setAttribute("index", index);
    day.append(removeChosedDay);
  });
  removeingDay();
}

function removeingDay() {
  const dayButton = document.querySelectorAll(".remove-chosed-day");
  const eachDay = document.querySelectorAll(".each-day");
  const markDays = document.querySelectorAll(".mark");

  dayButton.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonIndex = button.getAttribute("index");
      eachDay.forEach((day) => {
        const dayIndex = day.getAttribute("day-index");
        if (buttonIndex === dayIndex) {
          day.remove();
          markDays.forEach((day) => {
            const markDayIndex = day.getAttribute("mark-index");
            if (dayIndex === markDayIndex) {
              day.remove();
            }
          });
        }
      });
      totalDays.innerText--;
      clacAveargeForStudet();
      calcMissedDays();
    });
  });
}

/*
 *  ====== counters ======
 */

// * count Total days
function totalDaysCounter() {
  const days = document.getElementsByClassName("each-day");
  totalDays.innerText = days.length;
}

// * set attributes 'student-index' "average-Index" on each mark for each student

function setStudentIndexToEachMark() {
  const studentsArray = document.querySelectorAll(".tbody-content-row");
  studentsArray.forEach((student, studentIndex) => {
    const studentsElement = student.children;
    for (let i = 0; i < studentsElement.length; i++) {
      studentsElement[i].setAttribute("student-index", studentIndex);
    }
  });
  studentsArray.forEach((student, studentIndex) => {
    const studentsElement = student.children;
    for (let i = 1; i < studentsElement.length; i++) {
      studentsElement[i].setAttribute("average-Index", studentIndex);
    }
  });
}

// * calculate averge for each student

function clacAveargeForStudet() {
  const studentsArray = document.querySelectorAll(".tbody-content-row");
  studentsArray.forEach((student, index) => {
    const attribute = document.querySelectorAll(`[average-Index = '${index}']`);
    let sum = 0;
    for (let i = 1; i < attribute.length; i++) {
      sum += parseInt(attribute[i].innerHTML);
      attribute[0].innerHTML = (sum / totalDays.innerHTML).toFixed(2);
    }
    if (student.children.length === 2) {
      attribute[0].innerHTML = "0";
      missedDays.innerText = "0";
    }
  });
  totalAverageCalc();
}

// * total average calc
function totalAverageCalc() {
  const totalAverageMark = document.querySelector("#average-mark");
  const average = document.querySelectorAll(".average-point");
  let sumOfAverages = 0;
  average.forEach((average) => {
    let eachPoint = parseInt(average.innerText);
    sumOfAverages += eachPoint;
    totalAverageMark.innerText = (sumOfAverages / students.length).toFixed(2);
  });
}

// * total students calc

function clacTotalStudents(students) {
  const totalStudentDisplay = document.querySelector("#total-students");
  const studentsLength = students.length;
  totalStudentDisplay.innerText = studentsLength;
}

// * calc missed days

function calcMissedDays() {
  const missedDaysDisplay = document.querySelector("#missed-days");
  const totalMarks = document.querySelectorAll(".mark");
  let missedDays = 0;
  totalMarks.forEach((mark) => {
    if (mark.innerText === "0") {
      missedDays++;
      missedDaysDisplay.innerText = missedDays;
    }
  });
}