import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const INITIAL_STATE = {
  player: {
    name: 'Alguem',
    assertions: 3,
    score: 150,
    gravatarEmail: 'alguem@alguem.com',
  }
}

describe('Testa a página de feedback', () => {
  test('Testa se os elementos do Header são renderizados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    expect(history.location.pathname).toBe('/feedback');

    const playerName = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');
    const playerImg = screen.getByTestId('header-profile-picture');

    expect(playerName).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(playerImg).toBeInTheDocument();
  });

  test('Testa se os elementos da página Feedback são exibidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const assertions = screen.getByTestId('feedback-total-question');
    const score = screen.getByTestId('feedback-total-score');

    expect(assertions).toBeInTheDocument();
    expect(score).toBeInTheDocument();
  });

  test('Testa o botão de jogar novamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const playAgainButton = screen.getByTestId('btn-play-again');
    userEvent.click(playAgainButton);

    expect(history.location.pathname).toBe('/');
  });

  test('Testa o botão de Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');

    const rankingButton = screen.getByTestId('btn-ranking');
    userEvent.click(rankingButton);

    expect(history.location.pathname).toBe('/ranking');
  });

  test('Testa se a mensagem correta é exibida', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE);
    history.push('/feedback');

    const feedbackMessage = screen.getByText(/well/i);
    expect(feedbackMessage).toBeInTheDocument();
  });
});