import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Login from "../pages/Login";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

describe('Testando o componente Login', () => {
    test('Testa se a página possui as labels "nome" e "E-mail"', () => {
        renderWithRouterAndRedux(<Login />);
        const nameText = screen.getByText(/nome/i);
        const emailText = screen.getByText(/e-mail/i);

        expect(nameText).toBeInTheDocument();
        expect(emailText).toBeInTheDocument();
    });
    test('Testa os campos de input de texto', () => {
        renderWithRouterAndRedux(<Login />);
        const textNameInput = screen.getByTestId('input-player-name');
        const textEmailInput = screen.getByTestId('input-gravatar-email');

        expect(textNameInput).toBeInTheDocument();
        expect(textEmailInput).toBeInTheDocument();
    });
    test('Testa o botão Play', async () => {
        renderWithRouterAndRedux(<Login />);
        const playButton = screen.getByRole('button', { name: /play/i, value: false });
        expect(playButton).toBeInTheDocument();

        const testInput = 'teste';
        userEvent.type(screen.getByTestId('input-player-name'), testInput);
        userEvent.type(screen.getByTestId('input-gravatar-email'), testInput);
        const activatedPlayButton = screen.getByRole('button', { name: /play/i, value: true });
        expect(activatedPlayButton).toBeInTheDocument();
        userEvent.click(activatedPlayButton)
        await fetch('https://opentdb.com/api_token.php?command=request');
    });
    test('Testa o botão "Configuração"', () => {
        const { history } = renderWithRouterAndRedux(<Login />);
        // const configButton = screen.getByRole('button', { name: /configuração/i, value: true });
        const configButton = screen.getByRole('button', { name: 'Configuração' });
        expect(configButton).toBeInTheDocument();

        userEvent.click(configButton);
        expect(history.location.pathname).toBe('/settings')
    });
});
