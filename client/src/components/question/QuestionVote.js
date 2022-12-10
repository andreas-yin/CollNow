import { Fragment } from 'react';

const QuestionVote = ({ question, updateState }) => {

    const increase = async (e) => {
        e.preventDefault();
        try {
            const body = { question_vote: question.question_vote + 1 };
            const response = await fetch(`http://localhost:5000/questions/${question.question_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            const updatedVote = jsonData.question_vote;

            updateState(updatedVote);
        } catch (err) {
            console.error(err.message);
        }
    };

    const decrease = async (e) => {
        e.preventDefault();
        try {
            const body = { question_vote: question.question_vote - 1 };
            const response = await fetch(`http://localhost:5000/questions/${question.question_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            const updatedVote = jsonData.question_vote;

            updateState(updatedVote);
        } catch (err) {
            console.error(err.message);
        }
    };



    return (
        <Fragment>
            {/* Thumbs up button */}
            <button
                onClick={e => increase(e)}
                className='text-slate-400 hover:text-sky-400'
                aria-label='Frage positiv bewerten und die Stimmenzahl um +1 erhöhen'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            </button>

            {/* Number of question votes */}
            <p aria-label='Stimmenzahl zur Frage'>
                <strong className='text-3xl text-slate-500 font-semibold'>
                    {question.question_vote}
                </strong>
            </p>

            {/* Thumbs down button */}
            <button
                onClick={e => decrease(e)}
                className='text-slate-400 hover:text-sky-400'
                aria-label='Frage negativ bewerten und die Stimmenzahl um -1 erniedrigen'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
            </button>
        </Fragment>
    );
};

export default QuestionVote;