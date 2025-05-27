

import mongoose from "mongoose";
const reportSchema = mongoose.Schema({
  state: {
    type: String,
    required: [true, 'Please add a state']
  },
  type: {
    type: String,
    required: [true, 'Please add a type']
  },
  receipt_number: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    required: [true, 'Please add a date']
  },
  all_payed: {
    type: String,
    default: '0'
  },
  ready: {
    type: String,
    default: '0'
  },
  not_ready: {
    type: String,
    default: '0'
  },
  total_payment: {
    type: String,
    default: '0'
  },
  crane_fee: {
    type: String,
    default: '0'
  },
  road_use: {
    type: String,
    default: '0'
  },
  save_goods: {
    type: String,
    default: '0'
  },
  train_clean: {
    type: String,
    default: '0'
  },
  train_use: {
    type: String,
    default: '0'
  },
  tltrain_use: {
    type: String,
    default: '0'
  },
  customs_inspection: {
    type: String,
    default: '0'
  },
  car_entrance: {
    type: String,
    default: '0'
  }
}, {
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
export default Report;