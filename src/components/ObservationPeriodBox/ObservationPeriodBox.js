import React from "react";

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

const ObservationPeriod = (props) => {
  return (
    <p>
      <strong>Observation Period:</strong>
      <br /> {formatDate(props.covidocs[0].observationDate)} -{" "}
      {formatDate(props.covidocs[props.covidocs.length - 1].observationDate)}
    </p>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();

  return day + " " + month + " " + year;
};

export default ObservationPeriod;
