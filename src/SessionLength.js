import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class SessionLength extends React.Component {

  render() {
    const {sessionIncrement, sessionDecrement, sessionLength} = this.props;
    return (
      <div className="col adjuster">
        <h2 className="text-nowrap" id="session-label">Session Length</h2>
        <div className="adjuster-ui">
          <button onClick={sessionIncrement} id="session-increment"><span className="sr-only">increase session length</span><FontAwesomeIcon icon="arrow-up" /></button>
          <div className="d-inline-block w-25 h1 rounded" id="session-length">{ sessionLength }</div>
          <button onClick={sessionDecrement} id="session-decrement"><span className="sr-only">decrease session length</span><FontAwesomeIcon icon="arrow-down"/></button>
        </div>
      </div>
    );
  }
}
