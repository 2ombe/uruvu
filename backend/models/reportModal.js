import mongoose from "mongoose";

const reportModalSchema = new mongoose.Schema(
  {
    reportItems: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        costPrice: { type: Number },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    expense: { type: Number, required: true },
    soldAt: { type: Number, required: true },
    depts: { type: Number, required: true },
    real: { type: Number, required: true },
    comments: { type: String, required: true },

    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      name: String,
    },

    sales: { type: Number, required: true },
    costs: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    netProfit: { type: String, required: true },
    grossProfit: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, default: false },
    inStock: { type: Number },
    paidAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportModalSchema);
export default Report;
