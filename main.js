let users = [
  {
    name: "Moataz",
    email: "Moataz@example.com",
    age: 19,
    specialty: "Backend",
  },
  {
    name: "Sara",
    email: "sara@example.com",
    age: 28,
    specialty: "Frontend",
  },
  {
    name: "Maryam",
    email: "maryam@example.com",
    age: 26,
    specialty: "Fullstack",
  },
];
displayUsers();
let msg = document.getElementById("msg");
document.getElementById("addUser").onclick = addUser;
document.getElementById("cancel").onclick = cancelInputs;

function addUser() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let age = document.getElementById("age").value.trim();
  let specialty = document.getElementById("specialty").value;

  if (name === "" || email === "" || age === "" || specialty === "") {
    msg.innerText = "Please fill all fields";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    msg.innerText = "Invalid email";
    return;
  }

  if (age <= 0) {
    msg.innerText = "Invalid age";
    return;
  }
  let user = {
    name: name,
    email: email,
    age: age,
    specialty: specialty,
  };
  msg.innerText = "User added successfully!";
  users.push(user);
  displayUsers();
  cancelInputs();
}

function displayUsers() {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.specialty}</td>
        <td>
            <button onclick="editUser(${i})" style="background: none; color: #d1d1ec;">Edit</button> 
            <button onclick="deleteUser(${i})" style="background: none; color: red;">Delete</button>
        </td>
        `;
    tbody.appendChild(tr);
  }
}

function cancelInputs() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("age").value = "";
  document.getElementById("specialty").value = "";
  editIndex = null;
  document.getElementById("addUser").innerText = "Add User";
  document.getElementById("addUser").onclick = addUser;
}

function deleteUser(index) {
  if (confirm("Are you sure you want to delete this user?")) {
    users.splice(index, 1);
    displayUsers();
    msg.innerText = "User deleted successfully!";
  }
}

let editIndex = null;

function editUser(index) {
  let user = users[index];
  editIndex = index;

  document.getElementById("name").value = user.name;
  document.getElementById("email").value = user.email;
  document.getElementById("age").value = user.age;
  document.getElementById("specialty").value = user.specialty;
  let addBtn = document.getElementById("addUser");
  addBtn.innerText = "Save Changes";
  addBtn.onclick = () => {
    saveEdit();
  };
}

function saveEdit() {
  if (editIndex !== null) {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value;
    let specialty = document.getElementById("specialty").value;

    if (name === "" || email === "" || age === "" || specialty === "") {
      msg.innerText = "Please fill all fields before saving";
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      msg.innerText = "Invalid email";
      return;
    }

    if (age <= 0) {
      msg.innerText = "Invalid age";
      return;
    }
    users[editIndex] = {
      name: name,
      email: email,
      age: age,
      specialty: specialty,
    };
    msg.innerText = "User edited successfully!";
    editIndex = null;
    document.getElementById("addUser").innerText = "Add User";
    document.getElementById("addUser").onclick = addUser;
    cancelInputs();
    displayUsers();
  }
}

document.getElementById("search").oninput = function () {
  filter();
};

document.getElementById("select").onchange = function () {
  filter();
};

function filter() {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let filterValue = document.getElementById("select").value;

  let filteredUsers = users.filter((user) => {
    let matchesSearch =
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue);
    let matchesSelect = filterValue === "all" || user.specialty === filterValue;

    return matchesSearch && matchesSelect;
  });

  renderFilteredUsers(filteredUsers);
}

function renderFilteredUsers(filteredData) {
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  if (filteredData.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5">No matching users found.</td></tr>`;
    return;
  }

  filteredData.forEach((user) => {
    let tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.specialty}</td>
            <td>
                <button onclick="editUser(${users.indexOf(user)})" style="background: none; color: #d1d1ec;">Edit</button> 
                <button onclick="deleteUser(${users.indexOf(user)})" style="background: none; color: red;">Delete</button>
            </td>
        `;
    tbody.appendChild(tr);
  });
}
