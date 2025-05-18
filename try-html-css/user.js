console.log("helloo user");
const BASE_URL = "http://localhost:8000";
let usersDOM = document.getElementById("users");
let messageDOM = document.getElementById("message");
let allDeleteButtonsDOM = document.querySelectorAll(".delete");

const displayUsers = async () => {
  try {
    let response = await axios.get(`${BASE_URL}/users`);

    let users = response.data;
    let innerHTML = "";
    console.log(users);
    for (let i = 0; i < users.length; i++) {
      innerHTML += `<div>
      ${users[i].id} ${users[i].firstname} ${users[i].lastname} 
      <a href='index.html?id=${users[i].id}'><button class="edit">Edit</button></a>
      <button class="delete" data-id="${users[i].id}">Remove</button> 
      </div>`;
    }
    console.log(innerHTML);

    usersDOM.innerHTML = innerHTML;

    let allDeleteButtonsDOM = document.getElementsByClassName("delete");
    console.log(allDeleteButtonsDOM);

    for (let i = 0; i < allDeleteButtonsDOM.length; i++) {
      allDeleteButtonsDOM[i].addEventListener("click", async (event) => {
        console.log(event);
        let id = event.target.dataset.id;
        try {
          let response = await axios.delete(`${BASE_URL}/users/${id}`);
          displayUsers();
        } catch (error) {
          console.log(error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

window.onload = async () => {
  await displayUsers();
};

// window
