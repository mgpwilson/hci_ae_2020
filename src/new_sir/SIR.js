import rk4 from "ode-rk4";

// From http://epirecip.es/epicookbook/chapters/sir/js
const copy = (x) => {
  return Object.assign({}, x);
};

const simulate = (f, t0, y0, step, tmax) => {
  var integrator = rk4(y0, f, t0, step);
  var t = t0;
  var y = y0;
  var ta = [];
  var ya = [];
  ta.push(t0);
  ya.push(copy(y));
  while (true) {
    t = t + step;
    if (t > tmax) break;
    integrator = integrator.step();
    ya.push(copy(integrator.y));
    ta.push(t);
  }
  return { t: ta, y: ya };
};

const sir = (dydt, y, t) => {
  dydt[0] = -b * y[0] * y[1];
  dydt[1] = b * y[0] * y[1] - g * y[1];
  dydt[2] = g * y[1];
};

// Using the forumla from the website, we have to work with max population being 1. We will adjust this in visualisations.
const b = 0.9; // Contact rate, this is what we want to adjust to flatten the curve

const g = 1 / 14; // Recovery rate, 1 / mean amount of days it takes to recover
const I0 = 0.001; // Initial infected (as a percentage of the population)
const R0 = 0; // Initial recovered (as a percentage of the population)
const S0 = 1 - I0 - R0; // Initial susceptible
const step = 1; // Time step, 1 day
const tmax = 159; // Max time, 159+1 days

var sir_simulation = simulate(sir, 0, [S0, I0, R0], step, tmax);

export default sir_simulation;

// WIP class, not doing anything right now, trying to make this work with React essentially
class SIR {
  constructor(
    initialInfected = 0.001,
    initialRecovered = 0,
    max_time = 159,
    contactRate = 0.9,
    recoveryRate = 1 / 14
  ) {
    this.I0 = initialInfected;
    this.R0 = initialRecovered;
    this.max_time = max_time;
    this.contactRate = contactRate;
    this.recoveryRate = recoveryRate;
  }

  simulate(f, t0) {
    var y0 = [1 - this.I0 - this.R0, this.I0, this.R0]; // [S, I, R]
    var integrator = rk4(y0, sir, 0, 1); // [Initial SIR, SIR function, initial time, timestep]
    var t = 0; // Initial time: 0 days
    var y = y0;
    var ya = []; // Results list
    ya.push(copy(y));
    while (true) {
      t = t + 1;
      if (t > this.max_time) break;
      integrator = integrator.step();
      ya.push(copy(integrator.y));
    }
    return ya;
  }
}
