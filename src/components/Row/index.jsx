import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

  export default class Row extends Component{
      
      render(){
          const {left, right} = this.props;
        return (
            <div className="row mb2">
            <div className="col-md-6">
              {left}
            </div>
            <div className="col-md-6">
              {right}
            </div>
          </div>
          ) 
      }
  }

  Row.prototypes = {
    left: PropTypes.node,
    right: PropTypes.node
  }