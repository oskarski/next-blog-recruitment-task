type DateFormat = 'M D, YYYY' | 'YYYY-MM-DD';

export const formatDate = (date: Date, format: DateFormat): string => {
  const locale = 'en-US';

  const numericDay = () => date.toLocaleString(locale, { day: 'numeric' });
  const twoDigitsDay = () => date.toLocaleString(locale, { day: '2-digit' });

  const shortMonth = () => date.toLocaleString(locale, { month: 'short' });
  const twoDigitsMonth = () =>
    date.toLocaleString(locale, { month: '2-digit' });

  const numericYear = () => date.toLocaleString(locale, { year: 'numeric' });

  switch (format) {
    case 'M D, YYYY': {
      return `${shortMonth()} ${numericDay()}, ${numericYear()}`;
    }
    case 'YYYY-MM-DD': {
      return `${numericYear()}-${twoDigitsMonth()}-${twoDigitsDay()}`;
    }
  }
};
