export default {
  parsecsToLightYears (p) {
    return p ? p * 3.26156 : null
  },
  
  solarRadiiToKilometres (sr) {
    return sr ? sr * 695700 : null
  },
  
  jupiterRadiiToKilometres (jr) {
    return jr ? jr * 71492 : null
  }
}
