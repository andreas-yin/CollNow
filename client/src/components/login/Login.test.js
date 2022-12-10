import { renderWithProviders as render } from '../../redux/utils/test-utils';
import { MemoryRouter as Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';


const ui = <Router><Login /></Router>;

global.alert = jest.fn();

beforeEach(() => {
    fetch.resetMocks();
    alert.mockReset();
});

describe('Login', () => {
    it('renders Login component', () => {
        render(ui);
        expect(screen.getByText('CollNow')).toBeInTheDocument();
        expect(screen.getByText(/Du hast eine Frage/)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'E-Mail-Adresse'})).toBeInTheDocument();
        expect(screen.getByRole('textbox', {name: 'E-Mail-Adresse'})).toBeRequired();
        expect(screen.getByPlaceholderText('Passwort')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Passwort')).toBeRequired();
        expect(screen.getAllByRole('button')).toHaveLength(2);
        expect(screen.getByRole('button', {name: 'Anmelden' })).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Registrieren' })).toBeInTheDocument();
    });

    it('renders Register dialog', () => {
        render(ui);
        userEvent.click(screen.getByRole('button', {name: 'Registrieren' }));
        expect(screen.getByText('Registriere dich')).toBeInTheDocument();
        expect(screen.getAllByPlaceholderText('E-Mail-Adresse')).toHaveLength(2);
        expect(screen.getAllByPlaceholderText('Passwort')).toHaveLength(2);
        expect(screen.getByTestId('email')).toBeRequired();
        expect(screen.getByTestId('password')).toBeRequired();
        expect(screen.getByRole('textbox', {name: 'Vorname'})).toBeRequired();
        expect(screen.getByRole('textbox', {name: 'Nachname'})).toBeRequired();
        expect(screen.getAllByText('Registrieren')).toHaveLength(2);
        expect(screen.getAllByRole('combobox')).toHaveLength(4);
    });

    it('validates email input when user logs in', () => {
        render(ui);
        userEvent.type(screen.getByRole('textbox', {name: 'E-Mail-Adresse'}), '');
        expect(screen.getByRole('textbox', {name: 'E-Mail-Adresse'})).toBeInvalid();
        userEvent.type(screen.getByRole('textbox', {name: 'E-Mail-Adresse'}), 'user');
        expect(screen.getByRole('textbox', {name: 'E-Mail-Adresse'})).toBeInvalid();
        userEvent.type(screen.getByRole('textbox', {name: 'E-Mail-Adresse'}), 'user@test.com');
        expect(screen.getByRole('textbox', {name: 'E-Mail-Adresse'})).toBeValid();
    });

    it('validates email input when user registers', () => {
        render(ui);
        userEvent.click(screen.getByRole('button', {name: 'Registrieren' }));
        userEvent.type(screen.getByTestId('email'), '');
        expect(screen.getByTestId('email')).toBeInvalid();
        userEvent.type(screen.getByTestId('email'), 'user');
        expect(screen.getByTestId('email')).toBeInvalid();
        userEvent.type(screen.getByTestId('email'), 'user@test.com');
        expect(screen.getByTestId('email')).toBeValid();
    });

    it('alerts user that logs in if their password is incorrect', async () => {
        fetch.mockReject(() => Promise.reject(new Error('Unauthorized')));
        render(ui);
        userEvent.type(screen.getByRole('textbox', {name: 'E-Mail-Adresse'}), 'user@test.com');
        userEvent.type(screen.getByPlaceholderText('Passwort'), 'password');
        await userEvent.click(screen.getByRole('button', {name: 'Anmelden' }));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(alert).toHaveBeenCalledTimes(1);
    });

    it('alerts user that registers if their account already exists', async () => {
        fetch.mockReject(() => Promise.reject(new Error('Unauthorized')));
        render(ui);
        userEvent.click(screen.getByRole('button', {name: 'Registrieren' }));
        userEvent.type(screen.getByTestId('email'), 'user@test.com');
        userEvent.type(screen.getByTestId('password'), 'password');
        userEvent.type(screen.getByRole('textbox', {name: 'Vorname'}), 'Max');
        userEvent.type(screen.getByRole('textbox', {name: 'Nachname'}), 'Mustermann');
        await userEvent.click(screen.getByTestId('register'));
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(alert).toHaveBeenCalledTimes(1);        
    });

    // it('navigates to /questions upon successful authentication', async () => {
    //     fetch.mockResponseOnce(JSON.stringify({ user_id: 1, email: 'user@test.com' }));
    //     render(ui);
    //     userEvent.type(screen.getByPlaceholderText('E-Mail-Adresse'), 'user@test.com');
    //     userEvent.type(screen.getByPlaceholderText('Passwort'), 'password');
    //     await userEvent.click(screen.getByText('Anmelden'));
    //     await waitFor(() =>
    //         expect(screen.findByText('Fragen deiner Kolleg:innen')).toBeInTheDocument()
    //     );
       
    // });
});