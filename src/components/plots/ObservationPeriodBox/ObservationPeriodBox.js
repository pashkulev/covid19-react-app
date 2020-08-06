import React from "react";
import DateFormatter from "../../../util/DateFormatter";

const ObservationPeriod = (props) => {
  return (
    <p>
      <strong>Observation Period:</strong>
      <br /> {DateFormatter.format(props.covidocs[0].observationDate)} -{" "}
      {DateFormatter.format(props.covidocs[props.covidocs.length - 1].observationDate)}
    </p>
  );
};

export default ObservationPeriod;
