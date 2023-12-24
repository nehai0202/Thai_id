const mongoose = require('mongoose');

const ocrRecordSchema = new mongoose.Schema({
  identification_number: {
    type: String,
    unique: true,
  },
  name: String,
  last_name: String,
  date_of_birth: Date,
  date_of_issue: Date,
  date_of_expiry: Date,
  timestamp: String,
  status: String,
  error_message: String,
});

const OCRRecord = mongoose.model('OCRRecord', ocrRecordSchema);

module.exports = OCRRecord;
