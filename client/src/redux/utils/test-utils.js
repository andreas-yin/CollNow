import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userReducer from '../features/userSlice';
import searchReducer from '../features/searchSlice';

export const renderWithProviders = (ui, { store = configureStore({ reducer: { user: userReducer, search: searchReducer}})} = {}) => {
    const Wrapper = ({ children }) => {
        return <Provider store={store}>{children}</Provider>
    };

    return render(ui, {wrapper: Wrapper });
};
