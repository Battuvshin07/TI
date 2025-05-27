import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, 
  },
  abbreviation: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  isBroker: {
    type: String,
    required: true,
  },
  customerCode: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
  },
});
const Company = mongoose.model("customer-company", companySchema);

export default Company;
