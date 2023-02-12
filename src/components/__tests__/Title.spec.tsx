import React from 'react';
import { screen, render } from '@testing-library/react';

import Title from '../Title';
import { mockState } from './mocks';

function assertHeadingAndTitleHas(title: string) {
  const heading = screen.getByRole('heading', { level: 1 });
  expect(heading).toHaveTextContent(title);
  expect(document.title).toStrictEqual(title);
}

describe('<Title />', () => {
  it('returns null without indices or input', () => {
    const { container } = render(<Title state={mockState} />);
    expect(container.firstChild).toBeNull();
  });

  it('works with meeting key', () => {
    render(<Title state={mockState} />);
    assertHeadingAndTitleHas('Meetings');
  });

  it('works with search mode and search term', () => {
    render(
      <Title
        state={{ ...mockState, input: { ...mockState.input, search: 'foo' } }}
      />
    );
    assertHeadingAndTitleHas('Meetings with ‘foo’');
  });

  it('works with location mode and search term', () => {
    render(
      <Title
        state={{
          ...mockState,
          input: { ...mockState.input, mode: 'location', search: 'foo' },
        }}
      />
    );
    assertHeadingAndTitleHas('Meetings near ‘foo’');
  });

  it('works with one key', () => {
    render(
      <Title
        state={{ ...mockState, input: { ...mockState.input, search: 'foo' } }}
      />
    );
    assertHeadingAndTitleHas('foo Meetings');
  });

  it('works with different keys', () => {
    render(
      <Title
        state={{
          ...mockState,
          input: { ...mockState.input, type: ['foo'], region: ['bar'] },
        }}
      />
    );
    assertHeadingAndTitleHas('foo Meetings in bar');
  });

  it('works with more different keys', () => {
    render(
      <Title
        state={{
          ...mockState,
          input: {
            ...mockState.input,
            weekday: ['foo'],
            type: ['baz'],
            region: ['bar'],
          },
        }}
      />
    );
    assertHeadingAndTitleHas('foo baz Meetings in bar');
  });

  it('works with multiple of the same key', () => {
    render(
      <Title
        state={{
          ...mockState,
          input: {
            ...mockState.input,
            type: ['foo', 'bar'],
          },
        }}
      />
    );
    assertHeadingAndTitleHas('foo + bar Meetings');
  });
});
