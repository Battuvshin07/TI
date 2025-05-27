import Report from '../models/reportModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  const reports = await Report.find(); 
  if (reports.length > 0) {
    res.json(reports); 
  } else {
    res.status(404);
    throw new Error("No reports found"); 
  }
})