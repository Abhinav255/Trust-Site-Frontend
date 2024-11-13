import React from 'react'

export default function Topbar() {
  return (
  
      <div className="navbar-top">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-xs-12">
                  <ul className="list-unstyled list-inline header-contact">
                    <li>
                      <i className="fa fa-phone"></i>
                      <a href="tel:+212658986213">+212 658 986 213</a>
                    </li>
                    <li>
                      <i className="fa fa-envelope"></i>
                      <a href="mailto:contact@we donate.org">contact@we donate.org</a>
                    </li>
                  </ul>
                </div>

                <div className="col-sm-6 col-xs-12 text-right">
                  <ul className="list-unstyled list-inline header-social">
                    <li>
                      <a >
                        <i className="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa fa-google"></i>
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa fa-youtube"></i>
                      </a>
                    </li>
                    <li>
                      <a >
                        <i className="fa fa-pinterest-p"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
    
  )
}
