"use strict";

const fullnameInput = document.querySelector(".fullname");
const emailInput = document.querySelector(".email");
const numberInput = document.querySelector(".number");
const addressInput = document.querySelector(".address");
const saverBtn = document.querySelector(".saver-btn");
const updatBtn = document.querySelector(".update-btn");
const searchBtn = document.querySelector(".search-btn");
const tbodyElement = document.querySelector("tbody");
const editELement = document.querySelector(".edit");
const deleteELement = document.querySelector(".delete");
const tableElement = document.querySelector("table");
const searchInput = document.querySelector(".search-input");
const sortBtn = document.querySelector(".sort-btn");
let gender = "";

let studentList = [];

function renderTable(studentList) {
  tbodyElement.innerHTML = "";
  studentList.forEach((student, index) => {
    let trElement = "";
    trElement = `<tr data-type="${index + 1}">
    <td>${index + 1}</td>
    <td>${student.nameStudent}</td>
    <td>${student.email}</td>
    <td>${student.number}</td>
    <td>${student.address}</td>
    <td>${student.gender}</td>
    <td class="actions">
    <span href="" class="edit">edit</span>
    <span href="" class="delete">delete</span>
    </td>
    </tr>
    `;
    tbodyElement.insertAdjacentHTML("beforeend", trElement);
  });
}
saverBtn.addEventListener("click", () => {
  if (document.querySelector(".male").checked) {
    gender = "Nam";
  } else if (document.querySelector(".famale").checked) {
    gender = "Nữ";
  }
  let student = {
    nameStudent: fullnameInput.value,
    email: emailInput.value,
    number: numberInput.value,
    address: addressInput.value,
    gender: gender,
  };

  if (validate(student)) {
    studentList.push(student);
  }
  fullnameInput.value = "";
  emailInput.value = "";
  numberInput.value = "";
  addressInput.value = "";
  document.querySelector(".male").checked = false;
  document.querySelector(".famale").checked = false;

  renderTable(studentList);
});

tableElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    let index = e.target.parentElement.parentElement.getAttribute("data-type");
    studentList.splice(index - 1, 1);
    renderTable(studentList);
  }
  if (e.target.classList.contains("edit")) {
    let index = e.target.parentElement.parentElement.getAttribute("data-type");
    fullnameInput.value = studentList[index - 1].nameStudent;
    emailInput.value = studentList[index - 1].email;
    numberInput.value = studentList[index - 1].number;
    addressInput.value = studentList[index - 1].address;
    gender = studentList[index - 1].gender;

    saverBtn.classList.add("hide");
    updatBtn.classList.remove("hide");
    updatBtn.addEventListener("click", () => {
      studentList[index - 1].nameStudent = fullnameInput.value;
      studentList[index - 1].email = emailInput.value;
      studentList[index - 1].number = numberInput.value;
      studentList[index - 1].address = addressInput.value;
      studentList[index - 1].gender = gender;
      renderTable(studentList);
      saverBtn.classList.remove("hide");
      updatBtn.classList.add("hide");
      studentList.push(student);
      fullnameInput.value = "";
      emailInput.value = "";
      numberInput.value = "";
      addressInput.value = "";
      document.querySelector(".male").checked = false;
      document.querySelector(".famale").checked = false;
    });
  }
});

searchBtn.addEventListener("click", () => {
  let searchText = searchInput.value;
  tbodyElement.innerHTML = "";
  studentList.forEach((student, index) => {
    if (student.nameStudent.includes(searchText)) {
      let trElement = `<tr data-type="${index + 1}">
        <td>${index + 1}</td>
        <td>${studentList[index].nameStudent}</td>
        <td>${studentList[index].email}</td>
        <td>${studentList[index].number}</td>
        <td>${studentList[index].address}</td>
        <td>${studentList[index].gender}</td>
        <td class="actions">
        <span href="" class="edit">edit</span>
        <span href="" class="delete">delete</span>
        </td>
        </tr>
        `;
      tbodyElement.insertAdjacentHTML("beforeend", trElement);
    }
  });
  searchInput.value = "";
});

function validate(student) {
  const checkmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonecheck = /^(0|\+84)(9|8|7|5|3)\d{8}$/;
  if (!student.nameStudent) {
    alert("Vui lòng nhập họ tên");
    return false;
  } else if (!student.email || !checkmail.test(student.email)) {
    alert("Vui lòng nhập email");
    return false;
  } else if (!student.number || !phonecheck.test(student.number)) {
    alert("Vui lòng nhập số điện thoại");
    return false;
  } else if (!student.address) {
    alert("Vui lòng nhập địa chỉ");
    return false;
  } else if (!student.gender) {
    alert("Vui lòng chọn giới tính");
    return false;
  }
  return true;
}

function sortStudent() {
  studentList.sort((a, b) => {
    return a.nameStudent.localeCompare(b.nameStudent);
  });
}

sortBtn.addEventListener("click", () => {
  sortStudent();
  renderTable(studentList);
});
