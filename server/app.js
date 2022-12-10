const express = require('express');
const cors = require('cors');


const makeApp = (database, authMiddleware) => {
    const app = express();

    //Middleware
    app.use(cors());
    app.use(express.json());

    //ROUTES//

    //Create a question
    app.post('/questions', async (req, res) => {
        try {
            const { title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, user_id } = req.body;
            const newQuestion = await database.createQuestion(title, specialty, setting, age, sex, primary_dx, secondary_dx, description, tags, user_id);
            res.json(newQuestion);
        } catch (err) {
            console.error(err.message);
            res.sendStatus(400);
        }
    });

    //Read all questions
    app.get('/questions', async (req, res) => {
        try {
            const allQuestions = await database.getAllQuestions();
            res.json(allQuestions);
        } catch (err) {
            console.error(err.message);
        }
    });

    //Read a question
    app.get('/questions/:questionId', async (req, res) => {
        try {
            const { questionId } = req.params;
            const question = await database.getQuestion(questionId);
            res.json(question);
        } catch (err) {
            console.error(err.message);
            res.sendStatus(404);
        }
    });

    //Update a question with a new question vote
    app.put('/questions/:questionId', async (req, res) => {
        try {
            const { questionId } = req.params;
            const { question_vote } = req.body;
            const updatedQuestion = await database.updateQuestionVote(question_vote, questionId);
            res.json(updatedQuestion);
        } catch (err) {
            console.error(err.message);
        }
    });


    //Read all the answers to one question
    app.get('/questions/:questionId/answers', async (req, res) => {
        try {
            const { questionId } = req.params;
            const allAnswersToQuestion = await database.getAllAnswersToQuestion(questionId);
            res.json(allAnswersToQuestion);
        } catch (err) {
            console.error(err.message);
        }
    });

    //Update an answer with a new answer vote
    app.put('/questions/:questionId/answers/:answerId', async (req, res) => {
        try {
            const { questionId, answerId } = req.params;
            const { answer_vote } = req.body;
            const updatedAnswer = await database.updateAnswerVote(answer_vote, questionId, answerId);
            res.json(updatedAnswer);
        } catch (err) {
            console.error(err.message);
        }
    });

    //Create an answer
    app.post('/questions/:questionId/answers', async (req, res) => {
        try {
            const { questionId } = req.params;
            const { answer, user_id } = req.body;
            const newAnswer = await database.createAnswer(questionId, answer, user_id);
            res.json(newAnswer);
        } catch (err) {
            console.error(err.message);
            res.sendStatus(400);
        }
    });

    //Search questions and get search results
    app.post('/search', async (req, res) => {
        try {
            const { searchTerm } = req.body;
            const results = await database.searchQuestions(searchTerm);
            res.json(results);
        } catch (err) {
            console.error(err.message);
        }
    });


    //AUTHENTICATION (LOCAL STRATEGY)//
  
    //Register
    app.post('/auth/register', authMiddleware.authenticate('local-signup', { session: false }),
        (req, res, next) => {
            res.json(req.user);
        }
    );

    //Login
    app.post("/auth/login", authMiddleware.authenticate("local-login", { session: false }),
        (req, res, next) => {
            res.json(req.user);
        }
    );
    
    return app;

};

module.exports = makeApp;

