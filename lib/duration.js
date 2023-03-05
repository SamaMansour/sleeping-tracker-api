const duration = (sleepTime, wakeupTime) =>{
  const durationHours = newDate(wakeupTime - sleepTime).getUTCHours();
  const durationMinutes = newDate(wakeupTime - sleepTime).getUTCMinutes();
  const duration = durationHours + durationMinutes /60;

  return duration;

}

module.exports = duration;