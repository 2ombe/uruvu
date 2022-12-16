import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    image: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },

    countInStock: {
      type: Number,
    },

    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", async function (next) {
  if (this.isModified("image slag")) {
    return next();
  }
  const salt = await bcrypt.genSalt(6);
  const hashedInfo = await bcrypt.hash(this.slug, this.image, salt);
  this.slug = hashedInfo;
  this.image = hashedInfo;
  next();
});

const Product = mongoose.model("Product", productSchema);
export default Product;
