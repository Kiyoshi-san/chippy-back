import express from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

const cartRouter = express.Router();

cartRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const cart = Cart.find({});

    res.send(cart);
  })
);

cartRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const cartList = await Cart.find({});

    let totalPrice = 0;
    cartList.map((cartL) => {
      totalPrice += cartL.totalPrice;
    });

    const cart = new Cart({
      //   user: req.user._id,
      cartItems: req.body.cartItems,
      totalPrice: totalPrice,
    });

    const createdCart = await cart.save();
    res.send({
      message: "Produto adicionado ao cart",
      cart,
      createdCart,
    });
  })
);

export default cartRouter;
