import React, { Component } from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faRedo, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

library.add(faArrowUp);
library.add(faArrowDown);
library.add(faRedo);
library.add(faPlay);
library.add(faPause);

const AUDIO_SRC = 'https://dl.dropboxusercontent.com/s/237aouv31ikt7li/Alarm_Clock.mp3?dl=0';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: this.props.breakLength,
      sessionLength: this.props.sessionLength,
      timeLeft: this.props.sessionLength * 60,
      interval: null,
      started: false,
      mode: 'session'
    };

    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
    this.startStop = this.startStop.bind(this);
  }

  render() {
    return (
      <div id="PomodoroApp">
        <div id="title">Pomorodo Clock</div>
        <div id="break-session-wrapper">
            <div className="adjuster">
              <div id="break-label">Break Length</div>
              <div className="adjuster-ui">
                <button onClick={this.breakIncrement} id="break-increment"><FontAwesomeIcon icon="arrow-up" /></button>
                <div id="break-length">{ this.state.breakLength }</div>
                <button onClick={this.breakDecrement} id="break-decrement"><FontAwesomeIcon icon="arrow-down" /></button>
              </div>
            </div>
            <div className="adjuster">
              <div id="session-label">Session Length</div>
              <div className="adjuster-ui">
                <button onClick={this.sessionIncrement} id="session-increment"><FontAwesomeIcon icon="arrow-up" /></button>
                <div id="session-length">{ this.state.sessionLength }</div>
                <button onClick={this.sessionDecrement} id="session-decrement"><FontAwesomeIcon icon="arrow-down"/></button>
              </div>
            </div>
        </div>
        <div id="timer-wrapper">
          <div id="timer-label">{this.state.mode}</div>
          <div id="time-left">{ this.formatTime(this.state.timeLeft) }</div>
        </div>
        <div id="buttons-wrapper">
          <button onClick={this.startStop} id="start_stop">{ this.state.interval ? <FontAwesomeIcon icon="pause" /> : <FontAwesomeIcon icon="play" /> }</button>
          <button onClick={this.reset} id="reset"><FontAwesomeIcon icon="redo" /></button>
        </div>
        <audio id="beep" src={AUDIO_SRC} type="audio/mp3" />
      </div>
    );
  }

  breakIncrement(e) {
    if (this.state.breakLength === 60) {
      return;
    }
    this.setState({
      breakLength: this.state.breakLength + 1
    });
  }

  breakDecrement(e) {
    if (this.state.breakLength === 1) {
      return;
    }
    this.setState({
      breakLength: this.state.breakLength - 1
    });
  }

  sessionIncrement(e) {
    if (this.state.sessionLength === 60) {
      return;
    }
    this.setState({
      sessionLength: this.state.sessionLength + 1
    });
  }

  sessionDecrement(e) {
    if (this.state.sessionLength === 1) {
      return;
    }
    this.setState({
      sessionLength: this.state.sessionLength - 1
    });
  }

  reset() {
    clearInterval(this.state.interval);
    document.getElementById('beep').load();
    this.setState({
      breakLength: this.props.breakLength,
      sessionLength: this.props.sessionLength,
      timeLeft: this.props.sessionLength * 60,
      interval: null,
      started: false,
      mode: 'session'
    });
  }

  tick() {
    let timeLeft = this.state.timeLeft - 1
    this.setState({ timeLeft });

    if (timeLeft === -1) {
      this.beep();
      this.switchMode();
    }
  }

  formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return  (mins < 10 ? '0' : '' ) + mins + ":" + (secs < 10 ? '0' : '') + secs;
  }

  startStop() {
    if (!this.state.started) {
      this.setState({
        started: true,
        timeLeft: this.state.sessionLength * 60
  
      });
    }

    if (this.state.interval === null) {
      let interval = setInterval(this.tick, 1000);
      this.setState({ interval });
      return;
    }

    clearInterval(this.state.interval);
    this.setState({
      interval: null
    });
  }

  switchMode() {
    if (this.state.mode === 'session') {
      this.setState({
        mode: 'break',
        timeLeft: this.state.breakLength * 60
      });
    } else {
      this.setState({
        mode: 'session',
        timeLeft: this.state.sessionLength * 60
      });
    }
  }

  beep() {
    document.getElementById('beep').play();
  }
}

Pomodoro.defaultProps = {
  breakLength: 5,
  sessionLength: 25
};

class App extends Component {
  render() {
    return (
      <Pomodoro />
    );
  }
}

export default App;
