import React, {Component} from 'react';
import {Button} from 'reactstrap';

class MenuItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-sm cocktail-container">
        <img className="cocktail-img" src={require('../images/' + this.props.cocktail.name + '.jpg')} width={200} /><br />
        <div style={{padding: "0.5em"}}>
        <h2>{this.props.cocktail.name}</h2>
        {this.props.cocktail.ingredients.join(', ')}
        <br /><Button onClick={this.props.orderHandler} className="btn btn-success">Order This</Button>
        </div>
      </div>
    );
  }
}

export default MenuItem;
