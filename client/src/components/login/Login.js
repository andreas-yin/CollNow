import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import { useDispatch } from 'react-redux';
import { signin, signout } from '../../redux/features/userSlice';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, setLogin] = useState({ email: '', password: '' });

    const handleChange = e => {
        const { name, value } = e.target;
        setLogin(prevValue => ({ ...prevValue, [name]: value }));
    };

    const submitLogin = async e => {
        e.preventDefault();
        try {
            const body = { ...login };
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const user = await response.json();
            dispatch(signin(user)); //save user in Redux state object
            if (user) navigate('/questions');

        } catch (err) {
            console.error(err.message);
            dispatch(signout());
            alert('Ihr Passwort ist falsch oder dieses Konto existiert nicht. Bitte versuchen Sie es erneut oder registrieren Sie sich.');
        }
    };


    return (
        <main className='bg-slate-100 h-screen'>
            <article className='mx-8 py-14 flex flex-col sm:flex-row justify-evenly items-center'>
                <section className='text-center sm:text-left mr-10'>
                    <div className='flex justify-center sm:justify-start items-center mb-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-indigo-600">
                            <path d="M12 .75a8.25 8.25 0 00-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 00.577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 01-.937-.171.75.75 0 11.374-1.453 5.261 5.261 0 002.626 0 .75.75 0 11.374 1.452 6.712 6.712 0 01-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 00.577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0012 .75z" />
                            <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 01.877-.597 11.319 11.319 0 004.22 0 .75.75 0 11.28 1.473 12.819 12.819 0 01-4.78 0 .75.75 0 01-.597-.876zM9.754 22.344a.75.75 0 01.824-.668 13.682 13.682 0 002.844 0 .75.75 0 11.156 1.492 15.156 15.156 0 01-3.156 0 .75.75 0 01-.668-.824z" clipRule="evenodd" />
                        </svg>
                        <h1 className="text-6xl font-semibold font-mono text-indigo-600 ml-4">
                            CollNow
                        </h1>
                    </div>
                    <div className='text-3xl space-y-3 max-w-xl'>
                        <p>Du hast eine Frage und keiner hat gerade Zeit?</p>
                        <p>Kein Problem! Finde Antworten deiner Kolleg:innen auf CollNow.</p>
                    </div>
                </section>

                <div className='mt-14 sm:mt-24 mb-6 w-96 bg-white border border-slate-200 rounded-lg px-4 py-4 shadow-md flex flex-col space-y-4'>
                    <form className='flex flex-col space-y-4' onSubmit={submitLogin}>
                        <label htmlFor='email' className='hidden'>
                            E-Mail-Adresse
                        </label>
                        <input
                            id='email'
                            onChange={handleChange}
                            type="email"
                            placeholder='E-Mail-Adresse'
                            className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                            name='email'
                            value={login.email}
                            required
                        />
                        <label htmlFor='password' className='hidden'>
                            Password
                        </label>
                        <input
                            id='password'
                            onChange={handleChange}
                            type="password"
                            placeholder='Passwort'
                            className='px-4 py-4 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600'
                            name='password'
                            value={login.password}
                            required                            
                        />
                        <button className='px-4 py-4 w-full text-white bg-indigo-600 hover:bg-indigo-800 rounded-lg font-semibold text-lg' type='submit'>
                            Anmelden
                        </button>
                    </form>
                    <div className='mt-6 pt-6 pb-3 border-t border-slate-200 text-center'>
                        <Register />
                    </div>
                </div>

            </article>
        </main>
    );
};

export default Login;