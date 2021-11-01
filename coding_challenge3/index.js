const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

const records = [];
fs.createReadStream('mockData.csv')
  .pipe(csv())
  .on('data', (row) => {
    records.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
    const group = groupBy(records, 'Insurance Company');
    console.log(group);

    group.forEach((insuranceCompany) => {
      insuranceCompany.sort((userA, userB) => {
        return userA['First and Last Name'].localeCompare(
          userB['First and Last Name']
        );
      });
    });

    const uniqueUserGroup = group.map((insuranceCompany) => {
      const unique = Object.values(
          insuranceCompany.reduce((accumulator, user) => {
            
          if (!accumulator[user['User Id']]) {
            accumulator[user['User Id']] = user;
          }

          // check to get the lastest version
          if (accumulator[user['User Id']].Version < user.Version) {
            accumulator[user['User Id']].Version = user.Version;
          }

          return accumulator;
        }, {})
      );
      return unique;
    });

    // write each insurance to file
    uniqueUserGroup.forEach((insuranceCompany) => {
      const csvWriter = createCsvWriter({
        path: `./${insuranceCompany[0]['Insurance Company']}.csv`,
        header: [
          { id: 'User Id', title: 'User Id' },
          { id: 'First and Last Name', title: 'First and Last Name' },
          { id: 'Version', title: 'Version' },
          { id: 'Insurance Company', title: 'Insurance Company' },
        ],
      });

      csvWriter
        .writeRecords(insuranceCompany) // returns a promise
        .then(() => {
          console.log('...done writing');
        });
    });
  });

function groupBy(collection, property) {
  var i = 0,
    val,
    index,
    values = [],
    result = [];
  for (; i < collection.length; i++) {
    val = collection[i][property];
    index = values.indexOf(val);
    if (index > -1) result[index].push(collection[i]);
    else {
      values.push(val);
      result.push([collection[i]]);
    }
  }
  return result;
}
