import React, {Component} from 'react';
import {Button, Input} from 'reactstrap'

class NameForm extends Component {
  state = {
    content: ""
  };

  onChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.changeName(this.state.content);
  }

  render() {
    return (
      <div className="name-form-container">
        <div className="name-form">
          <img src={require('../images/holly.jpg')} height={window.innerHeight / 3}/>
          <h1>The Collier Christmas Cocktail Party</h1>
          <form name="username-form" onSubmit={this.submitForm}>
            <Input onChange={this.onChange} type="text" name="username" placeholder="Your Name" value={this.state.content} />
            <Button type="submit">Go</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default NameForm;
