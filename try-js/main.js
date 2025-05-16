console.log("hrllow wolrd");

// prompt("your name:");

let name = "Gu";
let age = 99;
let height = 1.2222;
const roomNumber = 12323;

console.log("My age : ", age, "height: ", height);
age = 123;
console.log("Modify My age : ", age, "height: ", height);

console.log("Room num: ", roomNumber);

let n1 = 10;
let n2 = 5;
let n3 = n1 + n2;
let n4 = n3 % 4;
console.log("n3:", n3);
console.log("n4:", n4);
let n5 = n1 == n2;
console.log("n5", n5);
console.log("n5 >= n4", n5 >= n4);

if (n1 > n2) {
  console.log("Hello, condition met");
} else if (n1 < n2) {
  console.log("Hello, condition met2");
} else {
  console.log("Hello, condition not met T_T");
}

let number = 20;
if (number % 2 == 0) {
  console.log(`number ${number} is even number`);
}

let count = 0;
while (count < 10) {
  console.log("Hello while loop");

  count++;
}

for (let i = 0; i < 5; i++) {
  console.log("Hello for loop");
}

let numArray = [1, 4, 6, 7, 8, 12];
console.log("Hello array", numArray);
console.log("Hello array[1]", numArray[1]);
numArray.push(100);

console.log("Hello push array", numArray);

numArray.pop();
console.log("Hello pop array", numArray);

console.log("Hello array include 6?:", numArray.includes(6));

console.log(numArray.sort((a, b) => b - a));
console.log("length : " + numArray.length);

for (let i = 0; i < numArray.length; i++) {
  console.log(numArray[i]);
}

let students = [
  {
    age: 12,
    score: 81,
    name: "dededed",
  },
  {
    age: 15,
    score: 45,
    name: "qwqwwqeded",
  },
  {
    age: 20,
    score: 55,
    name: "bob",
  },
  {
    age: 10,
    score: 75,
    name: "vevevev",
  },
];

console.log(students);
console.log(students[0].score);

for (let i = 0; i < students.length; i++) {
  console.log(`students ${i} grade:`, calculateGrade(students[i].score));
}
function calculateGrade(score) {
  if (score > 80) {
    return "A";
  } else if (score > 60) {
    return "B";
  } else {
    return "C";
  }
}

const calGradeArrow = (score) => {
  if (score > 80) {
    return "A";
  } else if (score > 60) {
    return "B";
  } else {
    return "C";
  }
};

for (let i = 0; i < students.length; i++) {
  students[i].grade = calGradeArrow(students[i].score);
  console.log(`students ${i} grade arrow:`, students[i].grade);
}

const SUPER_CONSTANT_VALUE = 12;

let result = students.forEach((student, index, array) => {
  console.log(
    `students ${index} grade arrow foreach:`,
    calGradeArrow(student.score)
  );
  console.log(`students ${index} data:`, student);
});

console.log("return from foreach ", result);

let grades = students.map((student) => calGradeArrow(student.score));

console.log("grades array from map", grades);

let totalScore = students.reduce((total, student) => {
  return total + student.score;
}, 0);

console.log("Total score : " + totalScore);

let filteredStudentGradeC = students.filter(
  (student) => calGradeArrow(student.score) == "C"
);

console.log("filteredStudentGradeC", filteredStudentGradeC);

let findByStudentName = students.find((student) => student.name == "bob");
console.log("findByStudentName", findByStudentName);

let findIndexByStudentName = students.findIndex(
  (student) => student.name == "bob"
);
console.log("findIndexByStudentName", findIndexByStudentName);
