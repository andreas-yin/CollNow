import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <main className='bg-slate-100 h-screen px-8 pt-28 flex flex-col items-center'>         
            <h1 className='text-6xl font-semibold'>Unautorisierter Zugriff</h1>
            <p className='text-3xl mt-10 max-w-xl'>Bitte {' '} 
            <Link to='/' className='text-sky-400 hover:underline'>melden Sie sich an oder registrieren Sie sich</Link>
            , um die Inhalte sehen zu können.</p>       
    </main>
  );
};

export default Unauthorized;