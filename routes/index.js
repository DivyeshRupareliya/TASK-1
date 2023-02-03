var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var jwt = require('jsonwebtoken');

const usermodel = require("../model/userschema");
const product_model = require("../model/product");

/* GET home page. */
router.post('/signup', async function (req, res, next) {

  // const { name, email, password, password_confirmation } = req.body

  var No_repeat = await usermodel.findOne({ email: req.body.email })
  if (No_repeat) {
    console.log(No_repeat);
    return res.status(201).json({
      status: "User Already Existing"
    })
  }

  var bpass = await bcrypt.hash(req.body.password, 10);

  var obj = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: bpass
  }

  usermodel.create(obj);
  res.status(201).json({
    status: "Registered SuccessFully"
  })
});

var token = "";

router.post('/signin', async function (req, res, next) {
  var data = await usermodel.find({ "email": req.body.email });
  console.log(data);

  bcrypt.compare(req.body.password, data[0].password, function (err, result) {

    if (result == true) {

      token = jwt.sign({ id: data.id }, 'dddd')

      res.status(201).json({
        status: "Login SuccessFully",
        token
      });
    }
    else {
      res.status(201).json({
        status: "Password Is Dose not Mached",
      });
    }
  });
});


function check_user_login(req, res, next) {
  if (token != "") {
    next();
  } else {
    res.send("plese login.....");
  }
}

//product add product
router.post('/product', check_user_login, async function (req, res) {

  var find = await product_model.findOne({
    product_company: req.body.product_company,
    product_name: req.body.product_name,
    product_price: req.body.product_price
  })

  if (find) {
    return res.status(401).json({
      status: "product already added"
    })
  }

  var product_obj = {
    product_company: req.body.product_company,
    product_name: req.body.product_name
  }

  product_model.create(product_obj);
  res.status(201).json({
    status: "Product Added"
  })
});

module.exports = router;
