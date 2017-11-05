const express = require('express');
const questionRouter = express.Router();
const  questionController = require('../controllers/questionController');
const filename = "data.json";

questionRouter.get('/', (req, res) => {
  let question = questionController.getRandomQuestion(filename);
    res.render(
      "question",
      {
        question: question.question,
        yes: question.yes,
        no: question.no
      }
    );
  // let questionList = questionController.readDataFromFile(filename);
  // let id = Math.floor(Math.random()*questionList.length);
  // res.redirect(`/question/${id}`);
});

questionRouter.get('/:id', (req, res) => {
  let question = questionController.getQuestionById(filename,req.params.id);
  // res.render(
  //   "question",
  //   {
  //     question: question.question,
  //     yes: question.yes,
  //     no:question.no
  //   }
  // );
  console.log(question);
  if (question){
    res.render("answer",question);
  } else {
    res.redirect("/");
  }
});

questionRouter.post('/', (req, res) => {
  console.log("Add new question");
  let id = questionController.addNewQuestion(filename,req.body.question);
  res.redirect(`/question/${id}`);
});


questionRouter.post('/:id',(req,res)=>{
  let id = req.params.id;
  console.log("Update question");
  console.log("req.body", req.body);
  if(req.body.yes){
    questionController.updateQuestion(filename,id,"yes");
  } else if (req.body.no) {
    questionController.updateQuestion(filename,id,"no");
  }

  res.redirect(`/question/${id}`);
});

// questionRouter.post('/')

module.exports = questionRouter;
