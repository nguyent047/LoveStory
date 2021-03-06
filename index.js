/* eslint-disable semi */

var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer')
var mysql = require('mysql')
var argon2 = require('argon2')
var session = require('express-session')
var app = express()

require('dotenv').config()

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

connection.connect()

var upload = multer({dest: 'static/upload/'})

app
  .use(express.static('static'))
  .use(bodyParser.urlencoded({extended: true}))
  .use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  }))
  .set('view engine', 'ejs')
  .set('views', 'view')
  .get('/', index)
  .get('/verhalen', storylist)
  .get('/:id', story)
  .get('/:id', story)
  .get('/registreren', registerForm)
  .post('/registreren', register)
  .get('/login', logForm)
  .post('/login', log)
  .get('/profiel', profile)
  .get('/edit', editPage)
  .post('/edit', edit)
  .post('/remove', remove)
  .get('/log-out', logout)
  .use(notFound)
  .listen(2000)

/**** Home page *****/

function index(req, res, next) {
  res.render('index.ejs')
}

/**** All stories *****/

function storylist(req, res, next) {
  connection.query('SELECT * FROM stories', display)

  function display(err, data){
    if (err) {
      next(err)
    } else {
      res.render('verhalen.ejs', {user: req.session.user, data: data})
    }
  }
}

/**** Story *****/

function story(req, res, next) {
  var id = req.params.id

  connection.query('SELECT * FROM stories WHERE id = ?', id, display)

  function display(err, data) {
    if (err) {
      next(err)
    } else if (data.length === 0) {
      next()
    } else {

      res.render('verhaal.ejs', {user: req.session.user, data: data[0]})
    }
  }
}

/**** Register *****/

function registerForm(req, res) {
  res.render('registreren.ejs')
}

/**** Add all registered data to database *****/

function register(req, res, next) {
  var email = req.body.email
  var hash = req.body.hash
  var name = req.body.name
  var birthdate = req.body.birthdate
  var residency = req.body.residency
  var sex = req.body.sex
  var min = 8
  var max = 30

  //Is the registered data complete, new, not in use?
  if (!email || !hash || !name || !birthdate || !residency || !sex) {
    res
      .status(400)
      .send('Vul alle gegevens in.')
    return
  }
  if (hash.length < min || hash.length > max) {
    res
      .status(400)
      .send(
        'Password must be between ' + min +
        ' and ' + max + ' characters'
      )
    return
  }
  //Take the registered email and compare it to the database
  connection.query(
    'SELECT * FROM myprofile WHERE email = ?',
    email,
    check
  )

  function check(err, data) {
    if (err) {
      next(err)
    } else if (data.length !== 0) {
      res.status(409).send('Email already in use')
    } else {
      argon2.hash(hash).then(onhash, next)
    }
  }

  //Add the registered data to the database
  function onhash(hash) {
    connection.query('INSERT INTO myprofile SET ?', {
      email: email,
      hash: hash,
      name: name,
      birthdate: birthdate,
      residency: residency,
      sex: sex
    }, oninsert)

    function oninsert(err) {
      if (err) {
        next(err)
      } else {
        // The user is signed up
        req.session.user = {name: name}
        req.session.email = email
        res.redirect('/profiel')
      }
    }
  }
}

/**** Login *****/

function logForm(req, res) {
  if (req.session.user) {
    res.redirect('/profiel')
  }
  else {
    res.render('login.ejs')
  }
}

/**** Search for registered data in database *****/

function log(req, res, next) {
  var email = req.body.email
  var hash = req.body.hash

  // No fields forgotten?
  if (!email || !hash) {
    res
      .status(401)
      .send('Username or password are missing')

    return
  }

  //Take the given email and compare it to database
  connection.query(
    'SELECT * FROM myprofile WHERE email = ?',
    email,
    verify
  )

  //Does user exist?
  function verify(err, data) {
    var user = data && data[0]

    if (err) {
      next(err)
    } else if (user) {
      argon2
        .verify(user.hash, hash)
        .then(onverify, next)
    } else {
      res
        .status(401)
        .send('User does not exist')
    }

    //Is password correct?
    function onverify(match) {
      if (match) {
        // The user is logged in
        req.session.user = {name: user.name}
        req.session.email = user.email
        res.redirect('/profiel')
      } else {
        res.status(401).send('Password incorrect')
      }
    }
  }
}

/**** Profile *****/

function profile(req, res, next) {
  if (req.session.user) {
    connection.query('SELECT * FROM myprofile WHERE email = ?', req.session.email , display)

    function display(err, data){
      if (err) {
        next(err)
      } else {
        res.render('profiel.ejs', {user: req.session.user, data: data[0]})
      }
    }
  }
  else {
    res.status(404).render('error.ejs')
  }
}

/**** Edit profile *****/

function editPage(req, res, next) {
  if (req.session.user) {
    connection.query('SELECT * FROM myprofile WHERE email = ?', req.session.email , display)

    function display(err, data){
      if (err) {
        next(err)
      } else {
        res.render('edit.ejs', {data: data[0]})
      }
    }
  }
  else {
    res.status(401).send('Credentials required')
    return
  }
}

/**** Take given data and change that in database *****/

function edit(req, res, next) {
  connection.query(
    'SELECT * FROM myprofile WHERE email = ?',
    req.session.email,
    check
  )

  function check(err, data) {
    if (err) {
      next(err)
    } else if (data.length !== 0) {
      update()
    } else {
      res.status(409).send('Error, kan gegevens niet wijzigen')
    }
  }
  function update() {
    var email = req.body.email
    var name = req.body.name
    var birthdate = req.body.birthdate
    var residency = req.body.residency
    var sex = req.body.sex

    connection.query('UPDATE myprofile SET ? WHERE ?',
    [
      {
        email: email,
        name: name,
        birthdate: birthdate,
        residency: residency,
        sex: sex
      },
      {
        email: req.session.email
      }
    ], oninsert)

    function oninsert(err) {
      if (err) {
        next(err)
      } else {
        // Edited
        req.session.user = {name: name}
        req.session.email = email
        res.redirect('/profiel')
      }
    }
  }
}

function remove(req, res, next) {

  connection.query('DELETE FROM myprofile WHERE email = ?',
  req.session.email,
  done)

  function done(err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/log-out')
    }
  }
}

function logout(req, res, next) {
  req.session.destroy(function (err) {
    if (err) {
      next(err)
    } else {
      res.redirect('/')
    }
  })
}

/**** Page not found *****/

function notFound(req, res) {
  res.status(404).render('error.ejs')
}
