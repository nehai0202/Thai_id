const OCRRecord = require('../model/ocr_record');

// containing actual code for crud operation
class OCRRecordRepository {
  async createRecord(name, lastname, identity_num, dob, issue_date, expiry_date) {
    try {
      const ocrRecord = await OCRRecord.create({
        identification_number: identity_num,
        name: name,
        last_name: lastname,
        date_of_birth: dob,
        date_of_issue: issue_date,
       date_of_expiry: expiry_date,
      });
 console.log("abfakjbjgjhluhgbuygfutfd");
    //  console.log(name, lastname, identity_num, dob, issue_date, expiry_date);
      //console.log(new Date(dob));
      console.log(ocrRecord);
      return ocrRecord;
    } catch (error) {
      console.log('Something went wrong in repository layer in creating record');
      throw { error };
    }
  }

  async deleteRecord(identity_num) {
    try {
      await OCRRecord.deleteOne({
        identification_number: identity_num,
      });
      return true;
    } catch (error) {
      console.log('Something went wrong in repository layer in deleting record');
      throw { error };
    }
  }

  async updateRecord(name, lastname, identity_num, dob, issue_date, expiry_date) {
    try {
      const ocrRecord = await OCRRecord.updateOne(
        {
          identification_number: identity_num,
        },
        {
          $set: {
            name: name,
            last_name: lastname,
            date_of_birth: dob,
            date_of_issue: issue_date,
            date_of_expiry: expiry_date,
            updatedAt: new Date(),
          },
        }
      );

      console.log(ocrRecord);
      return ocrRecord;
    } catch (error) {
      console.log('Something went wrong in repository layer in updateRecord');
      throw { error };
    }
  }

  

  async getRecord(identity_num) {
    try {
   
        const ocrRecord = await OCRRecord.find({
        identification_number: identity_num,
      });
      console.log("recordd is" +ocrRecord);

      return ocrRecord;
    } catch (error) {
      console.log('Something went wrong in repository layer in getRecord');
      throw { error };
    }
  }
}

module.exports = OCRRecordRepository;
