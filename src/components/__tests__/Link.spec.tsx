import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';

import Link from '../Link';
import { settings } from '../../helpers';
import { mockMeeting, mockState, mockSetState } from './mocks';

jest.mock('../../helpers/settings');

let mockSettings = jest.mocked(settings);

describe('<Link />', () => {
  it('works without props', () => {
    const { container } = render(
      <Link meeting={mockMeeting} state={mockState} setState={mockSetState} />
    );
    expect(container.firstChild?.nodeValue).toBe(null);
  });

  it('works with flags', () => {
    mockSettings.flags = ['M'];

    render(
      <Link meeting={mockMeeting} state={mockState} setState={mockSetState} />
    );

    expect(screen.getByText(/men/i)).toBeInTheDocument();
  });

  it('works with setState', () => {
    render(
      <Link meeting={mockMeeting} state={mockState} setState={mockSetState} />
    );

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', 'https://test.com/');
    expect(link).toHaveTextContent(/First Meeting/i);
    expect(screen.getByText(/men/i)).toBeInTheDocument();

    fireEvent.click(link);

    expect(mockSetState).toHaveBeenCalledWith({
      ...mockState,
      input: { ...mockState.input, meeting: 'test' },
    });
  });
});
