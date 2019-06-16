import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faRedo, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import alarm from './Alarm_Clock.mp3';
import BreakLength from './BreakLength';
import SessionLength from './SessionLength';
import Clock from './Clock';
import AdjustingInterval from './AdjustingInterval';

library.add(faArrowUp);
library.add(faArrowDown);
library.add(faRedo);
library.add(faPlay);
library.add(faPause);

const TITLE = 'Pomodoro Clock';

class Pomodoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: this.props.breakLength,
      sessionLength: this.props.sessionLength,
      timeLeft: this.props.sessionLength * 60,
      started: false,
      paused: false,
      mode: 'Session'
    };


    this.breakIncrement = this.breakIncrement.bind(this);
    this.breakDecrement = this.breakDecrement.bind(this);
    this.sessionIncrement = this.sessionIncrement.bind(this);
    this.sessionDecrement = this.sessionDecrement.bind(this);
    this.reset = this.reset.bind(this);
    this.tick = this.tick.bind(this);
    this.playPause = this.playPause.bind(this);

    this.timer = new AdjustingInterval(this.tick, 1000, () => { console.log('Too much drift!'); })
  }

  render() {
    const {sessionLength, breakLength, mode, timeLeft, paused, started} = this.state;
    return (
      <div className="container-fluid" id="PomodoroApp">
        <h1 id="title">{TITLE}</h1>
        <div className="row" id="break-session-wrapper">
            <BreakLength breakIncrement={this.breakIncrement} breakDecrement={this.breakDecrement} breakLength={breakLength} />
            <SessionLength sessionIncrement={this.sessionIncrement} sessionDecrement={this.sessionDecrement} sessionLength={sessionLength} />
        </div>
        <Clock mode={mode} timeLeft={timeLeft} />
        <div id="buttons-wrapper">
          <button onClick={this.playPause} id="start_stop"><span class="sr-only">Start/Stop</span>{ (paused || !started)  ? <FontAwesomeIcon icon="play" /> : <FontAwesomeIcon icon="pause" /> }</button>
          <button onClick={this.reset} id="reset"><span class="sr-only">Reset</span><FontAwesomeIcon icon="redo" /></button>
        </div>
        <audio id="beep" src={alarm} type="audio/mp3" />
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
    this.timer.stop();
    document.getElementById('beep').load();
    this.setState({
      breakLength: this.props.breakLength,
      sessionLength: this.props.sessionLength,
      timeLeft: this.props.sessionLength * 60,
      started: false,
      paused: false,
      mode: 'Session'
    });
  }

  tick() {
    let timeLeft = this.state.timeLeft - 1
    this.setState({ timeLeft });

    if (timeLeft === -1) {
      this.beep();
      this.switchMode();
    }
    this.setTitle();
  }

  setTitle() {
    let time = this.formatTime(this.state.timeLeft);
    document.getElementsByTagName('title')[0].innerText = this.state.mode + '—' + time + '—' + TITLE
  }

  formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return  (mins < 10 ? '0' : '' ) + mins + ":" + (secs < 10 ? '0' : '') + secs;
  }

  playPause() {
    this.setState((state) => {
      if (state.started === false) {
        return {
          paused: false,
          started: true,
          timeLeft: state.sessionLength * 60
        }
      }
      return {
        paused: !state.paused
      }
    }, () => {
      if (this.state.paused) {
        this.timer.stop();
        return;
      }
      this.timer.start();
      return;
    });
  }

  switchMode() {
    if (this.state.mode === 'Session') {
      this.setState({
        mode: 'Break',
        timeLeft: this.state.breakLength * 60
      });
    } else {
      this.setState({
        mode: 'Session',
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
