import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateTime } from 'luxon';

import { strings } from '../../helpers';
import Meeting from '../Meeting';
import { mockState, mockMeeting } from './mocks';

describe('<Meeting />', () => {
  beforeEach(() => {
    window.URL.createObjectURL = jest.fn() as jest.Mock;
  });

  it('renders with clickable buttons', () => {
    const { container } = render(
      <Meeting state={mockState} setState={jest.fn()} mapbox="pk.123456" />
    );
    expect(container).toBeTruthy();

    //click type definition
    const type_definition = screen.getByText(strings.types.O);
    expect(type_definition).toBeTruthy();
    fireEvent.click(type_definition);
    fireEvent.click(type_definition);

    //click formatIcs
    const calendar_link = screen.getByText(strings.add_to_calendar);
    expect(calendar_link).toBeTruthy();
    fireEvent.click(calendar_link);

    //click back
    const back_link = screen.getByText(strings.back_to_meetings);
    expect(back_link).toBeTruthy();
    fireEvent.click(back_link);
  });

  it('renders with group info', () => {
    const { container } = render(
      <Meeting
        state={{
          ...mockState,
          meetings: {
            foo: {
              ...mockMeeting,
              group: 'Test',
            },
            bar: {
              ...mockMeeting,
              group: 'Test',
            },
          },
        }}
        setState={jest.fn()}
        mapbox="pk.123456"
        feedback_emails={['test@test.com']}
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders when inactive', () => {
    const { container } = render(
      <Meeting
        state={{
          ...mockState,
          meetings: {
            foo: {
              ...mockMeeting,
              isActive: false,
              isInPerson: false,
            },
            bar: {
              ...mockMeeting,
              start: DateTime.now().plus({ day: 1 }),
            },
          },
        }}
        setState={jest.fn()}
        mapbox="pk.123456"
      />
    );
    expect(container).toBeTruthy();
  });

  it('renders with group but no contact', () => {
    const { container } = render(
      <Meeting
        state={{
          ...mockState,
          meetings: {
            foo: {
              ...mockMeeting,
              group: 'Test',
              start: undefined,
              email: undefined,
              website: undefined,
              phone: undefined,
              venmo: undefined,
              square: undefined,
              paypal: undefined,
            },
            bar: {
              ...mockMeeting,
              isOnline: false,
            },
          },
        }}
        setState={jest.fn()}
        mapbox="pk.123456"
      />
    );
    expect(container).toBeTruthy();
  });
});
