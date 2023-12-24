const {OCRService} = require("../codeserv/index");

const ocrService = new OCRService();

// use a POST 
const create = async (req, res) => {
    try {

       
        return res.status(201).json({
            data: ocr,
            success: true,
            message: "Successfully added a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Couldnot add record",
            err: error
        });
    }
};


const destroy = async (req, res) => {
    try {
        const response = await ocrService.deleteRecord(req.params.id);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully deleted a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Couldnot delete record",
            err: error
        });
    }
};


const get = async (req, res) => {
    try {
        const response = await ocrService.getRecord(req.params.id);
        console.log(response);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully fetched a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "couldnot get record",
            err: error
        });
    }
};



const update = async (req, res) => {
    try {
        const response = await ocrService.updateRecord(req.params.id, req.body);
        return res.status(200).json({
            data: response,
            success: true,
            message: "Successfully updated a record",
            err: {}
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: "Couldnot update record",
            err: error
        });
    }
};


module.exports = {
    create,
    destroy,
    get,
    update,
};