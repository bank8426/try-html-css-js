console.log("helllooooo");

let firstnameDOM = document.querySelector("input[name=firstname]");
let lastnameDOM = document.querySelector("input[name=lastname]");
let ageDOM = document.querySelector("input[name=age]");
let feedbackDOM = document.querySelector("textarea[name=feedback]");
// let submit

function submitForm() {
  let genderDOM = document.querySelector("input[name=gender]:checked");
  let interestsDOM = document.querySelectorAll("input[name=interest]:checked");

  console.log("genderDOM");
  console.log(genderDOM);
  console.log("interestsDOM");
  console.log(interestsDOM);

  let result = {
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
  result.interest = interestText;

  console.log("interestsDOM");
  console.log(interestsDOM);

  console.log(result);
}

// name="firstname"
// name="lastname"
// name="age"
// type="radio" name="gender"
// type="checkbox" name="interest"
// textarea name="feedback"
// button id="submit-button"
