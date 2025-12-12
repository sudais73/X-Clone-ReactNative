import multer from 'multer'

const storage = multer.memoryStorage()

const fileFilter = (req,res,cb)=>{
    if(fileFilter.mimetype.startwith("image/")){
        cb(null, true)
    }else{
        cb(new Error("Only image is allowed to post"), false)
    }
}
const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits:{fileSize:5* 1024*1024} // 5mb
})

export default upload