import { useState, useEffect, Fragment } from 'react';

const NumberOfAnswers = ({ questionId }) => {
    const [number, setNumber] = useState(0);

    const getNumberOfAnswers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/questions/${questionId}/answers`);
            const jsonData = await response.json();

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



