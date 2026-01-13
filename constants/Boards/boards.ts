export interface Board {
  id: string;
  title: string;
  color?: string;
}

export const BOARDS: Board[] = [
  {
    id: '1',
    title: 'School',
    color: '#6C5CE7',
  },
  {
    id: '2',
    title: 'Work',
    color: '#00B894',
  },
  {
    id: '3',
    title: 'Personal',
    color: '#FDCB6E',
  },
  {
    id: '4',
    title: 'Fitness',
    color: '#E17055',
  },
];
