import { useState, useEffect, Fragment } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Advice from "./Advice";
import QuestionVote from './QuestionVote';
import ListAnswers from './ListAnswers';
import AnswerTextArea from './AnswerTextArea';
import Navbar from '../Navbar';
import { useDispatch } from 'react-redux';
import { changeSearchTerm } from '../../redux/features/searchSlice';
import QuestionNotFound from './QuestionNotFound';


const Question = () => {
    const { questionId } = useParams();
    const [readyForRender, setReadyForRender] = useState(false);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState({});
    const [tags, setTags] = useState([]);
    const [answers, setAnswers] = useState([]);  
    const { state: newAnswer } = useLocation();
    const dispatch = useDispatch();

    const getQuestion = async () => {
        try {
            const response = await fetch(`http://localhost:5000/questions/${questionId}`);
            const jsonData = await response.json();
            const splitTags = jsonData.tags.split(', ');

            setQuestion(jsonData);
            setTags(splitTags);            
        } catch (err) {
            console.error(err.message);
            setError(err);
        }
    };

    const getAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/questions/${questionId}/answers`);
            const jsonData = await response.json();

            setAnswers(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getQuestion();
        getAnswers();
        setReadyForRender(true);
    }, [newAnswer]);


    const handleTagClick = (tag) => {
        dispatch(changeSearchTerm(tag));
    };


    //Update question vote within the state

    const updateQuestionVote = (newVote) => {
        setQuestion(prevValue => ({
            ...prevValue,
            question_vote: newVote
        }));
    };


    //Only render once useEffect() has been performed

    if (readyForRender) {

        if (error) return <QuestionNotFound />;

        else return (
            <Fragment>

                <Navbar />

                <main className='container mx-auto my-4'>
                    <article className='mx-4 max-w-6xl'>

                        <section className='mt-8'>

                            <div className='flex justify-between mb-4'>

                                {/* Specialty and setting of question */}
                                <ul className="flex space-x-5 font-medium text-slate-500">
                                    {question.specialty !== '' && <li>{question.specialty}</li>}
                                    {question.setting !== '' && <li>{question.setting}</li>}
                                </ul>

                                {/* Link to Ask Question from */}
                                <Link to='/ask' className='rounded-full h-fit bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-800'>
                                    Frage stellen
                                </Link>

                            </div>

                            {/* Question title */}
                            <h1 className='font-bold text-3xl mb-6'>{question.title}</h1>

                            {/* Author and date of question */}
                            <p className='text-sm mb-1'>
                                {question.academic_title !== '' && (question.academic_title + ' ')}
                                {question.first_name} {question.last_name}
                                {question.role !== '' && (', ' + question.role)}
                                {question.user_specialty !== '' && (', ' + question.user_specialty)}
                            </p>
                            <p className="text-sm text-slate-500">
                                Gefragt am {' '}
                                <time datetime={`${question.asked_on}`}>{question.asked_on_string}</time>
                            </p>



                            {/* Patient data box with the patient's age, sex, primary diagnoses and secondary diagnoses */}
                            <section className='bg-indigo-50 text-slate-500 max-w-2xl mt-8 mb-6 px-3 py-4 shadow-md rounded-lg border border-slate-200'>
                                <div className="flex flex-row space-x-4 font-semibold">
                                    <h3 className="">
                                        Patient:in
                                    </h3>

                                    <ul className="flex flex-row space-x-2">
                                        {/* Their age */}
                                        {question.age !== '' && <li>{question.age}J</li>}

                                        {/* Their sex */}
                                        <li>{question.sex}</li>
                                    </ul>
                                </div>


                                <dl className='mt-4'>
                                    {/* Their primary diagnoses */}
                                    {question.primary_dx !== '' && <Fragment>
                                        <dt className="font-semibold">
                                            Hauptdiagnosen:
                                        </dt>
                                        <dd>
                                            {question.primary_dx}
                                        </dd>
                                    </Fragment>
                                    }

                                    {/* Their secondary diagnoses */}
                                    {question.secondary_dx !== '' && <Fragment>
                                        <dt className="mt-2 font-semibold">
                                            Nebendiagnosen:
                                        </dt>
                                        <dd>
                                            {question.secondary_dx}
                                        </dd>
                                    </Fragment>
                                    }
                                </dl>

                            </section>


                            {/* Vote on question, description of question and tags */}
                            <div className="flex flex-row items-center space-x-7 border-b border-slate-200">

                                {/* Vote on question */}
                                <div className='text-center mb-2'>
                                    <QuestionVote
                                        question={question}
                                        updateState={updateQuestionVote}
                                    />
                                </div>


                                <div className='mb-4'>
                                    {/* Description of question */}
                                    <p className="whitespace-pre-wrap mb-6">
                                        {question.description}
                                    </p>

                                    {/* Tags */}
                                    {question.tags !== '' &&
                                        <ul className="flex flex-wrap gap-4 text-sm">
                                            {tags.map((tag, index) => {
                                                return (
                                                    <li key={index}
                                                        className="bg-indigo-100 text-indigo-400 hover:bg-indigo-300 hover:text-indigo-500 rounded px-2 py-1"
                                                    >
                                                        <Link to='/results' onClick={() => handleTagClick(tag)}>
                                                            {tag}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>}

                                </div>
                            </div>

                        </section>


                        <section className='mt-8'>
                            {/* Number of answers */}
                            <h2 className="font-semibold text-2xl mb-4">
                                {answers.length} {answers.length === 1 ? 'Antwort' : 'Antworten'}
                            </h2>


                            {/* Rendering all answers to the question */}
                            <ListAnswers answers={answers} questionId={question.question_id} />
                        </section>


                        <section>
                            <h2 className="font-medium text-xl text-slate-500 my-4">
                                Deine Antwort
                            </h2>
                            <Advice />

                            {/* Compose your answer */}
                            <AnswerTextArea questionId={question.question_id} />
                        </section>

                    </article>

                </main>

            </Fragment>
        );
    }
};

export default Question;