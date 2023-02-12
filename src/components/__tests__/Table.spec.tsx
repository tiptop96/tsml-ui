import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { strings } from '../../helpers';
import Table from '../Table';
import { mockSetState, mockState } from './mocks';

describe('<Table />', () => {
  const filteredSlugs = Object.keys(mockState.meetings);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with clickable rows', () => {
    render(
      <Table
        filteredSlugs={filteredSlugs}
        inProgress={[]}
        listButtons={false}
        setState={mockSetState}
        state={mockState}
      />
    );

    //clickable rows
    const rows = screen.getAllByRole('row');
    rows.forEach(row => fireEvent.click(row));
    expect(mockSetState).toHaveBeenCalledTimes(filteredSlugs.length);
  });

  it('renders with clickable listButtons', () => {
    render(
      <Table
        filteredSlugs={filteredSlugs}
        inProgress={[]}
        listButtons={false}
        setState={mockSetState}
        state={mockState}
      />
    );

    //clickable links
    const anchors = screen.getAllByRole('link');
    anchors.forEach(anchor => fireEvent.click(anchor));
    expect(mockSetState).toHaveBeenCalledTimes(filteredSlugs.length);

    //unclickable rows
    const rows = screen.getAllByRole('row');
    rows.forEach(row => fireEvent.click(row));
    expect(mockSetState).toHaveBeenCalledTimes(filteredSlugs.length * 2);
  });

  it('displays single meeting in progress', () => {
    const inProgress = [filteredSlugs[0]];

    render(
      <Table
        filteredSlugs={filteredSlugs}
        inProgress={['foo']}
        listButtons={false}
        setState={mockSetState}
        state={mockState}
      />
    );

    //count rows (data rows + header + show in progress)
    expect(screen.getAllByRole('row')).toHaveLength(filteredSlugs.length + 2);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(strings.in_progress_single);

    fireEvent.click(button);
    expect(button).not.toBeVisible();

    //recount rows
    expect(screen.getAllByRole('row')).toHaveLength(
      filteredSlugs.length + inProgress.length + 1
    );
  });

  it('displays multiple meetings in progress', () => {
    const inProgress = [...filteredSlugs];

    render(
      <Table
        filteredSlugs={filteredSlugs}
        inProgress={['foo', 'bar']}
        listButtons={false}
        setState={mockSetState}
        state={mockState}
      />
    );

    //count rows (data rows + header + show in progress)
    expect(screen.getAllByRole('row')).toHaveLength(filteredSlugs.length + 2);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(
      strings.in_progress_multiple.replace('%count%', inProgress.length)
    );

    fireEvent.click(button);
    expect(button).not.toBeVisible();

    //recount rows
    expect(screen.getAllByRole('row')).toHaveLength(
      filteredSlugs.length + inProgress.length + 1
    );
  });
});
