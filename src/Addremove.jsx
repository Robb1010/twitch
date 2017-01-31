import React, {Component} from 'react';
import './styles/Addremove.css';

class Addremove extends Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  addAndClear() {
    this.props.addStreamer(this.state.value);
    this.clearValue();
  }

  clearValue() {
    this.setState({
      value: ''
    })
  }

  render() {
    return (
    <div className="add_div">
      <button className="add" onClick={()=>this.addAndClear()}>Add</button>
      <p>&nbsp;&nbsp;&nbsp;</p>
      <input type="text" name="newstream" id='newstream' value={this.state.value} onChange={this.handleChange}></input>
      </div>
  )}
}

export default Addremove;
