import React from 'react';

const Modal = () => (
  <div className="modal fade" id="donateModal" tabIndex="-1" role="dialog" aria-labelledby="donateModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 className="modal-title" id="donateModalLabel">DONATE NOW</h4>
        </div>
        <div className="modal-body">
          <form className="form-donation">
            <h3 className="title-style-1 text-center">
              Thank you for your donation <span className="title-under"></span>
            </h3>
            <div className="row">
              <div className="form-group col-md-12">
                <input type="text" className="form-control" id="amount" placeholder="AMOUNT(€)" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control" name="firstName" placeholder="First name*" />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" name="lastName" placeholder="Last name*" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" className="form-control" name="email" placeholder="Email*" />
              </div>
              <div className="form-group col-md-6">
                <input type="text" className="form-control" name="phone" placeholder="Phone" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <input type="text" className="form-control" name="address" placeholder="Address" />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <textarea cols="30" rows="4" className="form-control" name="note" placeholder="Additional note"></textarea>
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-12">
                <button type="submit" className="btn btn-primary pull-right" name="donateNow">
                  DONATE NOW
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
