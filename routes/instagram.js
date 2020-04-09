var express  = require('express');
var router = express.Router();


router.route('/instagram/:id')
.get(function(req,res,next){
    res.json('hi')
})
.put(function(req,res,next){
   res.json('put')
})
.delete(function(req,res,next) {
    res.json('del')
});

    module.exports = router;