/**
 * @jest-environment jsdom
 */
import { screen } from '@testing-library/react';
import Home from '@/pages/index';
import { renderWithProviders } from '@/utils/test.util';
const mockProps = {
  nowPlaying: [],
  popular: [],
  upcoming: [],
};
describe('Home', () => {
  it('renders home correctly', () => {
    renderWithProviders(<Home {...mockProps} />);

    const heading = screen.getByText('Search');

    expect(heading).toBeInTheDocument();
  });
});
