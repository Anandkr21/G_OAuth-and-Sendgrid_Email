const express = require('express');
const passport = require('passport');
const session = require('express-session');
const app = express()
require('./Oauth');
app.use(express.json())

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401)
}

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authentication with google</a>')
})


app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(passport.initialize())
app.use(passport.session())

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }))

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);

app.get('/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    res.send(`Hello ${name}`)
})

app.get('/auth/failure', (req, res) => {
    res.send('somethng went wrong.')
})

app.use('/logout', (req, res) => {
    req.session.destroy()
    res.send('bye')
})

app.listen(5000, () => {
    console.log('running');
})
