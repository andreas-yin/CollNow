const request = require('supertest');
const makeApp = require('./app');

//Jest mock functions 
const createQuestion = jest.fn();
const getAllQuestions = jest.fn();
const getQuestion = jest.fn();
const updateQuestionVote = jest.fn();
const getAllAnswersToQuestion = jest.fn();
const updateAnswerVote = jest.fn();
const createAnswer = jest.fn();
const authenticate = jest.fn(() => () => ({ user_id: 1, email: 'test@test.com' }))

const app = makeApp({
    createQuestion,
    getAllQuestions,
    getQuestion,
    updateQuestionVote,
    getAllAnswersToQuestion,
    updateAnswerVote,
    createAnswer
}, { authenticate });

//Reset state of Jest mock functions before each test
beforeEach(() => {
    createQuestion.mockReset();
    getAllQuestions.mockReset();
    getQuestion.mockReset();
    updateQuestionVote.mockReset();
    getAllAnswersToQuestion.mockReset();
    updateAnswerVote.mockReset();
    createAnswer.mockReset();
    authenticate.mockReset();
});

//Mock data related to questions
const questionsBodyData = [
    { title: 'Title1', specialty: 'Innere Medizin', setting: 'Station', age: '77', sex: '♀', primary_dx: 'Hauptdiagnose1', secondary_dx: 'Nebendiagnose1', description: 'Beschreibung1', tags: 'Tag1, Tag2, Tag3, Tag4, Tag5' },
    { title: 'Title2', specialty: 'Kardiologie', setting: 'ZNA', age: '56', sex: '♂', primary_dx: 'Hauptdiagnose2', secondary_dx: 'Nebendiagnose2', description: 'Beschreibung2', tags: 'TagA, TagB, TagC' },
    { title: 'Title3', specialty: '', setting: '', age: '', sex: '', primary_dx: '', secondary_dx: '', description: 'Beschreibung3', tags: '' }
];
const question_vote = 0;
const asked_on = '2022-11-27 13:26:48.253915';
const asked_on_string = '27.11.2022 um 13:26 Uhr';
const questions = [
    { question_id: 1, title: 'Title1', specialty: 'Innere Medizin', setting: 'Station', age: '77', sex: '♀', primary_dx: 'Hauptdiagnose1', secondary_dx: 'Nebendiagnose1', description: 'Beschreibung1', tags: 'Tag1, Tag2, Tag3, Tag4, Tag5', question_vote, asked_on, asked_on_string },
    { question_id: 2, title: 'Title2', specialty: 'Kardiologie', setting: 'ZNA', age: '56', sex: '♂', primary_dx: 'Hauptdiagnose2', secondary_dx: 'Nebendiagnose2', description: 'Beschreibung2', tags: 'TagA, TagB, TagC', question_vote, asked_on, asked_on_string },
    { question_id: 3, title: 'Title3', specialty: '', setting: '', age: '', sex: '', primary_dx: '', secondary_dx: '', description: 'Beschreibung3', tags: '', question_vote, asked_on, asked_on_string }
];
const answersBodyData = [
    { answer: 'Answer1' },
    { answer: 'Answer2' },
    { answer: 'Answer3' }
];

//Mock data related to answers
let question_id; //will be assigned a value in the tests
const answer_vote = 0;
const answered_on = '2022-11-28 11:09:37.658624';
const answered_on_string = '28.11.2022 um 11:09 Uhr';
const answers = [
    { answer_id: 1, question_id, answer: 'Answer1', answer_vote, answered_on, answered_on_string },
    { answer_id: 2, question_id, answer: 'Answer2', answer_vote, answered_on, answered_on_string },
    { answer_id: 3, question_id, answer: 'Answer3', answer_vote, answered_on, answered_on_string }
];


//Tests
describe('POST /questions', () => {
    it('should save the question to the database', async () => {                
        for (const body of questionsBodyData) {
            createQuestion.mockReset();
            await request(app).post('/questions').send(body);
            expect(createQuestion.mock.calls.length).toBe(1);
            expect(createQuestion.mock.calls[0][0]).toBe(body.title);
            expect(createQuestion.mock.calls[0][1]).toBe(body.specialty);
            expect(createQuestion.mock.calls[0][2]).toBe(body.setting);
            expect(createQuestion.mock.calls[0][3]).toBe(body.age);
            expect(createQuestion.mock.calls[0][4]).toBe(body.sex);
            expect(createQuestion.mock.calls[0][5]).toBe(body.primary_dx);
            expect(createQuestion.mock.calls[0][6]).toBe(body.secondary_dx);
            expect(createQuestion.mock.calls[0][7]).toBe(body.description);
            expect(createQuestion.mock.calls[0][8]).toBe(body.tags);
        }
    });

    it('should respond with a JSON object containing the question', async () => {
        for (let i = 0; i < 3; i++) {
            createQuestion.mockReset();
            createQuestion.mockResolvedValue(questions[i]);
            const response = await request(app).post('/questions').send(questionsBodyData[i]);
            expect(response.body).toEqual(questions[i]);
        }
    });
});


describe('GET /questions', () => {
    it('should retrieve all questions from the database', async () => {
        await request(app).get('/questions');
        expect(getAllQuestions.mock.calls.length).toBe(1);
    });

    it('should respond with a JSON object containing all questions', async () => {
        getAllQuestions.mockResolvedValue(questions);
        const response = await request(app).get('/questions');
        expect(response.body).toEqual(questions);
    });
});

