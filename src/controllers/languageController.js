const { type } = require('express/lib/response');
const { Languages } = require('../models/mongo'); 

// GET method to fetch all languages
module.exports.getAllLanguages = async (req, res) => {
  try {
    const languages = await Languages.find({ is_active: true, is_deleted: false });
    if (languages) {
      return res.status(200).send({ type: 'Success', 
      data: languages });
    } else {
      return res.status(404).send({ type: 'error', 
      message: 'Language not Found' });
    }
  } catch (error) {
    console.error('Error fetching languages:', error);
    return res.status(500).send({ type: 'error', 
    message: 'Internal Server Error' });
  }
};


//get ElementByID
module.exports.getLanguageByUid = async (req, res) => {
  try {
    const languageUid = req.params.language_uid; 
    const language = await Languages.findOne({ languages_uid: languageUid });

    if (!language) {
      return res.status(404).send({ type: 'error',
       message: 'Language not Found' });
    } else {
      return res.status(200).send({ type: 'Success', 
      data: language });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ type: 'error', 
    message: 'Internal Server Error' });
  }
};


//POST Method to create new languages
module.exports.createLanguage = async (req, res) => {
    try {
      const { languages_uid, language, code } = req.body;
      const existingLanguage = await Languages.findOne({ language });  
      if (existingLanguage) {
        return res.status(400).send({ type: 'error',
         message: 'Language already exists' });
      }  
      const newLanguage = new Languages({
        languages_uid,
        language,
        code,
      });  
      const savedLanguage = await newLanguage.save();
      return res.status(201).send({ type: 'Success', 
      data: savedLanguage });
    } catch (error) {
      console.error('Error creating language:', error);
      return res.status(500).send({ type: 'error',
       message: 'Internal Server Error' });
    }
  };
  

// Update language by languages_uid
module.exports.updateLanguageByUid = async (req, res) => {
    try {
      const languages_uid = req.params.languages_uid;
      const updateLanguageData = req.body;
        if (updateLanguageData.language) {
        const existingLanguage = await Languages.findOne({
          language: updateLanguageData.language,
          languages_uid: { $ne: languages_uid }, 
        });  
        if (existingLanguage) {
          return res.status(400).send({ type: 'error',
           message: 'Language with the same name already exists' });
        }
      }  
      const updatedLanguage = await Languages.findOneAndUpdate(
        { languages_uid },
        updateLanguageData,
        {
          new: true,
          runValidators: true,
        }
      );  
      if (!updatedLanguage) {
        return res.status(404).send({ type: 'error', 
        message: 'Language not found' });
      }  
      return res.status(200).send({ type: 'Success',
       data: updatedLanguage });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ type: 'error', 
      message: 'Internal Server Error' });
    }
  };
  
  

// Delete Method to delete languages
module.exports.deleteLanguage = async (req, res) => {
    const languages_uid = req.params.languages_uid;
    try {
        const deletedLanguage = await Languages.findOneAndDelete({ languages_uid });
        if (!deletedLanguage) {
            return res.status(404).send({ type: "error", 
            message: "Language not found" });
        }
        return res.status(200).send({ type: "Success", 
        message: "Language Deleted Successfully." });
    } catch (error) {
        return res.status(500).send({ type: "error", 
        message: "Internal Server Error" });
    }
};
