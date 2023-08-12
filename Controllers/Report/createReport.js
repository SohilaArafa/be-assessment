const Report = require("../../Models/Report");

const createReport = async (check) => {
  const reports = await Report.find({
    checkId: check._id,
  });

  result = {};
  //if this check is new :
  if (!reports) {
    result = {
      checkId: check._id,
      url: check.url,
      name: check.name,
      ups: 0,
      curruntStatus: 0,
      availability: 0,
      outages: 0,
      downtime: 0,
      uptime: 0,
      averageResponseTime: 0,
      history: [],
    };
    return result;
  }
  //if this check has already report(s)
  curruntStatus = 0;
  availability = 0;
  outages = 0;
  downtime = 0;
  uptime = 0;
  ups = 0;
  averageResponseTime = 0;
  newestReportDate = reports[0]?.time; //latest with the dATE

  for (let i = 0; i < reports.length; i++) {
    if (reports[i].time > newestReportDate) {
      //latest report
      newestReportDate = reports[i].time;
      curruntStatus = reports[i].status;
    }
    if (reports[i].status == -1) {
      outages++;
      downtime += check.interval;
    } else {
      uptime += check.interval;
      averageResponseTime += reports[i].responseTime;
      ups++;
    }
  }

  averageResponseTime = averageResponseTime / ups;
  availability = (uptime / (uptime + downtime)) * 100;
  result = {
    checkId: check._id,
    url: check.url,
    name: check.name,
    ups,
    curruntStatus,
    availability,
    outages,
    downtime,
    uptime,
    averageResponseTime,
    history: reports,
  };
  return result;
};

module.exports = {
  createReport,
};
