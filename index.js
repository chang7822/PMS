let database = [
  { 
    date : "21. 4.22.",
    timestamp: "오후 9:13", 
    name: "Paul",
    department: "차체생기3팀",
    contact: "01012341234",
    destination: "1공장"
  }
]

// DOM Element를 메모리에 로딩 힙니다.
let registerBtn = document.getElementById("register-btn");
let nameField = document.getElementById("name-field");
let departmentField = document.getElementById("department-field");
let contanctField = document.getElementById("contact-field");
let destinationField = document.getElementById("destination-field");
let table = document.getElementById("table");
let log = document.getElementById("log");



function handleOnClickRegister() {
  if (isStringEmtpy(nameField.value) ||
    isStringEmtpy(departmentField.value) ||
    isStringEmtpy(contanctField.value) ||
    isStringEmtpy(destinationField.value)) {
    alert("모든 정보를 입력해주세요!");
    return
  }

  addToDatabase(
    nameField.value,
    departmentField.value,
    contanctField.value,
    destinationField.value
  );
  renderDatabase();
  emptyFields();
}
registerBtn.onclick = handleOnClickRegister;
// log.onclick = function () { console.log(database) };


/**
 * 문자열의 길이가 0 인지 검사.
 * 
 * @param {*} str 검사 할 문자열
 * @returns 인자로 받은 문자열의 길이가 0인지 나타내는 boolean 값
 */
function isStringEmtpy(str) {
  // Problem-1
  if (str == "")
    return true;
}

/**
 * 입력창을 비워주는 함수
 */
function emptyFields() {
  nameField.value = ""
  departmentField.value = ""
  contanctField.value = ""
  destinationField.value = ""

}
// 2021-04-22T09:13:23.293Z
/**
 * 사용 내역 저장에 필요한 데이터 (이름, 부서, 연락처, 목적지)를 받아 현재시간과 함깨 database 배열에 저장
 * 
 *
 */
function addToDatabase(name, department, contact, destination) {
  const now = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"});
  
  let newDatabase = {
    date : now.slice(2,12),
    timestamp: now.slice(13,21),
    name: name,
    department: department,
    contact: contact,
    destination: destination
  }

  database.push(newDatabase);

  //새로운 객체를 만들어 database 배열에 추가
  /** 객체 예시
   {
     timestamp: "2021-04-22T09:13:23.293Z", 
     name: "Jake",
     department: "차체생기3팀",
     contact: "01012341234",
     destination: "1공장"
   }
   */
}

/**
 * 랜더링하기 위한 데이터를 인자로 받아 동적으로 Element를 생성해여 반환 
 * 
 * @returns 생성한 Element
 */
function renderARow(date, timestamp, name, department, contact, destination) {
  const newRow = document.createElement("div");

  newRow.className = "row";
  newRow.innerHTML = `
      <div class="row-element"style="width: 10%">${date}</div>
      <div class="row-element"style="width: 10%">${timestamp}</div>
      <div class="row-element"style="width: 10%">${name}</div>
      <div class="row-element"style="width: 15%">${department}</div>
      <div class="row-element"style="width: 17.5%">${contact}</div>
      <div class="row-element"style="width: 15%">${destination}</div>
      <div class="row-element"style="width: 7.5%">완료</div>
      <div class="row-element" style="width: 17.5%">
        <button id = "${name}delete">삭제</button>
        <button id = "${name}modify">수정</button>
      </div>
  `
  return newRow;
}

function produceRemoveDataByName (targetName) {
  function removeDataByName() {
    for (i = 0; i < database.length; i++) {
      if (database[i].name == targetName) {
        database.splice(i, 1);

        // return true
      }
      // return false
    }
    renderDatabase();
  }
  return removeDataByName;
}


function addDeleteEventListener(name) {
  let deleteBtn = document.getElementById(`${name}delete`);
  deleteBtn.onclick = produceRemoveDataByName(name);
}

function addModifyEventListener(name) {
  let modifyBtn = document.getElementById(`${name}modify`);
  modifyBtn.onclick = produceModifyDataByName(name);
}

function produceModifyDataByName(targetName) {
  function modifyDataByName() {

    let newName = prompt("이름 수정");
    let newDepartment = prompt("팀 수정");
    let newContact = prompt("연락처 수정");
    let newDestination = prompt("목적지 수정");


    if (newName == null || newDepartment == null || newContact == null || newDestination == null)
      return alert("변경내용을 모두 입력하지 않았습니다.")

    else {
      let bool = confirm("입력값으로 변경하시겠습니까?");
      
      if (bool == false)
        return

      else {
        for (i = 0; i < database.length; i++) {
          if (database[i].name == targetName) {
            database[i].name = newName;
            database[i].department = newDepartment;
            database[i].contact = newContact;
            database[i].destination = newDestination;
          }
        }
      }
    }
    renderDatabase()
  }
  return modifyDataByName
}


function renderDatabase() {
  let rows = [];
  rows = database.map(row => {
    return renderARow(row.date, row.timestamp, row.name, row.department, row.contact, row.destination);
  })

  table.innerHTML = "";
  rows.forEach(row => {
    table.appendChild(row);
  })

  for(i = 0; i < database.length; i++){
    addDeleteEventListener(database[i].name);
  }

  for(i = 0; i < database.length; i++){
    addModifyEventListener(database[i].name);
  }
}
renderDatabase();