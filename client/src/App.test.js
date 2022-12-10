import { renderWithProviders as render } from './redux/utils/test-utils';
import App from './App';
import { screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
 
describe('App', () => {
    it('renders App component', () => {
        render(<App />);         
    });

    it('renders Login component by default', () => {
        render(<App />); 
        expect(screen.getByText('CollNow')).toBeInTheDocument();
        expect(screen.getByText(/Du hast eine Frage/)).toBeInTheDocument();
    });
});