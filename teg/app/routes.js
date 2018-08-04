module.exports = function(app, passport, db) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      // console.log(req)
      //   db.collection('messages').find().toArray((err, result) => {
      //     if (err) return console.log(err)
      //     res.render('profile.ejs', {
      //       user : req.user,
      //       messages: result
      //     })
      //   })
      console.log(req)
      res.render('profile.ejs', {
        user : req.user
      })
    });

    //EMAIL + PASSWORD SIGN UP QUESTIOn
    app.get('/signuppagina1', isLoggedIn, function(req, res) {
      console.log(req.user)
      res.render('signup-pagina1.ejs', {
        user : req.user
      })
    })

    app.post('/signuppagina1', isLoggedIn, function(req, res){
      let email = req.user.local.email
      let password = req.user.local.password
      console.log("from route")
      console.log(email, password);
      db.collection('users')
      .findOneAndUpdate({
        'local.email': email, 'local.paswword':password
      }, {
      $set: {
        goalweight: req.body.goalweight,
        currentweight: req.body.currentweight,
      }
    }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    //ALLERGIES SURVEY Question
    app.get('/signuppagina2', isLoggedIn, function(req, res) {
      console.log(req.user)
      res.render('signup-pagina2.ejs', {
        user : req.user
      })
    })

    app.put('/signuppagina2', isLoggedIn, function(req, res){
      let allergies = req.user.local.allergies
      console.log("from route")
      console.log(allergies);
      db.collection('users')
      .findOneAndUpdate({
        'local.allergies': allergies,
      }, {
      $set: {
        allergies: req.body.allergies,
      }
    }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    //Workout Location
    app.get('/signuppagina3', isLoggedIn, function(req, res) {
      console.log(req.user)
      res.render('signup-pagina3.ejs', {
        user : req.user
      })
    })

    app.put('/signuppagina3', isLoggedIn, function(req, res){
      let gym = req.user.local.gym
      let home = req.user.local.home
      let both = req.user.local.both
      console.log("from route")
      console.log(gym, home, both);
      db.collection('users')
      .findOneAndUpdate({
        'local.gym': gym,
        'local.home': home,
        'local.gym': both
      }, {
      $set: {
        gym: req.body.gym,
        home: req.body.home,
        both: req.body.both,
      }
    }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    //Fitness goals:  TONE','BUILD MUSCLE','LOSE WEIGHT','IMPROVE FLEXIBILTY','CARDIO',"NUTRITION"
    app.get('/signuppagina4', isLoggedIn, function(req, res) {
      console.log(req.user)
      res.render('signup-pagina4.ejs', {
        user : req.user
      })
    })

    app.put('/signuppagina4', isLoggedIn, function(req, res){
      let tone = req.user.local.tone
      let buildMuscle = req.user.local.buildMuscle
      let loseWeight = req.user.local.loseWeight
      let improveFlexibility = req.user.local.improveFlexibility
      let cardio = req.user.local.cardio
      let nutrition = req.user.local.nutrition
      console.log("from route")
      console.log(tone, buildMuscle, loseWeight, improveFlexibility, cardio, nutrition);
      db.collection('users')
      .findOneAndUpdate({
        'local.tone': tone,
        'local.buildMuscle': build,
        'local.loseWeight': loseWeight,
        'local.improveFlexibility': improveFlexibility,
        'local.cardio': cardio,
        'local.nutrition': nutrition,

      }, {
      $set: {
        tone: req.body.tone,
        buildMuscle: req.body.buildMuscle,
        loseWeight: req.body.loseWeight,
        improveFlexibility: req.body.improveFlexibility,
        cardio: req.body.cardio,
        nutrition: req.body.nutrition,
      }
    }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

// react routes ================================================================

  // MAIN TEST ROUTE
  app.get('/api/messages', function(req, res) {
    db.collection('messages').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.json(result)
    })
  });

// message board routes ========================================================

app.post('/teg', (req, res) => {
  db.collection('teg').save({
     name: req.body.name,
     currentWeight: req.body.currentWeight,
     goalWeight: req.body.goalWeight,
     allergies: req.body.allergies,
     wheat:req.body.wheat,
     dairy:req.body.dairy,
     fruit: req.body.fruit,
     nuts: req.body.nuts,
     nada:req.body.nada,
     otra: req.body.otra,
     loseWeight: req.body.loseweight,
     tone: req.body.tone,
     muscle: req.body.muscle,
     cardio: req.body.cardio,
     flex: req.body.flex,
     diet: req.body.diet,
     gym: req.body.gym,
     home: req.body.home,
     both: req.body.msg,
     both: req.body.both},
     (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/profile')
      })
    })



    app.put('/teg', (req, res) => {
      db.collection('teg')
      .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
        $set: {
          thumbUp:req.body.thumbUp + 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    app.delete('/messages', (req, res) => {
      db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