describe('GET /questions/:questionId', () => {
    it('should retrieve the question from the database', async () => {
        const questionIds = [1, 2, 3];

        for (const questionId of questionIds) {
            getQuestion.mockReset();
            await request(app).get(`/questions/${questionId}`);
            expect(getQuestion.mock.calls.length).toBe(1);
            expect(getQuestion.mock.calls[0][0]).toBe(questionId.toString());
        }
    });

    it('should return a JSON object containing the question', async () => {
        for (const question of questions) {
            getQuestion.mockReset();
            getQuestion.mockResolvedValue(question);
            const response = await request(app).get(`/questions/${question.question_id}`);
            expect(response.body).toEqual(question);
        }
    });
});

describe('PUT /questions/:questionId', () => {
    it('should update the question vote in the database', async () => {
        const questionIds = [1, 2, 3];
        const bodyData = [{ question_vote: 7 }, { question_vote: 8 }, { question_vote: 9 }];

        for (let i = 0; i < 3; i++) {
            updateQuestionVote.mockReset();
            await request(app).put(`/questions/${questionIds[i]}`).send(bodyData[i]);
            expect(updateQuestionVote.mock.calls.length).toBe(1);
            expect(updateQuestionVote.mock.calls[0][0]).toBe(bodyData[i].question_vote);
            expect(updateQuestionVote.mock.calls[0][1]).toBe(questionIds[i].toString());
        }
    });

    it('should return a JSON object containing the updated question', async () => {
        const bodyData = [{ question_vote: 7 }, { question_vote: 8 }, { question_vote: 9 }];

        for (let i = 0; i < 3; i++) {
            updateQuestionVote.mockReset();
            updateQuestionVote.mockResolvedValue({ ...questions[i], ...bodyData[i] });
            const response = await request(app).put(`/questions/${questions[i].question_id}`).send(bodyData[i]);
            expect(response.body).toEqual({ ...questions[i], ...bodyData[i] });
        }
    });
});

describe('GET /questions/:questionId/answers', () => {
    it('should retrieve all the answers to the question from the database', async () => {
        const questionIds = [1, 2, 3];

        for (const questionId of questionIds) {
            getAllAnswersToQuestion.mockReset();
            await request(app).get(`/questions/${questionId}/answers`);
            expect(getAllAnswersToQuestion.mock.calls.length).toBe(1);
            expect(getAllAnswersToQuestion.mock.calls[0][0]).toBe(questionId.toString());
        }
    });

    it('should return a JSON object containing all the answers to the question', async () => {
        const questionIds = [1, 2, 3];

        for (const questionId of questionIds) {
            getAllAnswersToQuestion.mockReset();
            question_id = questionId;
            getAllAnswersToQuestion.mockResolvedValue(answers);
            const response = await request(app).get(`/questions/${questionId}/answers`);
            expect(response.body).toEqual(answers);
        }
    });
});

describe('PUT /questions/:questionId/answers/:answerId', () => {
    it('should update the answer vote in the database', async () => {
        const questionIds = [1, 2, 3];
        const bodyData = [{ answer_vote: 5 }, { answer_vote: 6 }, { answer_vote: 7 }];

        for (const questionId of questionIds) {            
            question_id = questionId;
            
            for (let i = 0; i < 3; i++) {
                updateAnswerVote.mockReset();
                await request(app).put(`/questions/${questionId}/answers/${answers[i].answer_id}`).send(bodyData[i]);
                expect(updateAnswerVote.mock.calls.length).toBe(1);
                expect(updateAnswerVote.mock.calls[0][0]).toBe(bodyData[i].answer_vote);
                expect(updateAnswerVote.mock.calls[0][1]).toBe(questionId.toString());
                expect(updateAnswerVote.mock.calls[0][2]).toBe(answers[i].answer_id.toString());
            }
        }
    });

    it('should return a JSON object containing the updated answer', async () => {        
        const questionIds = [1, 2, 3];
        const bodyData = [{ answer_vote: 5 }, { answer_vote: 6 }, { answer_vote: 7 }];

        for (const questionId of questionIds) {
            question_id = questionId;

            for (let i = 0; i < 3; i++) {
                updateAnswerVote.mockReset();
                updateAnswerVote.mockResolvedValue({ ...answers[i], ...bodyData[i] });
                const response = await request(app).put(`/questions/${questionId}/answers/${answers[i].answer_id}`).send(bodyData[i]);
                expect(response.body).toEqual({ ...answers[i], ...bodyData[i] });
            }   
        }              
    });
});

describe('POST /questions/:questionId/answers', () => {
    it('should save the answer to the database', async () => {
        const questionIds = [1, 2, 3];

        for (const questionId of questionIds) {
            question_id = questionId;

            for (const body of answersBodyData) {
                createAnswer.mockReset();
                await request(app).post(`/questions/${questionId}/answers`).send(body);
                expect(createAnswer.mock.calls.length).toBe(1);
                expect(createAnswer.mock.calls[0][0]).toBe(questionId.toString());
                expect(createAnswer.mock.calls[0][1]).toBe(body.answer);
            }
        }        
    });

    it('should return a JSON object containing the answer', async () => {
        const questionIds = [1, 2, 3];

        for (const questionId of questionIds) {
            question_id = questionId;

            for (let i = 0; i < 3; i++) {
                createAnswer.mockReset();
                createAnswer.mockResolvedValue(answers[i]);
                const response = await request(app).post(`/questions/${questionId}/answers`).send(answersBodyData[i]);
                expect(response.body).toEqual(answers[i]);
            }
        }        
    });
});