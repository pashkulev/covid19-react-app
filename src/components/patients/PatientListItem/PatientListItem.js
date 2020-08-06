import React from "react";
import { Link } from "react-router-dom";
import DateFormatter from "../../../util/DateFormatter";

const PatientListItem = (props) => {
  return (
    <div className="row my-1 border-bottom">
      <div className="col-1">{props.data.ordinalId}</div>
      <div className="col-2">{props.data.country}</div>
      <div className="col-3">{props.data.location}</div>
      <div className="col-1">{props.data.gender || "N/A"}</div>
      <div className="col-1">{props.data.age || "N/A"}</div>
      <div className="col-2">
        {DateFormatter.format(props.data.reportingDate)}
      </div>
      <div className="col">
        <Link to={"/patients/" + props.data._id + "/details"}>
          <button className="btn-outline-dark">Details</button>
        </Link>
      </div>
    </div>
  );
};

export default PatientListItem;
