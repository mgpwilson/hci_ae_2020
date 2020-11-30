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

    this.max_days = 120;
    this.population = 5463000;
    this.bedCapacity = 20553;
    this.ventilatorCapacity = 585;
    this.hospitalizationRate = 0.075;
    this.ventilationRate = 0.028; // of hospitalized people
  }

  derive = (dydt, y, t) => {
    dydt[0] = -this.contactRate * y[0] * y[1];
    dydt[1] =
      this.contactRate * y[0] * y[1] -
      this.recoveryRate * y[1] -
      this.deathRate * y[1];
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
    // console.log(this.contactRate);
    this.contactRate = contactRate;
    // console.log(this.contactRate);
  }

  getSusceptibleAtDay(day) {
    return Math.round(this.simulation[day][0] * this.population);
  }

  getInfectedAtDay(day) {
    return Math.round(this.simulation[day][1] * this.population);
  }

  getRecoveredAtDay(day) {
    return Math.round(this.simulation[day][2] * this.population);
  }

  getDeathsAtDay(day) {
    return Math.round(this.simulation[day][3] * this.population);
  }

  getBedCapacityMinusCasesAtDay(day) {
    return this.bedCapacity - (this.getInfectedAtDay(day) * this.hospitalizationRate);
  }

  getTotalHospitalCapacityOverFlow(){
    let overflow = 0;
    for (let i=0; i <= this.max_days; i++){
      overflow += this.getBedCapacityMinusCasesAtDay(i);
    }
    return overflow;
  }

  getVentilatorCapacityMinusCasesAtDay(day) {
    let hospitalized = (this.getInfectedAtDay(day) * this.hospitalizationRate);
    return this.ventilatorCapacity - (hospitalized * this.ventilationRate);
  }

  getTotalVentilatorCapacityOverFlow(){
    let overflow = 0;
    for (let i=0; i <= this.max_days; i++){
      overflow += this.getVentilatorCapacityMinusCasesAtDay(i);
    }
    return overflow;
  }

  getTotalInfections(days) {
    let total = 0;
    for (let i=0; i <= days; i++){
      total += this.getInfectedAtDay(i);
    }
    return total;
  }

  getTotalDeaths(days) {
    let total = 0;
    for (let i=0; i <= days; i++){
      total += this.getDeathsAtDay(i);
    }
    return total;
  }
}

export default SIR;
