import { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Intro from "./Intro";
import SectionHeader from "./SectionHeader";
import Navbar from '../Navbar';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/features/userSlice';
import { apiCreateDocument } from '../../api';

const Ask = () => {
  const user = useSelector(selectUser);

  const [question, setQuestion] = useState({
    title: '',
    specialty: '',
    setting: '',
    age: '',
    sex: '',
    primary_dx: '',
    secondary_dx: '',
    description: '',
    tags: ''
  });

  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setQuestion((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitQuestion = async e => {
    e.preventDefault();
    try {     
      const jsonData = await apiCreateDocument(question, user);
      if (jsonData) navigate('/questions');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>

      <Navbar />

      <main className="container my-4 text-center">
        <article className="inline-block text-left max-w-3xl mx-4 my-6">

          {/* Heading and intro on how to write a good question */}
          <h1 className="font-bold text-4xl py-2">Stelle eine Frage</h1>
          <Intro />


          {/* Form to ask a question */}
          <form onSubmit={submitQuestion}>


            {/* Section with question title */}
            <section className="my-5 px-3 py-4 flex flex-col space-y-4 items-start overflow-hidden border border-slate-200 shadow-md rounded-lg">
              <SectionHeader
                title='Titel'
                text='Formuliere deine Frage präzise. Stell dir vor, du rufst deinen Oberarzt an und stellst ihm dein Problem in einem Satz vor.'
              />
              <label htmlFor='title' className='hidden'>
                Titel der Frage
              </label>
              <input
                id='title'
                onChange={handleChange}
                value={question.title}
                name='title'
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                placeholder='z. B. Auf welches orale Antibiotikum kann ich Pip/Taz bei einer Pneumonie umstellen?'
                type="text"
                required
              />

            </section>


            {/* Section with patient data */}
            <section className="my-5 px-3 py-4 flex flex-col space-y-4 items-start overflow-hidden border border-slate-200 shadow-md rounded-lg">
              <SectionHeader
                title='Patientendaten'
                text='Füge für deine Frage relevante Daten deines Patienten ein.'
              />
              <button className="rounded flex bg-slate-500 text-white px-2 py-1 hover:bg-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                Aus KIS importieren
              </button>


              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Specialty field */}
                <label className="text-sm font-medium text-slate-700">
                  Fachrichtung
                  <select
                    onChange={handleChange}
                    name='specialty'
                    className="block bg-white w-full border border-slate-300 mt-1 rounded py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                    defaultValue='Bitte auswählen'
                  >
                    <option value='Bitte auswählen' disabled>Bitte auswählen</option>
                    {['Innere Medizin', 'Kardiologie', 'Pneumologie', 'Gastroenterologie', 'Endokrinologie', 'Neurologie']
                      .map((option, index) => <option key={index} value={option}>{option}</option>)
                    }
                  </select>
                </label>

                {/* Setting field */}
                <label className="text-sm font-medium text-slate-700">
                  Setting
                  <select
                    onChange={handleChange}
                    name='setting'
                    className="block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                    defaultValue='Bitte auswählen'
                  >
                    <option value='Bitte auswählen' disabled>Bitte auswählen</option>
                    {['Station', 'ZNA', 'ICU/IMC', 'Funktionsabteilung', 'Notarzt']
                      .map((option, index) => <option key={index} value={option}>{option}</option>)
                    }
                  </select>
                </label>

                {/* Age field */}
                <label className="text-sm font-medium text-slate-700">
                  Alter
                  <input
                    onChange={handleChange}
                    value={question.age}
                    name='age'
                    className="placeholder:italic placeholder:text-slate-400 block bg-white border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                    placeholder='Alter in Jahren'
                    type='number'
                    step='1' />
                </label>

                {/* Sex field */}
                <label className="text-sm font-medium text-slate-700">
                  Geschlecht
                  <select
                    onChange={handleChange}
                    name='sex'
                    className="block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                    defaultValue='Bitte auswählen'
                  >
                    <option value='Bitte auswählen' disabled>Bitte auswählen</option>
                    {['♀', '♂', 'divers']
                      .map((option, index) => <option key={index} value={option}>{option}</option>)
                    }
                  </select>
                </label>

              </div>


              {/* Primary diagnoses field */}
              <label className="text-sm font-medium text-slate-700 w-full">
                Hauptdiagnosen
                <input
                  onChange={handleChange}
                  value={question.primary_dx}
                  name='primary_dx'
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                  placeholder='z. B. Linksführende kardiale Dekompensation NYHA IV'
                  type="text" />
              </label>

              {/* Secondary diagnoses field */}
              <label className='text-sm font-medium text-slate-700 w-full'>
                <span className="block text-sm font-medium text-slate-700">Nebendiagnosen</span>
                <input
                  onChange={handleChange}
                  value={question.secondary_dx}
                  name='secondary_dx'
                  className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm text-base text-black font-normal focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                  placeholder='z. B. Diabetes mellitus Typ 2'
                  type="text" />
              </label>

            </section>



            {/* Section with description of question */}
            <section className="my-5 px-3 py-4 flex flex-col space-y-4 items-startoverflow-hidden border border-slate-200 shadow-md rounded-lg">
              <SectionHeader
                title='Beschreibung deines Problems'
                text='Erläutere dein Problem. Gib relevante Details mit an, z. B. zur bisherigen Diagnostik und Therapie. Stell dir vor, der Oberarzt sitzt vor dir: Nach welchen Details wird er dich fragen, um dir weiterhelfen zu können?'
              />

              {/* Description field */}
              <label htmlFor='description' className='hidden'>
                Beschreibung der Frage
              </label>
              <textarea
                id='description'
                onChange={handleChange}
                value={question.description}
                name='description'
                className="bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                rows='10'
                required
              >
              </textarea>


            </section>


            {/* Section with tags */}
            <section className="my-5 px-3 py-4 flex flex-col space-y-4 items-start overflow-hidden border border-slate-200 shadow-md rounded-lg">
              <SectionHeader
                title='Tags'
                text='Füge bis zu 5 Tags hinzu, die den Inhalt deiner Frage beschreiben. Tags können sein: Diagnosen, Befunde, Symptome, Laborwerte, Medikamente, Untersuchungsverfahren, Therapieverfahren etc. Trenne deine Tags mit Komma und Leerzeichen.'
              />

              {/* Tags field */}
              <label htmlFor='tags' className="hidden">
                Tags
              </label>
              <input
                id='tags'
                onChange={handleChange}
                value={question.tags}
                name='tags'
                className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded mt-1 py-2 pl-3 pr-3 shadow-sm focus:outline-none focus:border-indigo-600 focus:ring-indigo-600 focus:ring-1 sm:text-sm"
                placeholder='z. B. Empagliflozin, SGLT2-Inhibitoren, Herzinsuffizienz'
                type="text" />
              {question.tags !== '' && <Fragment>
                <h3 className="text-lg text-slate-500 font-medium pt-2">Deine Tags:</h3>
                <ul className='flex flex-wrap gap-4 my-4 text-sm'>
                  {question.tags.split(', ').map((tag, index) => {
                    return (
                      <li key={index} className='bg-indigo-100 text-indigo-400 rounded px-2 py-1'>
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </Fragment>}

            </section>


            {/* Buttons */}
            <div className="flex flex-row space-x-10">

              {/* Submit button */}
              <button className="rounded-full bg-indigo-600 text-white px-3 py-1 hover:bg-indigo-800" type="submit">
                Frage posten
              </button>

              {/* Discard button */}
              <Link to="/questions" className='text-slate-500 px-2 py-1 hover:text-slate-700'>
                Frage verwerfen
              </Link>

            </div>


            {/* End of form */}
          </form>

        </article>
      </main>

    </Fragment>
  );
};

export default Ask;