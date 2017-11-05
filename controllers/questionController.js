const fs = require('fs');
const data =require('../data.json');

readDataFromFile = (filename) => {
    let questionList = fs.readFileSync(filename,"utf-8");
    return JSON.parse(questionList);
}

writeDataToFile = (filename,dataString) => {
  let data = JSON.stringify(dataString);
  fs.writeFileSync(filename,data,"utf-8");
}

getRandomQuestion = (filename) => {
  let questionList = readDataFromFile(filename);
  let randomId = Math.floor(Math.random()*questionList.length);
  let question = questionList[randomId];
  return question;
}

getQuestionById = (filename,id) => {
  let questionList = readDataFromFile(filename);
  let question = questionList[id];
  return question;
}

updateQuestion = (filename,id, answer) => {
  let questionList = readDataFromFile(filename);
  if (answer === "yes") {
    questionList[id].yes += 1;
  } else if (answer === "no") {
    questionList[id].no +=1;
  }
  writeDataToFile(filename,questionList);
}

addNewQuestion = (filename, question) => {
  let questionList = [];
  let newQuestion = {
    question:question,
    yes:0,
    no:0
  }
  questionList = readDataFromFile(filename);
  questionList.push(newQuestion);
  writeDataToFile(filename,questionList);
  let newQuestionId = questionList.length-1;
  return newQuestionId;
}

module.exports = {
  readDataFromFile,
  writeDataToFile,
  getQuestionById,
  getRandomQuestion,
  updateQuestion,
  addNewQuestion
}
