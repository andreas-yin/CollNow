import { useState } from 'react';

const Answer = ({ answer }) => {
    const [answerVote, setAnswerVote] = useState(0);

    return (
        <div className="max-w-6xl mx-4 my-6 flex flex-row space-x-7 border-b border-slate-200">

            {/* Vote on the Answer section */}
            <div className="text-slate-400 text-center mb-2">

                {/* Thumbs up button */}
                <button onClick={() => setAnswerVote(answerVote + 1)} className="hover:text-sky-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                    </svg>
                </button>

                {/* Number of votes */}
                <div>
                    <span className="text-3xl text-slate-500 font-semibold">
                        {answerVote}
                    </span>
                </div>

                {/* Thumbs down button */}
                <button onClick={() => setAnswerVote(answerVote - 1)} className="hover:text-sky-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>

            </div>

            {/* Answer and author & date of answer */}
            <div>

                {/* Answer */}
                <div className="whitespace-pre-wrap">{answer.text}</div>

                {/* Author and date of answer */}
                <div className="text-sm my-1 flex space-x-4">
                    <div>Dr. Simon Meier</div>
                    <div className="text-slate-500">Geantwortet am <time>{answer.date}</time></div>
                </div>

            </div>


        </div>
    );
}

export default Answer;