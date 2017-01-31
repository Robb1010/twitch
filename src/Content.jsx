import React, {Component} from 'react';
import $ from 'jquery';
import './styles/Content.css';
import Addremove from './Addremove';


const twitchApi = 'https://api.twitch.tv/kraken/streams/';
const twitchApiId = '?client_id=v3i1wxel6dsx4e6dlthq6yxefmyb6s';

class Content extends Component {

  state = {
    streamers: ['nightblue3', 'savjz', 'thaldrinlol', 'rendogtv', 'streamerhouse', "domingo", "ahugegorilla", "nobbel87", "madkingz", "bibaboy"],
    game: [],
    viewers: []
  };

  getData(channel) {
    fetch(twitchApi + channel.toString() + twitchApiId).then((response) => response.json()).then((responseJson) => {
      if (responseJson.stream === null) {
        fetch(responseJson._links.channel + twitchApiId).then((response) => response.json()).then((responseJson) => {
          if (responseJson.error === "Not Found") {
            this.setState({
              game: this.state.game.concat([
                [
                  channel,
                  responseJson.logo,
                  "User does not exist",
                  "Offline",
                  "  "
                ]
              ]),
              viewers: this.state.viewers.concat(["offline"])
            });
          } else
          this.setState({
            game: this.state.game.concat([
              [
                channel,
                responseJson.logo,
                "Playing " + responseJson.game,
                "Offline",
                responseJson.status
              ]
            ]),
            viewers: this.state.viewers.concat(["offline"])
          });
        });

      } else
        this.setState({
          game: this.state.game.concat([
            [
              channel,
              responseJson.stream.channel.logo,
              "Playing " + responseJson.stream.game,
              responseJson.stream.viewers + " viewers",
              responseJson.stream.channel.status
            ]
          ]),
          viewers: this.state.viewers.concat(["online"])
        });
      }
    ).catch((error) => {
      console.error(error);
    });
}

  addStreamer(name) {
    this.setState({
      streamers: this.state.streamers.concat(name)
    });
    this.getData(name);
  }


  handleDelete(i, index) {
    var id = '#' + i;
    $(id).slideUp(300);
    setTimeout(function() {
    const arr = this.state.streamers;
    const strIndex = arr.indexOf(i);
    arr.splice(strIndex, 1);
    this.setState({
      streamers: arr
    });
    const arrGame = this.state.game;
    arrGame.splice(index,1);
    this.setState({
      game: arrGame
    })
    const arrViewers = this.state.viewers;
    arrViewers.splice(index, 1);
    this.setState({
      viewers: arrViewers
    })
    }.bind(this), 300);
  }

  componentDidMount() {

    this.state.streamers.map((streamerName, index) =>
      this.getData(this.state.streamers[index])
    )
}

  render() {
    const twitchWebsite = 'https://twitch.tv/';
    const listItem = this.state.game.map((gameName, index) =>
    <li key={gameName[0]} id={gameName[0]} className={this.state.viewers[index] + "_ list_"}>
      <div className="listed">
        <div className="icon">
          <img src={gameName[1]} height="100" width="100" role="presentation"></img>
        </div>
        <div className="text">
          <a href={twitchWebsite + gameName[0]} target="_blank">
          <div className="name">
            {gameName[0]}
          </div></a>
          <div className="game">
            {gameName[2]}
          </div>
          <div> <p className={this.state.viewers[index]}>
            {gameName[3]}</p>
          </div>
          <div className="status">
            {gameName[4]}
          </div>
        </div>
        <div className="delete_div" onClick={()=>this.handleDelete(gameName[0], index)} id={index}>
          <img className="delete" src={require('./images/delete.svg')} alt="Delete" height="60" width="60" />
        </div>
      </div>
    </li>);
    return (
      <div className="content">
        <Addremove addStreamer={this.addStreamer.bind(this)} />
        <ul id="myul">
          {listItem}
        </ul>
      </div>
    );
  }
}

export default Content;
