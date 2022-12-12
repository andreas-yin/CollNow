import { useState, Fragment } from 'react';
import { apiChangeVote } from '../../api';

const AnswerVote = ({ answer, questionId }) => {
    const [answer_vote, setAnswer_vote] = useState(answer.answer_vote);

    const increaseAnswerVote = async (e) => {
        e.preventDefault();
        try {
            const jsonData = await apiChangeVote(1, 'answer_vote', answer, questionId);
            const updatedVote = jsonData.answer_vote;
            setAnswer_vote(updatedVote);
        } catch (err) {
            console.error(err.message);
        }
    };

    const decreaseAnswerVote = async (e) => {
        e.preventDefault();
        try {
            const jsonData = await apiChangeVote(-1, 'answer_vote', answer, questionId);
            const updatedVote = jsonData.answer_vote;
            setAnswer_vote(updatedVote);
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            {/* Thumbs up button */}
            <button
                onClick={(e) => increaseAnswerVote(e)}
                className="text-slate-400 hover:text-sky-400"
                aria-label='Antwort positiv bewerten und die Stimmenzahl um +1 erhöhen'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
            </button>

            {/* Number of votes */}
            <p aria-label='Stimmenzahl zur Antwort'>
                <strong className="text-3xl text-slate-500 font-semibold">
                    {answer_vote}
                </strong>
            </p>

            {/* Thumbs down button */}
            <button
                onClick={(e) => decreaseAnswerVote(e)}
                className="text-slate-400 hover:text-sky-400"
                aria-label='Antwort negativ bewerten und die Stimmenzahl um -1 erniedrigen'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                </svg>
            </button>
        </Fragment>
    );
};

export default AnswerVote;