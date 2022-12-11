import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeSearchTerm } from '../../redux/features/searchSlice';


const Searchbar = () => {
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();   

    const submitSearchTerm = e => {
        if (e.keyCode === 13) {
            dispatch(changeSearchTerm(searchInput));
            navigate('/results'); 
            setSearchInput('');             
        }
    };

    return (
        <div id='searchbar' className='flex items-center p-2 bg-slate-100 rounded-l'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-slate-500">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <label htmlFor="search" className='hidden'>Suche</label>
            <input
                id='search'
                type="text"
                placeholder='Suche'
                className='outline-none border-none bg-inherit ml-2 sm:w-64 md:w-96'
                onChange={e => setSearchInput(e.target.value)}
                name='search'
                value={searchInput}
                onKeyDown={e => submitSearchTerm(e)}
            />
        </div>
    );
};

export default Searchbar;