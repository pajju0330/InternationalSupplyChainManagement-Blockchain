
const crypto = require("crypto");
const Payment = require("../models/payementModel");
const Razorpay = require("razorpay");
const dotenv = require("dotenv");
dotenv.config();
const instance = new Razorpay({
    key_id: 'rzp_test_8N5cWng2se0xIQ',
    key_secret: '1uxyQz4hjjaaFYFoHZpuPttl',
});

const checkout = async (req, res) => {
    try{
        let amount = req.body.amount;
        if(!amount) amount = 3000;
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
          };
          console.log(process.env.RAZORPAY_APT_SECRET);
          const order = await instance.orders.create(options);
          res.status(200).json({
            success: true,
            order,
          });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
        });
    }
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", '1uxyQz4hjjaaFYFoHZpuPttl')
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { checkout, paymentVerification }; 