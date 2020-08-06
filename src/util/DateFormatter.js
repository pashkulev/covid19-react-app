const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

const format = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = MONTHS[date.getMonth()];
    const day = date.getDate();
  
    return day + " " + month + " " + year;
};

export default {format};