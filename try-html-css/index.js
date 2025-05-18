console.log("helllooooo");
const BASE_URL = "http://localhost:8000";

let mode = "CREATE";
let selectedId = "";

let firstnameDOM = document.querySelector("input[name=firstname]");
let lastnameDOM = document.querySelector("input[name=lastname]");
let ageDOM = document.querySelector("input[name=age]");
let feedbackDOM = document.querySelector("textarea[name=feedback]");
let messageDOM = document.getElementById("message");

window.onload = async () => {
  let urlParams = new URLSearchParams(window.location.search);
  console.log(urlParams.get("id"));
  console.log(window.location.search);
  selectedId = urlParams.get("id");
  if (selectedId) {
    mode = "EDIT";

    try {
      let gendersDOM = document.querySelectorAll("input[name=gender]");
      let interestsDOM = document.querySelectorAll("input[name=interest]");
      let response = await axios.get(`${BASE_URL}/users/${selectedId}`);
      let user = response.data;
      console.log(response);
      console.log(response.data);

      firstnameDOM.value = user.firstname;
      lastnameDOM.value = user.lastname;
      ageDOM.value = user.age;
      feedbackDOM.value = user.feedback;

      console.log(gendersDOM);

      for (let i = 0; i < gendersDOM.length; i++) {
        if (gendersDOM[i].value == user.gender) {
          gendersDOM[i].checked = true;
          break;
        }
      }

      for (let i = 0; i < interestsDOM.length; i++) {
        if (user.interest.includes(interestsDOM[i].value)) {
          interestsDOM[i].checked = true;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const validateData = (user) => {
  let errors = [];

  if (!user.firstname) errors.push("Firstname");
  if (!user.lastname) errors.push("Lastname");
  if (!user.age) errors.push("Age");
  if (!user.gender) errors.push("Gender");
  if (!user.interest) errors.push("Interests");
  if (!user.feedback) errors.push("Feedback");

  return errors;
};

const submitForm = async () => {
  let genderDOM = document.querySelector("input[name=gender]:checked") || {};
  let interestsDOM =
    document.querySelectorAll("input[name=interest]:checked") || {};

  console.log("genderDOM");
  console.log(genderDOM);
  console.log("interestsDOM");
  console.log(interestsDOM);
  try {
    let user = {
      firstname: firstnameDOM.value,
      lastname: lastnameDOM.value,
      age: ageDOM.value,
      gender: genderDOM.value,
      feedback: feedbackDOM.value,
      interest: "",
    };

    let interestText = "";
    for (let i = 0; i < interestsDOM.length; i++) {
      interestText += interestsDOM[i].value;

      if (i < interestsDOM.length - 1) {
        interestText += ", ";
      }
    }
    user.interest = interestText;

    let validateResult = validateData(user);

    if (validateResult.length > 0) {
      throw {
        message: "Please make sure all fields are filled in correctly",
        errors: validateResult,
      };
    }

    console.log("user");
    console.log(user);
    console.log("validateResult");
    console.log(validateResult);

    if (mode == "CREATE") {
      let response = await axios.post(`${BASE_URL}/users`, user);
      console.log("response");
      console.log(response);

      messageDOM.innerText = "Add new user successful";
      messageDOM.className = "message success";
    } else if (mode == "EDIT") {
      let response = await axios.put(`${BASE_URL}/users/${selectedId}`, user);
      console.log("response");
      console.log(response);

      messageDOM.innerText = "Edit user successful";
      messageDOM.className = "message success";
    }
  } catch (error) {
    messageDOM.className = "message danger";
    messageDOM.innerText =
      mode == "CREATE" ? "Fail to add new user" : "Fail to edit user";

    console.log(error);

    if (error.response) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.data.errors);
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }

    if (error.errors) {
      let innerHtml = `<div>${error.message}</div>`;
      innerHtml += "<ul>";

      for (let i = 0; i < error.errors.length; i++) {
        innerHtml += `<li>${error.errors[i]}</li>`;
      }

      innerHtml += "</ul>";
      messageDOM.innerHTML = innerHtml;
    }
  }
};

// name="firstname"
// name="lastname"
// name="age"
// type="radio" name="gender"
// type="checkbox" name="interest"
// textarea name="feedback"
// button id="submit-button"
