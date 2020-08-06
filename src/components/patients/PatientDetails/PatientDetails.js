import React, { Component } from "react";
import { Link } from "react-router-dom";
import DateFormatter from "../../../util/DateFormatter";

import PatientService from "../../../services/PatientService";

export default class PatientDetails extends Component {
  state = {
    patient: null,
  };

  componentDidMount = async () => {
    const id = this.props.match.params.id;
    console.log(id);
    const patient = await PatientService.getPatientById(id);

    this.setState({ patient: patient });
  };

  render = () => {
    return (
      <div className="mt-3">
        {this.state.patient ? (
          <div className="row patient">
            <div className="col-8">
              <div className="row">
                <div className="col-6">
                  <div>Location</div>
                  <h4>{this.state.patient.location}</h4>
                </div>
                <div className="col-6">
                  <div>Country</div>
                  <h4>{this.state.patient.country}</h4>
                </div>
              </div>
              <div className="row bg-dark text-light rounded my-1">
                <div className="col-3">ID</div>
                <div className="col-3">Case No</div>
                <div className="col-3">Age</div>
                <div className="col-3">Gender</div>
              </div>
              <div className="row">
                <div className="col-3">{this.state.patient.ordinalId}</div>
                <div className="col-3">
                  {this.state.patient.caseInCountry === null
                    ? "N/A"
                    : this.state.patient.caseInCountry}
                </div>
                <div className="col-3">{this.state.patient.age}</div>
                <div className="col-3">{this.state.patient.gender}</div>
              </div>
              <hr />
              <div className="row">
                <div>
                  <strong>Summary:</strong>
                </div>
                <div className="col-12">{this.state.patient.summary}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-3">Symptoms:</div>
                <div className="col-9">
                  {this.state.patient.symptoms.length === 0
                    ? "N/A"
                    : this.state.patient.symptom}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-3">Source</div>
                <div className="col-9">{this.state.patient.source}</div>
              </div>
              <hr />
              <div className="row">
                <div className="col-3">Link</div>
                <div className="col-9">
                  <a target="_blank" href={this.state.patient.link}>
                    {this.state.patient.link}
                  </a>
                </div>
              </div>
            </div>

            <div className="col-4 border-left border-dark">
              <div className="row">
                <div className="col-6">Reporting Date:</div>
                <div className="col-6">
                  {DateFormatter.format(this.state.patient.reportingDate)}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">Symptom Onset:</div>
                <div className="col-6">
                  {this.state.patient.symptomOnset === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.symptomOnset)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Onset Approximated:</div>
                <div className="col-6">
                  {this.state.patient.onsetApproximated === null
                    ? "N/A"
                    : this.state.patient.onsetApproximated
                    ? "yes"
                    : "no"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">Hospital Visit Date:</div>
                <div className="col-6">
                  {this.state.patient.hospVisitDate === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.hospVisitDate)}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">Exposure Start:</div>
                <div className="col-6">
                  {this.state.patient.exposureStart === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.exposureStart)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Exposure End:</div>
                <div className="col-6">
                  {this.state.patient.exposureEnd === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.exposureEnd)}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">From Wuhan:</div>
                <div className="col-6">
                  {this.state.patient.isFromWuhan === null
                    ? "N/A"
                    : this.state.patient.isFromWuhan
                    ? "yes"
                    : "no"}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Visiting Wuhan:</div>
                <div className="col-6">
                  {this.state.patient.isVisitingWuhan === null
                    ? "N/A"
                    : this.state.patient.isVisitingWuhan
                    ? "yes"
                    : "no"}
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6">Recovery Date:</div>
                <div className="col-6">
                  {this.state.patient.recoveryDate === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.recoveryDate)}
                </div>
              </div>
              <div className="row">
                <div className="col-6">Date of Death:</div>
                <div className="col-6">
                  {this.state.patient.dateOfDeath === null
                    ? "N/A"
                    : DateFormatter.format(this.state.patient.dateOfDeath)}
                </div>
              </div>
              <hr />
              <div className="row mt-5">
                <div className="col-6"></div>
                <div className="col-6">
                  <Link to="/line-list-data">
                    <button className="btn-outline-dark w-100">Go Back</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };
}
