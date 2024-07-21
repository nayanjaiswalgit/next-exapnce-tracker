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
  name: String,
  price: Number,
  quantity: { type: Number, required: true, default: 1 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  expenseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction', required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
  isArchived: Boolean,
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

const transactionSchema = new mongoose.Schema({
  transactionId: { type: String, unique: true, required: true },
  merchant: String,
  date: { type: Date, default: Date.now },
  type: { type: String, enum: ['credit', 'debit'], default: 'debit' },
  account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense", required: true }],
  notes: { type: String },
  isArchived: { type: Boolean, default: false },
});



const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);



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



const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  icon: String,
  isDefault: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', default: null }
});

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);


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
export { Account, montlyBalance, Transaction, Expense, Income, MappingConfig, Category };
