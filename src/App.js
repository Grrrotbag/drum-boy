import React from "react";
import "./App.css";
import { drumSounds, synthSounds } from "./components/Sounds";
import Display from "./components/Display";
import DrumPadButton from "./components/DrumPadButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeDown, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: drumSounds,
      displayText: "Ready...",
      vol: 0.5,
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleVolume = this.handleVolume.bind(this);
    this.handleDrumMode = this.handleDrumMode.bind(this);
    this.handleSynthMode = this.handleSynthMode.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(event) {
    console.log(event);
    for (let i = 0; i < this.state.mode.length; i++) {
      if (event.keyCode == this.state.mode[i].keyCode) {
        this.playSound(this.state.mode[i].keyTrigger, this.state.mode[i].id);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  playSound(keyTrigger, keyId) {
    const sound = document.getElementById(keyTrigger);
    sound.currentTime = 0;
    sound.play();
    sound.volume = this.state.vol;
    this.setState({
      displayText: keyId,
    });
  }

  handleVolume(event) {
    this.setState({
      vol: event.target.value,
    });
  }

  handleDrumMode() {
    this.setState({
      mode: drumSounds,
    });
  }

  handleSynthMode() {
    this.setState({
      mode: synthSounds,
    });
  }

  render() {
    return (
      <div id="drum-machine">
        <div id="title">
          <h1>Drum Boy</h1>
        </div>
        <div id="display">
          <Display text={this.state.displayText} vol={this.state.vol} mode={this.state.mode} />
        </div>
        <div id="controls-container">
          <div className="volume-container">
            <label className="volume-label-left">
              <FontAwesomeIcon icon={faVolumeDown} />
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={this.state.vol}
              className="range blue"
              onChange={this.handleVolume}
            />
            <label className="volume-label-right">
              <FontAwesomeIcon icon={faVolumeUp} />
            </label>
          </div>
          <div id="mode-button-container">
            <button className="btn mode-btn" onClick={this.handleDrumMode}>
              Retro
            </button>
            <button className="btn mode-btn" onClick={this.handleSynthMode}>
              Synth
            </button>
            <label className="button-label">MODE</label>
          </div>
        </div>
        <div id="keypad">
          {this.state.mode.map((item, index) => (
            <DrumPadButton
              key={index}
              id={item.id}
              keyTrigger={item.keyTrigger}
              url={item.url}
              play={() => this.playSound(item.keyTrigger, item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
