import { renderWithProviders as render } from '../../redux/utils/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter as Router } from 'react-router-dom';
import Ask from './Ask';

const ui = <Router><Ask /></Router>;

describe('Ask', () => {
    it('renders Ask component', () => {
        render(ui); 
        expect(screen.getByRole('link', { name: /collnow/i })).toBeInTheDocument();
        expect(screen.getAllByRole('textbox')).toHaveLength(6);
        expect(screen.getAllByRole('combobox')).toHaveLength(3);
        expect(screen.getByRole('spinbutton', { name: 'Alter'})).toBeInTheDocument();
        expect(screen.getByText('Stelle eine Frage')).toBeInTheDocument();
        expect(screen.getByText('Eine gute Frage verfassen')).toBeInTheDocument();
        expect(screen.getByText('Titel')).toBeInTheDocument();
        expect(screen.getByText('Patientendaten')).toBeInTheDocument();
        expect(screen.getByText('Aus KIS importieren')).toBeInTheDocument();
        expect(screen.getByText('Beschreibung deines Problems')).toBeInTheDocument();
        expect(screen.getByText('Tags')).toBeInTheDocument();
        expect(screen.getByText('Frage posten')).toBeInTheDocument();
        expect(screen.getByText('Frage verwerfen')).toBeInTheDocument();     
    });

    it('validates the required title input', () => {
        render(ui); 
        userEvent.type(screen.getByRole('textbox', { name: 'Titel der Frage' }), '');
        expect(screen.getByRole('textbox', { name: 'Titel der Frage' })).toBeInvalid();
        userEvent.type(screen.getByRole('textbox', { name: 'Titel der Frage' }), 'Testfrage');
        expect(screen.getByRole('textbox', { name: 'Titel der Frage' })).toBeValid();
    });

    it('validates the required description input', () => {
        render(ui); 
        userEvent.type(screen.getByRole('textbox', { name: 'Beschreibung der Frage' }), '');
        expect(screen.getByRole('textbox', { name: 'Beschreibung der Frage' })).toBeInvalid();
        userEvent.type(screen.getByRole('textbox', { name: 'Beschreibung der Frage' }), 'Beschreibung');
        expect(screen.getByRole('textbox', { name: 'Beschreibung der Frage' })).toBeValid();
    });
});
