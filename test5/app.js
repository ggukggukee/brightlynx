// import modules
import express from 'express';
const app = express();
import bcrypt from 'bcrypt';
import passport from'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';
import flash from 'express-flash';
import { Pool } from 'pg'

// pg module
const connectionString = 'postgresql://username:password@localhost:5432/test'
const pool = Pool({connectionString: connectionString});

// pg error handling
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// setting view engine for ejs files
app.set('view engine', 'ejs');

// using req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// add folders to use
app.use(express.static('public'));

//bcrypt password salt rounds
const saltRounds = 10;

// session secrets
app.use(
    session({
        secret: 'ahnyujin',
        resave: false,
        saveUninitialized: false
    })
);

// using passport js
app.use(passport.initialize());
app.use(passport.session());

// declaring flash messages
app.use(flash());
app.use((req, res, next) => {
    res.locals.error1 = req.flash('error1');
    res.locals.error2 = req.flash('error2');
    next();
})

// using the local strategy with passport
passport.use(new LocalStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
    pool.connect((err, client, cb) => {
        if(err) {
            console.log('not able to get connection' + err);
            res.status(400).send(err);
        }
        client.query('SELECT * FROM users WHERE username = $1', [username], (err, user) => {
            cb();
            if(err) {
                return done(err);
            } else if (!user.rows[0]) {
                return done(null, false, {type: 'error1', message: 'User not found'});
            } else if (username === user.rows[0].username && (bcrypt.compareSync(password, user.rows[0].password) === false)) { 
                return done(null, false, {type: 'error2', message: 'Incorrect password'}); 
            } else if (username === user.rows[0].username && (bcrypt.compareSync(password, user.rows[0].password) === true)) {
                return done(null, user.rows[0]);
            }
        });   
    });
}));

passport.serializeUser(function (user, done) {
    return done(null, user.id);
});
 
passport.deserializeUser(function (id, done) {
    pool.connect((err, client, cb) => {
        if(err) {
            console.log('not able to get connection' + err);
            res.status(400).send(err);
        }
        client.query('SELECT * FROM users WHERE id = $1', [id], (err, user) => {
            cb();
            if(err){
                console.log(err);
            } else {
                done(null, user.rows[0]);
            }
        });
    });
});


// index page route
app.get('/', (req, res) => {
    res.render('index', {layout: 'index', user: req.user, success: req.flash('success')});
});

// signup route
app.get('/signup', (req, res) => {
    res.render('signup', {layout: 'signup', user: req.user, error: req.flash('error')});
});

//sign up
// get username and password from form then pass password through bcrypt to make hash from password
// insert username and hashed password to db
app.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if(err) {
            console.log(err);
        } else {
            pool.connect((err, client, done) => {
                if(err) {
                    console.log('not able to get connection' + err);
                    res.status(400).send(err);
                }
                client.query('INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT (username) DO NOTHING', [req.body.username, hash], (err, createdUser) => {
                    done();
                    if(err) {
                        console.log(err);
                    } else if (createdUser.rowCount === 0) {
                        req.flash('error', 'User with this username is already exists');
                        res.redirect('/signup');
                    } else {
                        passport.authenticate('local')(req, res, () => {
                            req.flash('success', 'Welcome ' + req.user.username + '!');
                            res.redirect('/');
                        });
                    }
                });
            })
        }
    });    
});

// login route
app.get('/login', (req, res) => {
    res.render('login', {layout: 'login', user: req.user, message: req.flash('error1'), message: req.flash('error2')});
});

// get information from form and send it to our passport local strategy
app.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash : true}), (req, res) => {
    req.flash('success', 'Welcome back ' + req.user.username + '!');
    res.redirect('/');
});

// logout route
app.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Goodbye. See you next time!');
    res.redirect('/');
});

// all page route
// shows all users in one table from db
app.get('/all', (req, res) => {
    pool.connect((err, client, done) => {
        if(err) {
            console.log('not able to get connection' + err);
            res.status(400).send(err);
        }
        client.query('SELECT * FROM users', (err, allUsers) => {
            done();
            if(err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.render('all', {allUsers: allUsers, layout: 'all', user: req.user});
        });
    });
});

// our port
const PORT = process.env.PORT || 3000;

// starting a server
app.listen(PORT, process.env.IP, () => {
    console.log('Server has been started');
});