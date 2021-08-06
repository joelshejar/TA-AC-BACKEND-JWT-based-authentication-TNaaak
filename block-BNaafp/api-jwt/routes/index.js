var express = require('express');
var router = express.Router();
var auth = require('../middlewares/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: ' Welcome in Express' });
});

router.get('/dashboard', auth.verifyToken, async (req,res, next)=> {
  console.log(req.user);
  res.json({dashboard: "i am enter inside dashboard and i have verify my tokin"})
})

module.exports = router;