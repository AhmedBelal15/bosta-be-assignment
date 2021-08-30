const fetch = require("node-fetch");
const { PerformanceObserver, performance } = require("perf_hooks");

const sendRequest = async (url) => {
  performance.mark("start");
  const response = await fetch(url);
  performance.mark("end");

  let duration;
  const obs = new PerformanceObserver((list, observer) => {
    duration = list.getEntries()[0].duration;
    performance.clearMarks();
    observer.disconnect();
  });
  obs.observe({ entryTypes: ["measure"] });
  performance.measure("duration", "start", "end");
  response.time = duration;
  return response;
};

module.exports = sendRequest;
