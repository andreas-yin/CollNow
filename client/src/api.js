//API endpoint
const endpoint = 'http://localhost:5000';


//Authentication requests (login or register)
export const apiAuth = async (userData, action) => {
    const body = { ...userData };
    const response = await fetch(`${endpoint}/auth/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await response.json();
};


//Get Content requests (read all questions, one question or all answers to one question)
export const apiGetContent = async (questionId, contentType) => {
    const url = `${endpoint}/questions` +
        (questionId ? `/${questionId}` : '') +
        (contentType ? `/${contentType}` : '');

    const response = await fetch(url);
    return await response.json();
};


//Update Vote requests (increment or decrement a question vote or an answer vote by 1)
export const apiChangeVote = async (interval, voteType, document, questionId) => {
    const body = { [voteType]: document[voteType] + interval };

    const url = `${endpoint}/questions` + (questionId ?
        `/${questionId}/answers/${document.answer_id}` :
        `/${document.question_id}`);

    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await response.json();
};



//Create Document requests (create a question or an answer)
export const apiCreateDocument = async (document, user, questionId) => {
    const body = { ...document, user_id: user.user_id }

    const url = `${endpoint}/questions` + (questionId ?
        `/${questionId}/answers` :
        ''
    );

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await response.json();
};


//Search requests (search all questions related to a search term)
export const apiSearch = async (searchTerm) => {
    const body = { searchTerm };
    const response = await fetch(`${endpoint}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    return await response.json();
};

