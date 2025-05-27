import Company from "../models/companyModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

export const list = asyncHandler(async (_, res) => {
  const companies = await Company.find();
  if (companies.length > 0) {
    res.json(companies);
  } else {
    res.status(404);
    throw new Error("No companies found");
  }
});

export const create = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    contact_number,
    ledger_name,
    shortcut_name,
    password,
    is_broker,
  } = req.body;

  const lastCompany = await Company.findOne().sort({ id: -1 });
  const newId = lastCompany ? lastCompany.id + 1 : 1;

  const company = new Company({
    id: newId,
    abbreviation: shortcut_name,
    companyName: name,
    isBroker: is_broker,
    customerCode: ledger_name,
    accountNumber: contact_number,
    email,
    password,
  });

  const createdCompany = await company.save();

  res.status(201).json({
    success: true,
    data: createdCompany,
  });
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    contact_number,
    ledger_name,
    shortcut_name,
    is_broker,
    password,
  } = req.body;

  let company;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Try to find by numeric id field instead
    company = await Company.findOne({ id: Number(id) });
    
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }
    
    // Update company fields
    company.abbreviation = shortcut_name || company.abbreviation;
    company.companyName = name || company.companyName;
    company.isBroker = is_broker || company.isBroker;
    company.customerCode = ledger_name || company.customerCode;
    company.accountNumber = contact_number || company.accountNumber;
    company.email = email || company.email;
    if (password) company.password = password;

    const updatedCompany = await company.save();
    return res.json({ success: true, data: updatedCompany });
  } else {
    // Find by MongoDB ObjectId (_id)
    try {
      const company = await Company.findByIdAndUpdate(
        id,
        {
          abbreviation: shortcut_name,
          companyName: name,
          isBroker: is_broker,
          customerCode: ledger_name,
          accountNumber: contact_number,
          email,
          password,
        },
        { new: true }
      );

      if (!company) {
        return res
          .status(404)
          .json({ success: false, message: "Company not found" });
      }

      res.json({
        success: true,
        data: company,
      });
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
});