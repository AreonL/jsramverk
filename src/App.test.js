import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText("Login");
    expect(linkElement).toBeInTheDocument();
});

// test('renders ', () => {
//   const { container } = render(<App />);

//   expect(screen.getByText(/folinodocs/i)).toBeInTheDocument();
// });