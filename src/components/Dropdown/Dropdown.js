import React from "react";

const DropdownComponent = (props) => {
  const options = props.optionValues.map((e, index) => (
    <option key={index} value={e}>
      {e}
    </option>
  ));

  return (
    <div className="form-group">
      <label>Filter by {props.label}:</label>
      <select
        id={props.id}
        className="form-control"
        value={props.selected}
        onChange={props.changeHandler}
      >
        {options}
      </select>
    </div>
  );
};

export default DropdownComponent;
