/*Homework_24*/

class User {
  constructor(id, name, email, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

let users = JSON.parse(localStorage.getItem('users')) || [];
const saveUsersToLocalStorage = () => localStorage.setItem('users', JSON.stringify(users));

const renderUserList = () => {
  const userListElement = document.getElementById('user-list');
  userListElement.innerHTML = '';

  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${user.name}</span>
      <button data-id="${user.id}" class="view-btn">View</button>
      <button data-id="${user.id}" class="edit-btn">Edit</button>
      <button data-id="${user.id}" class="remove-btn">Remove</button>
    `;
    userListElement.appendChild(li);
  });

  const viewButtons = document.querySelectorAll('.view-btn');
  const editButtons = document.querySelectorAll('.edit-btn');
  const removeButtons = document.querySelectorAll('.remove-btn');

  viewButtons.forEach(button => button.addEventListener('click', onViewButtonClick));
  editButtons.forEach(button => button.addEventListener('click', onEditButtonClick));
  removeButtons.forEach(button => button.addEventListener('click', onRemoveButtonClick));
};

const displayUserDetails = (user) => {
  const userDetailsElement = document.getElementById('user-details');
  userDetailsElement.innerHTML = `
    <h2>User Details</h2>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
  `;
};

const editUserDetails = (user) => {
  const userDetailsElement = document.getElementById('user-details');
  userDetailsElement.innerHTML = `
    <h2>Edit User</h2>
    <form id="edit-user-form">
      <input type="text" placeholder="Name" id="edit-name" required value="${user.name}">
      <input type="email" placeholder="Email" id="edit-email" required value="${user.email}">
      <input type="tel" placeholder="Phone" id="edit-phone" required value="${user.phone}">
      <button type="submit">Save</button>
    </form>
  `;

  const editForm = document.getElementById('edit-user-form');
  editForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user.name = document.getElementById('edit-name').value;
    user.email = document.getElementById('edit-email').value;
    user.phone = document.getElementById('edit-phone').value;
    saveUsersToLocalStorage();
    renderUserList();
    displayUserDetails(user);
  });
};

const removeUser = (user) => {
  if (confirm('Are you sure you want to remove this user?')) {
    users = users.filter((u) => u.id !== user.id);
    saveUsersToLocalStorage();
    renderUserList();
    document.getElementById('user-details').innerHTML = '';
  }
};

const onViewButtonClick = (event) => {
  const userId = parseInt(event.target.dataset.id);
  const user = users.find((u) => u.id === userId);
  displayUserDetails(user);
};

const onEditButtonClick = (event) => {
  const userId = parseInt(event.target.dataset.id);
  const user = users.find((u) => u.id === userId);
  editUserDetails(user);
};

const onRemoveButtonClick = (event) => {
  const userId = parseInt(event.target.dataset.id);
  const user = users.find((u) => u.id === userId);
  removeUser(user);
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');

  const newUser = new User(Date.now(), nameInput.value, emailInput.value, phoneInput.value);
  users.push(newUser);
  saveUsersToLocalStorage();
  renderUserList();
  nameInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
};

document.getElementById('new-user-form').addEventListener('submit', handleFormSubmit);
renderUserList();