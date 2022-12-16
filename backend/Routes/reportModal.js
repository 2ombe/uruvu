import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth, suAdmin } from "../utils.js";
import Report from "../models/reportModal.js";
import User from "../models/userModal.js";
import Product from "../models/productModel.js";

const reportRouter = express.Router();

reportRouter.post(
  "/",
  isAuth,
  isAdmin || suAdmin,
  expressAsyncHandler(async (req, res) => {
    const newReport = await Report.create({
      reportItems: req.body.reportItems.map((x) => ({ ...x, product: x._id })),
      paymentMethod: req.body.paymentMethod,
      sales: req.body.sales,
      name: req.body.reportItems.name,
      quantity: req.body.reportItems.quantity,
      taxPrice: req.body.taxPrice,
      grossProfit: req.body.grossProfit,
      netProfit: req.body.netProfit,
      costPrice: req.body.costPrice,
      soldAt: req.body.soldAt,
      comments: req.body.comments,
      depts: req.body.depts,
      costs: req.body.costs,
      real: req.body.real,
      inStock: req.body.report,
      expense: req.body.expense,
      inStock: req.body.inStock,
      user: req.user,
    });
    const report = await newReport.save();
    res.status(201).send({ message: "new report generated", report });
  })
);

reportRouter.get(
  "/summary",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Report.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$sales" },
          totalCosts: { $sum: "$costs" },
          taxPrice: { $sum: "$taxPrice" },
          grossProfit: { $sum: "$grossProfit" },
          netProfit: { $sum: "$netProfit" },
          expense: { $sum: "$expense" },
          depts: { $sum: "$depts" },
        },
      },
    ]);

    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Report.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$sales" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

reportRouter.get(
  "/all",
  isAuth,
  isAdmin || suAdmin,
  expressAsyncHandler(async (req, res) => {
    const report = await Report.find({ user: req.user._id });
    res.send(report);
  })
);

reportRouter.get(
  "/mine",
  isAuth,
  isAdmin || suAdmin,

  expressAsyncHandler(async (req, res) => {
    const report = await Report.find({ user: req.user._id });
    res.send(report);
  })
);

reportRouter.get(
  "/:id",
  isAuth,
  isAdmin || suAdmin,
  expressAsyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if (report) {
      res.send(report);
    } else {
      res.status(404).send({ message: "Report not found" });
    }
  })
);

export default reportRouter;
