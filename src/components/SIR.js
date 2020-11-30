import rk4 from "ode-rk4";

// Code derived from http://epirecip.es/epicookbook/chapters/sir/js
const copy = (x) => {
  return Object.assign({}, x);
};

class SIR {
  constructor(contactRate) {
    this.initialInfected = 0.009;
    this.initialRecovered = 0;
    this.initialDead = 0;

    this.recoveryRate = 1 / 14; // Recovery rate, 1 / mean amount of days it takes to recover
    this.contactRate = contactRate; // Contact rate, this is what we want to adjust to flatten the curve
    this.deathRate = 0.04;

    /*this.avgLengthOfInfection = 14;
    this.hospitalizationRate = 0.075;
    this.ICUBeds = 585;
    this.hospitalBeds = 20553;*/

    this.max_days = 120;
    this.population = 5463000;
  }

  derive = (dydt, y, t) => {
    dydt[0] = -this.contactRate * y[0] * y[1];
    dydt[1] = this.contactRate * y[0] * y[1] - this.recoveryRate * y[1];
    dydt[2] = this.recoveryRate * y[1];
    dydt[3] = this.deathRate * y[1];
  };

  get simulation() {
    let initialSuscepitble = 1 - this.initialInfected - this.initialRecovered;
    const initialSIR = [
      initialSuscepitble,
      this.initialInfected,
      this.initialRecovered,
      this.initialDead,
    ]; // [S, I, R]
    var integrator = rk4(initialSIR, this.derive, 0, 1); // [Initial SIR, SIR function, initial time, timestep]
    var days = 0; // Initial time: 0 days
    var y = initialSIR;
    var ya = []; // Results list
    ya.push(copy(y));
    while (true) {
      days = days + 1;
      if (days > this.max_days) break;
      integrator = integrator.step();
      ya.push(copy(integrator.y));
    }
    return ya;
  }

  setContactRate(contactRate) {
    console.log(this.contactRate);
    this.contactRate = contactRate;
    console.log(this.contactRate);
  }

  getSusceptibleAtDay(day) {
    return Math.round(this.simulation[day][1] * this.population);
  }

  getInfectedAtDay(day) {
    return Math.round(this.simulation[day][1] * this.population);
  }

  getRecoveredAtDay(day) {
    return Math.round(this.simulation[day][1] * this.population);
  }

  getDeathsAtDay(day) {
    return Math.round(this.simulation[day][1] * this.population);
  }

  /*getHospitalCapacityByDay(day) {
    let recentlyInfect = 0;
    let i = day - this.avgLengthOfInfection;
    while(i > 0 && i <= day){
      recentlyInfect += this.getInfectedAtDay(i);
    }
    console.log(i, recentlyInfect, (recentlyInfect - this.getDeathsAtDay(day) / this.hospitalBeds));
    /!*for (let i=day-)*!/
  }*/

  getPopulation() {
    return this.population;
  }
}

export default SIR;
