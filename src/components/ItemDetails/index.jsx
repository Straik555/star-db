import React, { Component } from 'react';
import ErrorButton from '../ErrorButton';
import Spinner from '../Spinner'
import SwapiService from '../Services';
import './style.css';
const Record = ({item, field, label}) => {
  return (
    <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
  )
}
export {
  Record
}
export default class ItemDetails extends Component {
  swapiService = new SwapiService();
state = {
    item: null,
    image: null,
    loading: false,
    error: false
  };
 
  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId || 
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId)
      .then((item) => {
        this.setState({
          item,
          image: null,
          loading: true,
          error: false
        })
       const timer = setInterval(() => {
          this.setState({ 
            item,
            image:getImageUrl(item),
            loading: false,
            error: false
          })
        }, 1000)
        setInterval(() => {
          clearInterval(timer)
        }, 1000)
      });
      
  }

  render() {

    const { item, image, loading} = this.state;
    
    if(loading){
      return <Spinner />
    }
    if (!item) {
      return <Spinner />
    }
    const { name } = item;
    
    return (
      <div className="person-details card">
        <img className="person-image"
          src={image}
          alt="character"/>

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child) => {
                return React.cloneElement(child, {item})
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </div>
    )
  }
}
