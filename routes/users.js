var express = require('express');
var router = express.Router();
var request = require('request');

var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  // let html = fs.readFileSync('finofilipino.txt')
  // res.send(html)
  // return
  
var options = {
  'method': 'GET',
  'url': 'https://finofilipino.org',
};
request(options, function (error, response) {
  let html
  if (error || response.statusCode >= 300) {
    try {
      html = fs.readFileSync('finofilipino.txt')
      res.send(html)
    } catch (err) {
      res.status(500).send(err)

    }
    return
  }
  try {
    fs.writeFileSync('finofilipino.txt', response.body);
    res.send(response.body)
  } catch (err) {
    res.status(500).send(err)
  }
});

});

module.exports = router;
