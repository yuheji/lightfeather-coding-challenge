const https = require('https');

function getSupervisors(req, res) {
    getSupervisorData((result) => {
        res.send(processSupervisorsData(result));
    });
};

/**
 * Makes call to mockapi.io for supervisors data
 * @param {requestCallback} callback 
 */
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
        res.on('data', d => {
            data += d;
            callback(JSON.parse(data));
        });
    });

    req.on('error', error => {
        console.error(error)
    });

    req.end();
}

/**
 * Cleans up supervisors list, removing number jurisdictions and sorting alphabetically
 * @param {Object[]} dataArray 
 * @returns Processed list of supervisors
 */
function processSupervisorsData(dataArray) {
    let returnList = [];
    dataArray.forEach((supervisor) => {
        if (isNaN(supervisor.jurisdiction)) {
            const supervisorString = `${supervisor.jurisdiction} - ${supervisor.lastName}, ${supervisor.firstName}`
            returnList.push(supervisorString);
        }
    });
    returnList.sort();
    return returnList;
}

module.exports = {
    getSupervisors: getSupervisors,
    getSupervisorData: getSupervisorData
};
