const generateReport = (
  response,
  statusCode,
  prevReport,
  timeBetweenChecks
) => {
  const report = {
    ...prevReport,
    responseTime: (response.time + prevReport.responseTime) / 2,
  };

  if (response.status !== statusCode) {
    report.status = "down";
    report.outages = prevReport.outages + 1;
    report.downtime = prevReport.downtime + timeBetweenChecks;
  } else {
    report.status = "up";
    report.uptime = prevReport.uptime + timeBetweenChecks;
    report.availability =
      (report.uptime / (report.uptime + report.downtime)) * 100;
  }
  return report;
};

module.exports = generateReport;
