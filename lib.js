const schedule = require("./hours");

module.exports = {
  isOpen,
  getTodaysSchedule,
  timeToDate,
  dateFormat,
  timeFormat
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
    nowDate: dateFormat(dateObj),
    nowTime: timeFormat(dateObj)
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

function timeToDate(timeStr, now = new Date()) {
  const [h, m] = timeStr.split(":", 2).map(Number);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  return new Date(year, month, day, h, m);
}

function dateFormat(dateObj = new Date(), dateStyle = "full") {
  return dateObj.toLocaleDateString([], { dateStyle });
}

function timeFormat(dateObj = new Date(), timeStyle = "short") {
  return dateObj.toLocaleTimeString([], { timeStyle });
}
