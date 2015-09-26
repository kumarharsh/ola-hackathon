var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var Playlyfe = require('playlyfe').Playlyfe;
var PlaylyfeException = require('playlyfe').PlaylyfeException;
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var tracks_mgc

var app = express();
var compiler = webpack(config);

var pl = new Playlyfe({
  type: 'client',
  version: 'v2',
  client_id: "NzA5MDFhNzEtOThhNy00MjEyLTgxZTgtYmZlZTZhNjdkYjIy",
  client_secret: "MzkyZTU2NTUtMzNiMC00Y2EyLThlNzctYTQyOGIzNTE5ZTdkNmIwNGZkZDAtNjQ2Mi0xMWU1LTllN2EtYzk4M2FhZTQwODA3"
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use('/public', express.static(__dirname + '/public'));
app.use(require('webpack-hot-middleware')(compiler));

app.all('/api/*', function(req, res) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  return pl.api(req.method, req.path.replace('/api', ''), req.query, req.body, true).then(function(response) {
    var header, ref, value;
    ref = response.headers;
    for (header in ref) {
      value = ref[header];
      res.header(header, value);
    }
    return res.status(200).end(response.body);
  })["catch"](PlaylyfeException, function(err) {
    var header, ref, value;
    ref = err.headers;
    for (header in ref) {
      value = ref[header];
      res.header(header, value);
    }
    return res.status(err.status).json(err.toJSON());
  })["catch"](function(err) {
    return res.status(500).json({
      error: "server_error",
      error_description: "An unexpected error occured while trying to contact the Playlyfe API"
    });
  });
})

app.get('/end', function(req, res) {
  tracks_mgc.save({gello: 1}, function(err, docs) {
    assert.equal(err, null);
    res.status(200).json({ ok: 1})
  })
});

app.get('/history', function(req, res) {
  tracks_mgc.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    res.status(200).json(docs)
  });

});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

MongoClient.connect('mongodb://localhost:27017/core', function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  tracks_mgc = db.collection('tester')
    app.listen(80, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost');
  });
});

