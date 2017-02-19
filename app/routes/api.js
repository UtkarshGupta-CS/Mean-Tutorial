var User = require('../models/user');

module.exports =function(router) {
    // http://localhost:8081/users 
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;
        if (req.body.username === null || req.body.username === '' || req.body.password === null || req.body.password === '' || req.body.email === null || req.body.email === '') {
            res.json({success:false,message:"Ensure that username,email or password are provided"})
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({success:false,message:'Username or email already exist'})
                } else {
                    res.json({success:true,message:'User Created'});
                }
            });
        }
    });
    return router;
}