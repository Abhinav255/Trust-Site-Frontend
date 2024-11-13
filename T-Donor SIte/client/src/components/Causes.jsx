import React from 'react'

export default function Causes() {
  return (
<div className="section-home  ">
  <div className="container">
    <h2 className="title-style-1">
      Our Causes <span className="title-under"></span>
    </h2>
    <div className="row">
      <div className="col-md-3 col-sm-6">
        <div className="cause">
          <img src="assets/images/causes/cause-hunger.jpg" alt="" className="cause-img" />
          <div className="progress cause-progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="30"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "30%" }}
            >
              10$ / 500$
            </div>
          </div>
          <h4 className="cause-title">
            <a >HUNGER AND POVERTY</a>
          </h4>
          <div className="cause-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at eros rutrum turpis viverra
            elementum semper quis ex. Donec lorem nulla, aliquam quis neque vel, maximus lacinia urna.
          </div>
          <div className="btn-holder text-center">
            <a  className="btn btn-primary" data-toggle="modal" data-target="#donateModal">
              DONATE NOW
            </a>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="cause">
          <img src="assets/images/causes/cause-education.jpg" alt="" className="cause-img" />
          <div className="progress cause-progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "60%" }}
            >
              400$ / 700$
            </div>
          </div>
          <h4 className="cause-title">
            <a >EDUCATION AND TRAINING</a>
          </h4>
          <div className="cause-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at eros rutrum turpis viverra
            elementum semper quis ex. Donec lorem nulla, aliquam quis neque vel, maximus lacinia urna.
          </div>
          <div className="btn-holder text-center">
            <a  className="btn btn-primary" data-toggle="modal" data-target="#donateModal">
              DONATE NOW
            </a>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="cause">
          <img src="assets/images/causes/cause-rights.jpg" alt="" className="cause-img" />
          <div className="progress cause-progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="40"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "40%" }}
            >
              400$ / 1000$
            </div>
          </div>
          <h4 className="cause-title">
            <a >HUMAN RIGHTS</a>
          </h4>
          <div className="cause-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at eros rutrum turpis viverra
            elementum semper quis ex. Donec lorem nulla, aliquam quis neque vel, maximus lacinia urna.
          </div>
          <div className="btn-holder text-center">
            <a  className="btn btn-primary" data-toggle="modal" data-target="#donateModal">
              DONATE NOW
            </a>
          </div>
        </div>
      </div>

      <div className="col-md-3 col-sm-6">
        <div className="cause">
          <img src="assets/images/causes/cause-culture.jpg" alt="" className="cause-img" />
          <div className="progress cause-progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow="60"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "60%" }}
            >
              400$ / 700$
            </div>
          </div>
          <h4 className="cause-title">
            <a >ARTS AND CULTURE</a>
          </h4>
          <div className="cause-details">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at eros rutrum turpis viverra
            elementum semper quis ex. Donec lorem nulla, aliquam quis neque vel, maximus lacinia urna.
          </div>
          <div className="btn-holder text-center">
            <a  className="btn btn-primary" data-toggle="modal" data-target="#donateModal">
              DONATE NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
