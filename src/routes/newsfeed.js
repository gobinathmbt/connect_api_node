const express=require("express")
const newsfeedrouter=express.Router();
const app=express();
const {Newsfeedcreate,allnewsfeed,deleteonenewsfeed,updatednewsfeed}=require('../controllers/newsfeed');



newsfeedrouter.post('/Newnewsfeed',Newsfeedcreate);
newsfeedrouter.get('/Allnewsfeed',allnewsfeed);
newsfeedrouter.delete('/Deletenewsfeed/:id',deleteonenewsfeed);
newsfeedrouter.put('/Updatenewsfeed/:id',updatednewsfeed);
app.get("/public/images/:file", (req, res) => {
    const Image = req.params.file;
    const Imagepath = path.join(__dirname,"./public/images", Image);
    console.log("Image file:", Imagepath);
    res.sendFile(filePath);
});




module.exports=newsfeedrouter;