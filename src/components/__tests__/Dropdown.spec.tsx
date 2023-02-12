import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import Dropdown from '../Dropdown';
import { strings } from '../../helpers';
import { mockState, mockSetState, mockSetDropdown } from './mocks';

describe('<Dropdown />', () => {
  const filter = 'type';
  const defaultValue = strings[`${filter}_any`];

  it('renders', () => {
    render(
      <Dropdown
        filter={filter}
        open={false}
        end={false}
        defaultValue={defaultValue}
        setDropdown={jest.fn()}
        state={mockState}
        setState={jest.fn()}
      />
    );
    expect(screen.getAllByText(defaultValue)).toHaveLength(1);
  });

  it('opens', () => {
    render(
      <Dropdown
        filter={filter}
        open={false}
        end={false}
        defaultValue={defaultValue}
        setDropdown={mockSetDropdown}
        state={mockState}
        setState={jest.fn()}
      />
    );

    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    expect(mockSetDropdown).toBeCalled();

    const dropdown = screen.getByLabelText(defaultValue);
    expect(dropdown).toBeVisible();
  });

  it('has working links', async () => {
    render(
      <Dropdown
        defaultValue={defaultValue}
        end={false}
        filter={filter}
        open={true}
        setDropdown={mockSetDropdown}
        setState={mockSetState}
        state={mockState}
      />
    );

    function modify<
      K extends keyof typeof mockState['input'],
      T extends typeof mockState['input'][K]
    >(key: K, value: T) {
      return {
        ...mockState,
        input: { ...mockState.input, [key]: value },
      };
    }

    //dropdown starts open
    const dropdown = screen.getByLabelText(defaultValue);
    expect(dropdown).toHaveClass('show');

    const button = screen.getAllByRole('button');
    fireEvent.click(button[0]);
    expect(mockSetDropdown).toBeCalled();

    //test links
    const link1 = screen.getByText('Foo');
    const link2 = screen.getByText('Bar');

    //click a filter
    fireEvent.click(link1);
    expect(mockSetState).toHaveBeenLastCalledWith(modify(filter, ['foo']));

    //add a filter by clicking with metaKey
    fireEvent.click(link2, { metaKey: true });
    expect(mockSetState).toHaveBeenLastCalledWith(
      modify(filter, ['foo', 'bar'])
    );

    //remove a filter by clicking with metaKey
    fireEvent.click(link1, { metaKey: true });
    expect(mockSetState).toHaveBeenLastCalledWith(modify(filter, ['bar']));

    //click all
    const all = screen.getAllByText(strings[`${filter}_any`]);
    fireEvent.click(all[1]);
    expect(mockSetState).toHaveBeenLastCalledWith(modify(filter, []));
  });
});
