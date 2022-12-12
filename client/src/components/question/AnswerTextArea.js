import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import { apiCreateDocument } from '../../api';

const AnswerTextArea = ({ questionId }) => {
  const user = useSelector(selectUser);
  const [answer, setAnswer] = useState({ answer: '', user_id: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setAnswer(prevValue => ({ ...prevValue, answer: value }));
  }


  const submitAnswer = async e => {
    e.preventDefault();
    try {
      const jsonData = await apiCreateDocument(answer, user, questionId);
      if (jsonData) navigate(`/questions/${questionId}`, { state: answer });
      setAnswer({ answer: '', user_id: '' });
    } catch (err) {
      console.error(err.message);
    }
  };

  const eraseInput = (e) => {
    e.preventDefault();
    setAnswer({ answer: '', user_id: '' });
  };


  return (
    <form className='mb-10' onSubmit={submitAnswer}>

      <label className="w-full" aria-label='Antwortfeld'>
        <textarea
          onChange={handleChange}
          value={answer.answer}
          name='text'
          className="bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
          rows='8'
          required
        >
        </textarea>
      </label>

      {/* Buttons */}
      <div className="flex flex-row space-x-10 mt-6">

        {/* Submit Answer button */}
        <button className="rounded-full bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-800" type="submit">
          Antwort posten
        </button>

        {/* Discard Answer button */}
        <button
          className="text-slate-500 px-2 py-1 hover:text-slate-700"
          onClick={(e) => eraseInput(e)}
        >
          Antwort verwerfen
        </button>

      </div>

    </form>
  );
};

export default AnswerTextArea;