import React, {Component} from 'react';
import './styles/Sort.css';

class Sort extends Component {

  constructor () {
          super()
          this.state = {
              value: 'all',
          }
           this.change = this.change.bind(this);
      }

  change(event) {
    this.setState({
      value: event.target.value
    });
  }

toggleIt() {
  const on = document.getElementsByClassName("online_");
  const off = document.getElementsByClassName("offline_");
  const all = document.getElementsByClassName("list_");
   function showAll() {
    for (var i=0; i<all.length; i++) {
      all[i].style.display = "flex";
    }
  }
  if (this.state.value==="online") {
    showAll();
    for (var i=0; i<off.length; i++) {
      off[i].style.display = "none";
    }
 } else if(this.state.value==="offline") {
   showAll();
   for (i=0; i<on.length; i++) {
     on[i].style.display = "none";
   }
 } else if(this.state.value==="all") {
   showAll();
 }
}


  render() {
    this.toggleIt();
    return (
      <div className="sort">
        <div className="sort-text">
          Sort by:&nbsp;&nbsp;&nbsp;
        </div>
        <select id="mySelect" onChange={this.change} value={this.state.value}>
          <option value="all">All</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>
    )
  }

}

export default Sort;
