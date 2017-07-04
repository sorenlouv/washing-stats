const got = require('got');
const cheerio = require('cheerio');
const AWS = require('aws-sdk');

exports.handler = (event, context, callback) => {
  function getCountByIndex($, index) {
    const tables = $('table.Live');
    const items = tables
      .eq(index)
      .find('tbody td.Live')
      .map((i, elm) => {
        return $(elm).find('table table').attr('bgcolor') === 'Green';
      })
      .toArray();

    // count number of "true" values
    const available = items.reduce((count, value) => count + value, 0);

    return {
      available,
      total: items.length
    };
  }

  got('http://www.turtavlen.dk/ep.aspx?id=48', {
    method: 'post',
    form: true,
    body: {
      __EVENTTARGET: 'ctl00$ContentPlaceHolder1$Booking1',
      __EVENTARGUMENT: 'mNpmmcALELu8TnjLlPpEaA=='
    }
  })
    .then(res => {
      const $ = cheerio.load(res.body);
      const washers = getCountByIndex($, 0);
      const dryers = getCountByIndex($, 1);
      const showers = {
        available:
          getCountByIndex($, 2).available +
          getCountByIndex($, 3).available +
          getCountByIndex($, 4).available,
        total: 3
      };

      const item = {
        time: Date.now(),
        washers,
        dryers,
        showers
      };

      const docClient = new AWS.DynamoDB.DocumentClient();
      const params = {
        TableName: 'Availability',
        Item: item
      };

      docClient.put(params, err => {
        if (err) {
          console.error('PutItem failed', err);
          callback(err);
        } else {
          callback(null, item);
          console.log('PutItem succeeded');
        }
      });
    })
    .catch(err => {
      console.error(err);
      callback(err);
    });
};
