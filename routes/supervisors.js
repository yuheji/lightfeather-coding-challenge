const express = require('express');
const https = require('https');
const router = express.Router();

router.get('/api/supervisors', function (req, res, next) {
  // res.send('respond with a resource');
  console.log("get supervisors!!!");
  getSupervisorData((result) => {
    // console.log(result);
    res.send(processSupervisorsData(result));
  });
});

module.exports = router;

function getSupervisorData(callback) {
  const supervisorsDataUri = '609aae2c0f5a13001721bb02.mockapi.io';
  const supervisorsDataPath = '/lightfeather/managers';
  const supervisorsRequestOptions = {
    hostname: supervisorsDataUri,
    port: 443,
    path: supervisorsDataPath,
    method: 'GET',
  };
  let data = '';

  const req = https.request(supervisorsRequestOptions, res => {
    console.log(`statusCode: ${res.statusCode}`)
    res.on('data', d => {
      data += d;
      // process.stdout.write(d)
      callback(JSON.parse(data));
    });   
  });

  req.on('error', error => {
    console.error(error)
  });

  req.end();
}

function processSupervisorsData(dataArray) {
  let tempList = [];
  dataArray.forEach((supervisor) => {
    if (isNaN(supervisor.jurisdiction)) {
      const supervisorString = `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
      tempList.push(supervisorString);
    }
  });
  tempList.sort();
  return tempList;
}
