import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

export default class Header extends Component {
  render(){
    const { onServiceChange } = this.props;
    return (
        <div className="header d-flex">
          <h3>
            <Link to='/'>
              StarDB
            </Link>
          </h3>
          <ul className="d-flex">

            <li>
              <Link to='/people/'>People</Link>
            </li>
            <li>
              <Link to='/planets/'>Planets</Link>
            </li>
            <li>
              <Link to='/starships/'>Starships</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/secret'>Secret</Link>
            </li>
          </ul>
          <button 
            onClick={onServiceChange}
            className='btn btn-primary btn-sm'>
            Change Service
          </button>
        </div>
      );
  }
};