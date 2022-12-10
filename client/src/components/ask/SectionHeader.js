import { Fragment } from 'react';

const SectionHeader = ({ title, text }) => {
    return (
        <Fragment>
            <h2 className='font-semibold text-2xl text-slate-700'>{title}</h2>
            <p className="text-slate-500 mt-4">{text}</p>
        </Fragment>
    );
};

export default SectionHeader;