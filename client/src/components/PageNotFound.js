import { Fragment } from 'react';
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    
    return (
        <Fragment>
            <Navbar />
            <main className='container mx-auto my-6'>
                <div className='flex flex-col items-center mx-4'>
                    <h1 className='font-bold text-3xl py-2'>
                        Die Seite konnte leider nicht gefunden werden.
                    </h1>
                    <p className='mt-10 text-xl max-w-xl'>
                        Bitte kehren Sie zur {' '}
                        <Link to='/questions' className='text-sky-400 hover:underline'>Startseite</Link> 
                        {' '} zurück oder benutzen Sie die Suchfunktion in der Navigationsleiste.
                    </p>
                </div>
            </main>
        </Fragment>
    );
};

export default PageNotFound;