const generateReport = (
  response,
  statusCode,
  prevReport,
  timeBetweenChecks
) => {
  const report = {
    ...prevReport._doc,
    responseTime: (response.time + prevReport.responseTime) / 2,
  };
  if (response.status !== statusCode) {
    report.status = "down";
    report.outages = prevReport.outages + 1;
    report.downtime = prevReport.downtime + timeBetweenChecks;
    report.faliuresSinceLastAlert++;
  } else {
    report.status = "up";
    report.uptime = prevReport.uptime + timeBetweenChecks;
    report.availability =
      (report.uptime / (report.uptime + report.downtime)) * 100;
    report.faliuresSinceLastAlert = 0;
  }
  return report;
};

module.exports = generateReport;
