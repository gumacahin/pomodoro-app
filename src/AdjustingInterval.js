class AdjustingInterval {

  constructor(workFunc, interval, errorFunc) {
    this.interval = interval;
    this.workFunc = workFunc;
    this.errorFunc = errorFunc;
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.step = this.step.bind(this);
  }

  start() {
    this.expected = Date.now() + this.interval;
    this.timeout = setTimeout(this.step, this.interval);
  }

  stop() {
    clearTimeout(this.timeout);
  }

  step() {
    const drift = Date.now() - this.expected;
    if (drift > this.interval) {
      if (this.errorFunc) this.errorFunc();
    }
    this.workFunc();
    this.expected += this.interval;
    this.timeout = setTimeout(this.step, Math.max(0, this.interval - drift));
  }
}

export default AdjustingInterval;
