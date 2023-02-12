import { DateTime } from 'luxon';

import type { Meeting as MeetingType, State } from '../../types';

export const mockSetState = jest.fn();
export const mockSetDropdown = jest.fn();

export const mockMeeting: MeetingType = {
  slug: 'test',
  isInPerson: true,
  isOnline: true,
  isActive: true,
  latitude: 40.712776,
  longitude: -74.005974,
  name: 'First Meeting',
  start: DateTime.now(),
  end: DateTime.now(),
  types: ['O', 'M', 'X'],
  timezone: 'America/New_York',
  approximate: false,
  formatted_address: '123 Main St, New York, NY 12345, USA',
  email: 'test@test.com',
  venmo: '@test',
  square: '$test',
  paypal: 'https://paypal.me/test',
  location: 'Empire State Building',
  notes: 'Testing meeting notes\n\nTesting new line',
  location_notes: 'Testing meeting notes\n\nTesting new line',
  group_notes: 'Testing meeting notes\n\nTesting new line',
  website: 'https://test.com',
  phone: '+18005551212',
  regions: ['Manhattan', 'Midtown'],
  district: 'District 13',
  conference_url: 'https://zoom.us/d/123456789',
  conference_url_notes: 'Test',
  conference_phone: '+1234567890',
  conference_phone_notes: 'Test',
  conference_provider: 'Zoom',
  updated: '2/17/22',
};

export const mockState: State = {
  capabilities: {
    coordinates: true,
    distance: true,
    geolocation: true,
    inactive: true,
    location: true,
    region: true,
    sharing: false,
    time: true,
    type: true,
    weekday: true,
  },
  indexes: {
    distance: [],
    region: [],
    time: [],
    type: [
      {
        key: 'foo',
        name: 'foo',
        slugs: [],
      },
      {
        key: 'bar',
        name: 'bar',
        slugs: [],
      },
    ],
    weekday: [],
  },
  input: {
    distance: [],
    meeting: 'foo',
    mode: 'search',
    region: [],
    time: [],
    type: [],
    view: 'table',
    weekday: [],
  },
  loading: false,
  meetings: {
    foo: mockMeeting,
    bar: mockMeeting,
  },
  ready: true,
};
