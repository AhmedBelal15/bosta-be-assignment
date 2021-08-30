const sendCheckRequest = require("./sendCheckRequest");
const generateReport = require('./generateReport');
const notify = require('./notify');
const performChecks = async (check, prevReport) => {
  const ignoreSSL = check.ignoreSSL;
  const httpHeaders = check.httpHeaders;
  const authentication = check.authentication;
  const url = check.url
  let headers = {}
  if(authentication){
      headers.authentication = authentication
  }

  if(httpHeaders){
    headers = {...headers, ...httpHeaders}
  }

    const response = await sendCheckRequest(url, "GET", headers, undefined, ignoreSSL);
    const statusCode = check.assert.statusCode || 200;
    //convert from minutes to seconds
    const timeBetweenChecks = check.interval * 60 
    const report = generateReport(response, statusCode, prevReport, timeBetweenChecks)
    if(report.faliuresSinceLastAlert >= check.threshold){
        notify.notifyFaliureByMail(check.user.email, check.url)
        notify.notifyFaliureByWebhook(check.webhook, check.url)
        report.resetFaliure= true
      }
    return report;
};

module.exports = performChecks;
