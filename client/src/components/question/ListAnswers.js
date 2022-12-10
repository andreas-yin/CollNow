import { Fragment } from 'react';

import AnswerVote from './AnswerVote';

const ListAnswers = ({ answers, questionId }) => {

    return (
        <Fragment>

            {answers.sort((answerA, answerB) => answerA.answer_id - answerB.answer_id)
                .map((answer) => (
                    <div key={answer.answer_id} className="my-6 flex flex-row items-center space-x-7 border-b border-slate-200">

                        {/* Vote on the answer */}
                        <div className="text-center mb-2">
                            <AnswerVote answer={answer} questionId={questionId} />
                        </div>

                        <div className='mb-5'>

                            {/* Answer */}
                            <p className="whitespace-pre-wrap">
                                {answer.answer}
                            </p>

                            {/* Author and date of answer */}
                            <p className='text-sm mt-3 mb-1'>
                                {answer.academic_title !== '' && (answer.academic_title + ' ')}
                                {answer.first_name} {answer.last_name}
                                {answer.role !== '' && (', ' + answer.role)}
                                {answer.user_specialty !== '' && (', ' + answer.user_specialty)}
                            </p>
                            <p className="text-sm text-slate-500">
                                Geantwortet am {' '}
                                <time dateTime={`${answer.answered_on}`}>{answer.answered_on_string}</time>
                            </p>

                        </div>

                    </div>
                ))}

        </Fragment>
    );

};

export default ListAnswers;