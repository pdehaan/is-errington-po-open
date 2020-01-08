const schedule = require("./hours");

module.exports = {
  isOpen,
  getTodaysSchedule
};

function isOpen(dateObj = new Date()) {
  const currentTime = nowToMins(dateObj);
  let $label = "closed";

  // Loop over the current day's schedule and exit early if a match is found.
  getTodaysSchedule(dateObj).some(([open, close, label = "open"]) => {
    if (currentTime >= timeToMins(open) && currentTime < timeToMins(close)) {
      $label = label;
      return true;
    }
  });

  return {
    isOpen: $label === "open",
    label: $label,
    now: dateObj,
    nowDate: dateObj.toLocaleDateString([], { dateStyle: "full" }),
    nowTime: dateObj.toLocaleTimeString([], { timeStyle: "short" })
  };
}

function getTodaysSchedule(dateObj = new Date()) {
  const today = dateObj.getDay();
  return schedule[today];
}

function timeToMins(timeStr) {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
}

function nowToMins(dateObj = new Date()) {
  return dateObj.getHours() * 60 + dateObj.getMinutes();
}
