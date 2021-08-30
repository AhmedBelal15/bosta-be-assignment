const initialReport = (checkId) => {
  return {
    status: "up",
    availability: 0,
    outages: 0,
    downtime: 0,
    uptime: 0,
    responseTime: 0,
    check: checkId,
  };
};
module.exports = initialReport;
