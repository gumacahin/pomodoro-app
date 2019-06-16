import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class BreakLength extends React.Component {
  render() {
    const {breakIncrement, breakDecrement, breakLength} = this.props;
    return (
      <div className="col adjuster">
        <h2 className="text-nowrap" id="break-label">Break Length</h2>
        <div className="adjuster-ui">
          <button onClick={breakIncrement} id="break-increment"><span className="sr-only">increase break length</span><FontAwesomeIcon icon="arrow-up" /></button>
          <div className="h1 rounded" id="break-length">{ breakLength }</div>
          <button onClick={breakDecrement} id="break-decrement"><span className="sr-only">decrease break length</span><FontAwesomeIcon icon="arrow-down" /></button>
        </div>
      </div>
    );
  }
}
