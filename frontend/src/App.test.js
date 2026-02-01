import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bienvenido/i);
  expect(linkElement).toBeInTheDocument();
});
