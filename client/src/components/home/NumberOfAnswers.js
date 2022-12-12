import { useState, useEffect, Fragment } from 'react';
import { apiGetContent } from '../../api';

const NumberOfAnswers = ({ questionId }) => {
    const [number, setNumber] = useState(0);

    const getNumberOfAnswers = async () => {
        try {
            const jsonData = await apiGetContent(questionId, 'answers');
            setNumber(jsonData.length);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getNumberOfAnswers();
    }, []);


    return (
        <Fragment>
            {number} {number === 1 ? 'Antwort' : 'Antworten'}
        </Fragment>
    );

};

export default NumberOfAnswers;



