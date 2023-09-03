import { formatDate } from '@/utils/format-date';

describe(formatDate.name, () => {
  const date = new Date('2023-09-03T16:18:07.950Z');

  it('formats date to "M D, YYYY"', () => {
    expect(formatDate(date, 'M D, YYYY')).toBe('Sep 3, 2023');
  });

  it('formats date to "YYYY-MM-DD"', () => {
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2023-09-03');
  });
});
