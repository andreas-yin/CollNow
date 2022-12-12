import { useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { signin, signout } from '../../redux/features/userSlice';
import { apiAuth } from '../../api';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [register, setRegister] = useState({
        email: '',
        password: '',
        salutation: '',
        academic_title: '',
        first_name: '',
        last_name: '',
        role: '',
        user_specialty: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setRegister(prevValue => ({ ...prevValue, [name]: value }));
    };

    const submitRegister = async e => {
        e.preventDefault();
        try {            
            const user = await apiAuth(register, 'register');
            dispatch(signin(user)); //save user in Redux state object
            if (user) navigate('/questions');

        } catch (err) {
            console.log(err.message);
            dispatch(signout());
            alert('Es existiert bereits ein Konto unter dieser E-Mail-Adresse - bitte melden Sie sich an.');
        }
    };


    return (
        <Fragment>
            <button
                className='px-4 py-3 bg-teal-500 hover:bg-teal-700 text-white rounded-lg font-semibold text-lg'
                onClick={() => setOpen(true)}            >
                Registrieren
            </button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box>
                    <section className='bg-white border border-slate-200 rounded-lg px-4 py-4 shadow-md w-96'>
                        <div className='flex flex-row justify-between'>
                            <h2 className='mt-2 mb-6 text-xl font-semibold'>Registriere dich</h2>
                            <svg onClick={() => setOpen(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 hover:text-slate-500">
                                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                            </svg>
                        </div>
                        <form className='flex flex-col space-y-4' onSubmit={submitRegister}>
                            <label htmlFor='register_email' className='hidden'>
                                E-Mail-Adresse
                            </label>
                            <input
                                id='register_email'
                                type='email'
                                placeholder='E-Mail-Adresse'
                                className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                name='email'
                                value={register.email}
                                onChange={handleChange}
                                required                                
                                data-testid='email'
                            />
                            <label htmlFor='register_password' className='hidden'>
                                Passwort
                            </label>
                            <input
                                id='register_password'
                                type='password'
                                placeholder='Passwort'
                                className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                name='password'
                                value={register.password}
                                onChange={handleChange}
                                required
                                data-testid='password'
                            />
                            <div className='grid grid-cols-2 gap-4'>
                                <label htmlFor='salutation' className='hidden'>
                                    Anrede
                                </label>
                                <select
                                    id='salutation'
                                    className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                    name='salutation'
                                    value={register.salutation}
                                    onChange={handleChange}
                                    defaultValue=''
                                >
                                    <option value='' disabled>Anrede</option>
                                    <option value='Frau'>Frau</option>
                                    <option value='Mann'>Herr</option>
                                </select>
                                <label htmlFor='academic_title' className='hidden'>
                                    Anrede
                                </label>
                                <select
                                    id='academic_title'
                                    className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                    name='academic_title'
                                    value={register.academic_title}
                                    onChange={handleChange}
                                    defaultValue=''
                                >
                                    <option value='' disabled>Titel</option>
                                    <option value='Dr.'>Dr.</option>
                                    <option value='PD Dr.'>PD Dr.</option>
                                    <option value='Prof. Dr.'>Prof. Dr.</option>
                                    <option value='Prof. Dr. Dr.'>Prof. Dr. Dr.</option>
                                </select>
                            </div>
                            <label htmlFor='first_name' className='hidden'>
                                Vorname
                            </label>
                            <input
                                id='first_name'
                                type="text"
                                placeholder='Vorname'
                                className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                name='first_name'
                                value={register.first_name}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor='last_name' className='hidden'>
                                Nachname
                            </label>
                            <input
                                id='last_name'
                                type="text"
                                placeholder='Nachname'
                                className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                name='last_name'
                                value={register.last_name}
                                onChange={handleChange}
                                required
                            />
                            <div className='grid grid-cols-2 gap-4'>
                                <label htmlFor='role' className='hidden'>
                                    Rolle
                                </label>
                                <select
                                    id='role'
                                    className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                    name='role'
                                    value={register.role}
                                    onChange={handleChange}
                                    defaultValue=''
                                >
                                    <option value='' disabled>Rolle</option>
                                    <option value='Assistenzärzt:in'>Assistenzärzt:in</option>
                                    <option value='Fachärzt:in'>Fachärzt:in</option>
                                    <option value='Oberärzt:in'>Oberärzt:in</option>
                                    <option value='Chefärzt:in'>Chefärzt:in</option>
                                </select>
                                <label htmlFor='user_specialty' className='hidden'>
                                    Fachrichtung
                                </label>
                                <select
                                    id='user_specialty'
                                    className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                                    name='user_specialty'
                                    value={register.user_specialty}
                                    onChange={handleChange}
                                    defaultValue=''
                                >
                                    <option value='' disabled>Fachrichtung</option>
                                    <option value='Innere Medizin'>Innere Medizin</option>
                                    <option value='Kardiologie'>Kardiologie</option>
                                    <option value='Pneumologie'>Pneumologie</option>
                                    <option value='Gastroenterologie'>Gastroenterologie</option>
                                    <option value='Endokrinologie'>Endokrinologie</option>
                                    <option value='Neurologie'>Neurologie</option>
                                </select>
                            </div>
                            <button
                                className='px-4 py-4 w-full text-white bg-teal-500 hover:bg-teal-700 rounded-lg font-semibold text-lg'
                                type='submit'
                                data-testid='register'
                            >
                                Registrieren
                            </button>
                        </form>
                    </section>
                </Box>
            </Dialog>

        </Fragment>
    );
};

export default Register;