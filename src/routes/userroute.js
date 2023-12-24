const express = require('express');
const OCRController = require('../controller/ocr_controller');
const UploadController = require('../controller/uploadcontroller');

const router = express.Router();

router.post('/upload', UploadController.upload);


router.delete('/:id', OCRController.destroy);
router.get('/:id', OCRController.get);
router.patch('/:id', OCRController.update);

module.exports = router;