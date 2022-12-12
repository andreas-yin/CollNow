import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import NumberOfAnswers from '../home/NumberOfAnswers';
import Navbar from '../Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, changeSearchTerm } from '../../redux/features/searchSlice';
import { apiSearch } from '../../api';


const Results = () => {
    const searchTerm = useSelector(selectSearchTerm);
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const getQuestions = async () => {
        try {
            setIsLoading(true);
            const jsonData = await apiSearch(searchTerm);
            setIsLoading(false);
            setQuestions(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getQuestions();
    }, [searchTerm]);

    const handleTagClick = (tag) => {
        dispatch(changeSearchTerm(tag));
    };


    return (
        <Fragment>

            <Navbar />

            <main className={isLoading ? 'animate-pulse container mx-auto my-6' : 'container mx-auto my-6'}>

                {/* Top heading and Ask Question link */}
                <div className='max-w-6xl flex justify-between mx-4'>
                    <h1 className='font-bold text-3xl py-2'>
                        Suchergebnisse für &bdquo;{searchTerm}&ldquo;
                    </h1>
                    <Link to='/ask' className='relative top-4 rounded-full bg-indigo-600 text-white h-fit px-3 py-1 hover:bg-indigo-800 whitespace-nowrap'>
                        Frage stellen
                    </Link>
                </div>

                {/* Number of all questions, sort and filter */}
                <div className='mt-8 mb-4 mx-4 max-w-6xl md:flex md:justify-between'>

                    {/* Number of all questions */}
                    <h2 className='font-medium text-xl text-slate-500 mb-2'>
                        {questions.length} {questions.length === 1 ? 'Frage' : 'Fragen'}
                    </h2>

                    {/* Sort and filter */}
                    <ul className='flex space-x-4'>

                        {/* Sort options */}
                        <li>
                            <ul role='toolbar'>
                                <li className='inline-block px-2 py-1 border-y border-l border-slate-400 rounded-l text-slate-500 bg-slate-200'>
                                    <button>Neueste</button>
                                </li>
                                <li className='inline-block px-2 py-1 border-y border-x border-slate-400 text-slate-400 hover:bg-slate-100 hover:text-slate-500'>
                                    <button>Meiste Ansichten</button>
                                </li>
                                <li className='inline-block px-2 py-1 border-y border-r border-slate-400 text-slate-400 hover:bg-slate-100 hover:text-slate-500'>
                                    <button>Meiste Stimmen</button>
                                </li>
                                <li className='inline-block px-2 py-1 border-y border-x sm:border-l-0 sm:border-r border-slate-400 rounded-r text-slate-400 pl-2 hover:bg-slate-100 hover:text-slate-500'>
                                    <button>Unbeantwortet</button>
                                </li>
                            </ul>
                        </li>

                        {/* Filter */}
                        <li className='border border-slate-400 bg-indigo-100 text-indigo-400 hover:bg-indigo-300 hover:text-indigo-500 rounded h-fit px-2 py-1'>
                            <button>Filter</button>
                        </li>

                    </ul>

                </div>


                {/* Rendering all questions as cards */}
                {questions.sort((questionA, questionB) => questionB.question_id - questionA.question_id)
                    .map((question) => {
                        return (

                            <section key={question.question_id} className="border-t border-slate-200 max-w-6xl flex flex-col sm:flex-row sm:items-center mx-4">

                                {/* Question votes and answers */}
                                <ul className='my-2 flex sm:flex-col sm:w-24 flex-shrink-0'>
                                    <li className='mr-4 sm:mr-0 whitespace-nowrap'>{question.question_vote} {question.question_vote === 1 ? 'Stimme' : 'Stimmen'}</li>
                                    <li className='mr-4 sm:mr-0 whitespace-nowrap'>
                                        <NumberOfAnswers questionId={question.question_id} />
                                    </li>
                                </ul>


                                <div className='sm:ml-6 mb-2'>

                                    {/* Core info about the question: specialty, setting, age, sex and primary diagnoses of patient */}
                                    <ul className='flex flex-wrap gap-x-5 font-medium mb-2 sm:mt-4'>
                                        {question.specialty !== '' && <li>{question.specialty}</li>}
                                        {question.setting !== '' && <li>{question.setting}</li>}
                                        {question.age !== '' && question.sex !== '' && <li className="flex space-x-2">
                                            {question.age}J {question.sex}
                                        </li>}
                                        {question.primary_dx !== '' && <li>{question.primary_dx.substr(0, 50)}</li>}
                                    </ul>


                                    {/* Question title */}
                                    <h3 className='text-sky-400 hover:underline font-medium text-xl'>
                                        <Link to={`/questions/${question.question_id}`}>
                                            {question.title}
                                        </Link>
                                    </h3>

                                    {/* Question description (cut off after 190 characters) */}
                                    <p className='text-slate-500 my-2'>
                                        {question.description.length > 190 ? question.description.substr(0, 190) + '...' : question.description}
                                    </p>

                                    {/* Tags  */}
                                    {question.tags !== '' &&
                                        <ul className='flex flex-wrap gap-4 my-4 text-sm'>
                                            {question.tags.split(', ').map((tag, index) => {
                                                return (
                                                    <li key={index} className='bg-indigo-100 text-indigo-400 hover:bg-indigo-300 hover:text-indigo-500 rounded px-2 py-1'>
                                                        <Link to='/results' onClick={() => handleTagClick(tag)}>
                                                            {tag}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>}

                                    {/* Author and date of question */}
                                    <div className='text-sm my-3'>
                                        <p className='mb-1'>
                                            {question.academic_title !== '' && (question.academic_title + ' ')}
                                            {question.first_name} {question.last_name}
                                            {question.role !== '' && (', ' + question.role)}
                                            {question.user_specialty !== '' && (', ' + question.user_specialty)}
                                        </p>
                                        <p className='text-slate-500'>Gefragt am {' '}
                                            <time dateTime={`${question.asked_on}`}>
                                                {question.asked_on_string}
                                            </time>
                                        </p>
                                    </div>

                                </div>
                            </section>
                        );
                    })}

            </main>

        </Fragment>
    );
};

export default Results;