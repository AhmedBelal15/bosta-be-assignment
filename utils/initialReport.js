const initialReport = (checkId, userId, tags) => {
  return {
    status: "up",
    availability: 0,
    outages: 0,
    downtime: 0,
    uptime: 0,
    responseTime: 0,
    check: checkId,
    user: userId,
    tags
  };
};
module.exports = initialReport;
