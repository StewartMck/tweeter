/*global document, dayjs*/

// Generic Escape function
const escape = (string) => {
  const element = document.createElement('div');
  element.appendChild(document.createTextNode(string));
  return element.innerHTML;
};

const calcDays = (date) => {
  // uses the dayjs lib to get the difference in the timestamp date and current date
  const minutes = dayjs().diff(date, 'm');

  return minutes < 59 ? `${dayjs().diff(date, 'm')} minute${minutes === 1 ? '' : 's'} ago` :
    minutes >= 60 && minutes < 1439 ? `${dayjs().diff(date, 'h')} hour${minutes >= 60 && minutes < 120 ? '' : 's'} ago` :
      `${dayjs().diff(date, 'd')} day${dayjs().diff(date, 'd') <= 1 ? '' : 's'} ago`;
};