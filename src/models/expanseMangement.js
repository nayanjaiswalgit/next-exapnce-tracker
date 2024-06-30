import mongoose, { Schema } from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  accountName: {
    type: String,
    required: true,
    maxLength: 100,
  },
  accoutType: {
    type: String,
    required: true,
    enum: ["Debit", "Credit"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account =
  mongoose.models.account || mongoose.model("account", accountSchema);

const montlyBalanceSchema = new mongoose.Schema(
  {
    accoundId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Please Provide a account"],
    },
    balanceMonth: {
      type: String,
      required: [true, "Please Provide a Month"],
      undefined: true,
    },
    Balance: {
      type: Number,
      required: [true, "Please Provide a Balance"],
      undefined: true,
    },
    CreatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { unique: true, index: { account: 1, balaceMonth: 1 } }
);

const montlyBalance =
  mongoose.models.montlyBalance ||
  mongoose.model("montlyBalance", montlyBalanceSchema);

const ExpenseSchema = new Schema({
  amount: Number,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  account: { type: Schema.Types.ObjectId, ref: "Account" },
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

const TransactionSchema = new Schema({
  name: String,
  data: Date,
  amount: Number,
  expenses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.modelNames("Transaction", TransactionSchema);

export { Account, montlyBalance, Transaction, Expense };
