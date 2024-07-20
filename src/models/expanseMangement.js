import mongoose, { Schema } from "mongoose";
const categories = [
  "Food",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Health",
  "Investment",
  "Other",
];

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
  icon: String,
  category: {
    type: String,
    enum: categories,
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  isArchived: Boolean,
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

const TransactionSchema = new Schema({
  transactionId: { type: String, unique: true, required: true },
  name: String,
  date: Date,
  amount: Number,
  type: Boolean,
  account: { type: Schema.Types.ObjectId, ref: "Account" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expenses: [ExpenseSchema],
  notes: { type: String },
  isArchived: Boolean,
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.modelNames("Transaction", TransactionSchema);

const IncomeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  source: String,
});

const Income = mongoose.models.Income || mongoose.model("Income", IncomeSchema);

const mappingConfigSchema = new mongoose.Schema({
  bank: { type: String, required: true, unique: true },
  txnId: { type: String, required: true },
  debit: { type: String, required: true },
  credit: { type: String, required: true },
  balance: { type: String, required: true },
  metaData: { type: String },
  particulars: { type: String, required: true },
});

const MappingConfig =
  mongoose.models.MappingConfig ||
  mongoose.model("MappingConfig", mappingConfigSchema);
export { Account, montlyBalance, Transaction, Expense, Income, MappingConfig };
