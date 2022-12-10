import { renderWithProviders as render } from '../../redux/utils/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import Home from './Home';

const ui = <Router><Home /></Router>;

beforeEach(() => {
    fetch.resetMocks();
});

describe('Home', () => {
    it('renders Home component', async () => {       
        render(ui);        
        expect(screen.getByRole('link', { name: /collnow/i })).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getByText('Fragen deiner Kolleg:innen')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'Frage stellen'}))        
        expect(screen.getByText('0 Fragen')).toBeInTheDocument();        
    });

    it('renders fetched questions', async () => {
        const mockQuestions = [
            { title: 'Title1', specialty: 'Innere Medizin', setting: 'Station', age: '77', sex: '♀', primary_dx: 'Hauptdiagnose1', secondary_dx: 'Nebendiagnose1', description: 'Beschreibung1', tags: 'Tag1, Tag2, Tag3, Tag4, Tag5' },
            { title: 'Title2', specialty: 'Kardiologie', setting: 'ZNA', age: '56', sex: '♂', primary_dx: 'Hauptdiagnose2', secondary_dx: 'Nebendiagnose2', description: 'Beschreibung2', tags: 'TagA, TagB, TagC' }
        ];
        fetch.mockResponseOnce(JSON.stringify(mockQuestions));
        render(ui);          
        expect(await screen.findByText('2 Fragen')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'Title1' })).toBeInTheDocument();
        expect(await screen.findByText('Innere Medizin')).toBeInTheDocument();
        expect(await screen.findByRole('link', { name: 'Title2' })).toBeInTheDocument();
        expect(await screen.findByText('Kardiologie')).toBeInTheDocument();
    });
});