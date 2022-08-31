const { verifySignUp } = require('../middleware/index')
const controller = require('../controllers/auth.controller')
module.exports = function(app) {
    app.use((req, res, next) => {
        res.headers(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    });
    app.post(
        '/api/auth/signup',
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRoleExisted
        ],
        controller.signup
    )

    app.post(
        'api/auth/signin', controller.signin
    )
}