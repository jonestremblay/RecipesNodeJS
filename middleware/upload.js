
/* This middleware is used to upload files to the web server. */
const multer = require("multer");

const storage = multer.diskStorage({
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    destination : function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        cb(null,  new Date().toISOString().replace(/:|\./g,'-') + "_" + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        /* Validation passed, can store it */
        cb(null, true)
    } else {
        /* Do not store it*/
        cb(new Error("We only accept images with the extension : .png or .jpeg"), false)
    }
}

const upload = multer({
    storage : storage,
    fileFilter: fileFilter,
    limits : {
        fileSize : 1024 *10124 * 5
    }
})

module.exports = {upload};
