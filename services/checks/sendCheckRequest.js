const fetch = require("node-fetch");
const { PerformanceObserver, performance } = require("perf_hooks");
const https = require("https");
const ignoreSSLAgent = new https.Agent({
  rejectUnauthorized: false,
});

const sendCheckRequest = async (url, method, headers, body, ignoreSSL) => {
  let requestAgent = null;
  if(ignoreSSL){
    requestAgent = ignoreSSLAgent
  }
  performance.mark("start");
  const response = await fetch(url, {
    method,
    headers,
    body,
    agent: requestAgent,
  });
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

module.exports = sendCheckRequest;
