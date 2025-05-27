import Employ from "../models/employModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";

export const list = asyncHandler(async (req, res) => {
  const employees = await Employ.find();
  if (employees.length > 0) {
    res.json(employees);
  } else {
    res.status(404);
    throw new Error("No employees found");
  }
});

export const create = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone,
    age,
    gender,
    password,
    role_name,
  } = req.body;

  const lastEmployee = await Employ.findOne().sort({ id: -1 });
  const newId = lastEmployee ? lastEmployee.id + 1 : 1;

  const employee = new Employ({
    id: newId,
    lastName: last_name,
    firstName: first_name,
    email,
    phoneNumber: phone,
    age,
    gender,
    role_name,
    position: role_name,
    password,
  });

  const createdEmployee = await employee.save();

  res.status(201).json({
    success: true,
    data: createdEmployee,
  });
});

export const update = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { last_name, first_name, email, phone, age, gender, role_name } = req.body;
  
  let employee;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Try to find by numeric id field instead
    employee = await Employ.findOne({ id: Number(id) });
  } else {
    // Find by MongoDB ObjectId (_id)
    employee = await Employ.findById(id);
  }

  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }

  // Update employee fields
  employee.firstName = first_name || employee.firstName;
  employee.lastName = last_name || employee.lastName;
  employee.email = email || employee.email;
  employee.phoneNumber = phone || employee.phoneNumber;
  employee.age = age || employee.age;
  employee.gender = gender || employee.gender;
  employee.position = role_name || employee.position;
  employee.role_name = role_name || employee.role_name;

  const updatedEmployee = await employee.save();
  res.json({ success: true, data: updatedEmployee });
});

export const remove = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if the ID is a valid ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // If it's not a valid ObjectId, check if it's a custom ID field
    try {
      // Handle custom IDs or other fields here
      const result = await Employ.findOneAndDelete({ id: id });  // Use 'id' field if it's a custom identifier

      if (!result) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      return res.json({ success: true, message: "Employee removed" });
    } catch (error) {
      console.error("Error removing employee:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // If it's a valid ObjectId, proceed with the normal deletion by _id
    try {
      const result = await Employ.findByIdAndDelete(id);

      if (!result) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }

      return res.json({ success: true, message: "Employee removed" });
    } catch (error) {
      console.error("Error removing employee:", error.message);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
});

export const changePassword = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  let employee;

  // Check if the ID is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Try to find by numeric id field instead
    employee = await Employ.findOne({ id: Number(id) });
  } else {
    // Find by MongoDB ObjectId (_id)
    employee = await Employ.findById(id);
  }

  if (!employee) {
    return res
      .status(404)
      .json({ success: false, message: "Employee not found" });
  }

  employee.password = password || employee.password;

  const updatedEmployee = await employee.save();
  res.json({ success: true, data: updatedEmployee });
});