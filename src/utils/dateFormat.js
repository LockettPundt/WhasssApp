
const dateFormat = (date) => {
  const dateToFormat = new Date(date);
  const hour = dateToFormat.getHours() > 12
    ? dateToFormat.getHours() - 12
    : dateToFormat.getHours();
  const minutes = dateToFormat.getMinutes() < 10
    ? `0${dateToFormat.getMinutes()}`
    : dateToFormat.getMinutes();
  const AMPM = dateToFormat.getHours() >= 12 ? 'pm' : 'am';
  const formattedDate = `${hour}:${minutes}${AMPM}`;
  return formattedDate;
};


export default dateFormat;
