var path = require('path')
var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var fetch = require('isomorphic-fetch')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var Playlyfe = require('playlyfe').Playlyfe;
var PlaylyfeException = require('playlyfe').PlaylyfeException;
var MongoClient = require('mongodb').MongoClient
var moment = require('moment')
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

app.use(session({ resave: true, saveUninitialized: false, secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
app.use(function(req, res, next) {
  if (!req.session.user) {
    req.session.user_id = 1
  }
  next()
})

app.use(cookieParser())
app.use(bodyParser.json({ strict: true }))
app.use(function(req, res, next){
  console.log(req.path)
  next()
})

app.all('/api/*', function(req, res) {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  req.query.player_id = req.session.user_id
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

app.all('/ola/*', function(req, res) {
  headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-APP-Token': '883fec6fca1b413c9032b19f48a04958',
  }
  if (req.query.access_token) {
    headers['Authorization'] = 'Bearer '+req.query.access_token
    delete req.query.access_token
  }
  fetch(req.path.replace('/ola/', 'http://sandbox-t.olacabs.com/'), {
    method: req.method,
    headers: headers,
    body: req.body
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(json) {
    res.status(200).json(json)
  })
  .catch(function(err) {
    console.log(err)
    res.status(500).json({ err: err })
  })
})

function updateStreak(req, cb) {
  tracks_mgc.update({ user_id: req.session.user_id, year: 2015 }, { $push: { streak: 1 } }, { upsert: true }, cb)
}

function calculateStreak(req, cb) {
  tracks_mgc.findOne({ user_id: req.session.user_id, year: 2015 }, function(err, doc) {
    if (err) {
      return cb(err, null)
    }
    count = 0
    no_of_weeks = 4
    for(var i=doc.streak.length-1;i>= Math.max(0, doc.streak.length-no_of_weeks);i--) {
      if (doc.streak[i] === 1) {
        count += 1
      } else {
        count = 0
      }
    }
    cb(null, count)
  })
}

function playAction(action_id, variables, req, res) {
  calculateStreak(req, function(err, count) {
    if (err) {
      return res.status(500).json({err: err})
    }
    variables.streak = count
    pl.post('/runtime/actions/'+action_id+'/play', { player_id: req.session.user_id }, { variables: variables })
    .then(function(){ res.status(200).json({ ok: 1}) })
    .catch(function(err){res.status(500).json({err: err})})
  })
}

app.post('/end_ride', function(req, res) {
  updateStreak(req, function(err, doc) {
    if (err) {
      return res.status(500).json({err: err})
    }
    playAction('end_ride', {
      type: 1,
      duration: 500,
      distance: 4//req.body.trip_info.distance.value
    }, req, res)
  })
});

app.post('/share_on_facebook', function(req, res) {
  playAction('share_on_facebook', {}, req, res)
})

app.post('/tweet_on_twitter', function(req, res) {
  playAction('tweet_on_twitter', {}, req, res)
})

app.get('/streak', function(req, res) {
  calculateStreak(req, function(err, count) {
    if (err) {
      return res.status(500).json({err: err})
    }
    return res.status(200).json({ streak: count })
  })
});

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// take a ride
// schedule it
// prefer driver -> rating of driver -> you just pick a driver who is close to you

// Availability
// https://devapi.olacabs.com/v1/products?pickup_lat=12.9491416&pickup_lng=77.64298
// Book
// http://devapi.olacabs.com/v1/booking/create?pickup_lat=12.9490936&pickup_lng=77.6443056&pickup_mode=NOW&category=sedan
// Track
// http://devapi.olacabs.com/v1/bookings/track_ride

MongoClient.connect('mongodb://localhost:27017/core', function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  tracks_mgc = db.collection('tracks')
  app.listen(80, 'localhost', function(err) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Listening at http://localhost');
  });
});

