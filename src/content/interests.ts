export interface Interest {
  id: 'soccer' | 'volleyball' | 'music' | 'tv';
  title: string;
  body: string;
}

export const interests: Interest[] = [
  {
    id: 'soccer',
    title: 'Soccer',
    body: 'I play intramural soccer at UW–Madison.',
  },
  {
    id: 'volleyball',
    title: 'Volleyball',
    body: 'Intramural volleyball too — a regular part of my week on campus.',
  },
  {
    id: 'music',
    title: 'Music',
    body: 'There is almost always something playing. Lately I’ve been getting into house.',
  },
  {
    id: 'tv',
    title: 'TV',
    body: 'Currently watching Lanterns.',
  },
];
