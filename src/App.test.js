import { render, screen } from '@testing-library/react';
import App from './App';

test('add a picture button is visible on page', () => {
  render(<App />); 
  const addPictureButton = screen.getByText(/Add a Picture/i);
  expect(addPictureButton).toBeVisible();
});

test('pagination interface is visible on page', () => {
  render(<App />);
  const paginationContainer = screen.getByTestId("pagination");
  expect(paginationContainer).toBeVisible();
});
