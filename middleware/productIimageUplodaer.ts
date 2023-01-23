import multer from 'multer';
import path from 'path';

const productImageStorage = multer.diskStorage({
	destination(req, file, callback) {
		callback(null, 'images/products');
	},
	filename(req, file, callback) {
		callback(null, Date.now().toString() + '-' + file.fieldname + path.extname(file.originalname));
	},
});

const productImageUploader = multer({
	storage: productImageStorage,
	fileFilter: (req, file: Express.Multer.File, cb) => {
		const { mimetype } = file;
		if (['image/png', 'image/jpg', 'image/jpeg'].includes(mimetype)) {
			cb(null, true);
		} else {
			cb(null, false);
			cb(new Error('only jpg,jped and png files are accepted'));
		}
	},
	limits: { fileSize: 1 * 1024 * 1024 },
}).array('ProductImage', 5);

export default productImageUploader;
