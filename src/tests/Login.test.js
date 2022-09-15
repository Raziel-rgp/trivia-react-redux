import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../pages/Login";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testando o componente Login', () => {
    test('Testa os campos de input de texto', () => {
        renderWithRouterAndRedux(<Login />);
        const textNameInput = screen.getByTestId('input-player-name');
        const textEmailInput = screen.getByTestId('input-gravatar-email');

        expect(textNameInput).toBeInTheDocument();
        expect(textEmailInput).toBeInTheDocument();
    });
    test('Testa o botão Play', async () => {
        const { history } = renderWithRouterAndRedux(<Login />);

        const playButton = screen.getByRole('button', { name: /play/i, value: false });
        expect(playButton).toBeDisabled();

        const testInput = 'teste';
        userEvent.type(screen.getByTestId('input-player-name'), testInput);
        userEvent.type(screen.getByTestId('input-gravatar-email'), testInput);
        expect(playButton).not.toBeDisabled();

        userEvent.click(playButton);
        await waitFor(() => expect(history.location.pathname).toBe('/game'));
    });
    test('Testa o botão "Configuração"', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        const configButton = screen.getByRole('button', { name: 'Configuração' });
        expect(configButton).toBeInTheDocument();

        userEvent.click(configButton);
        expect(history.location.pathname).toBe('/settings')
    });
});
