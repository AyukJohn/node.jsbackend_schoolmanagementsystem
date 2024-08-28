const cloudinary = require('cloudinary').v2;
          
// cloudinary.config({ 
//   cloud_name: 'drlg67wkz', 
//   api_key: '678462726392974', 
//   api_secret: 'X09S_9YQJ_m1XX7Pzeus8wgmLEE' ,
//   secure: true,
// });

          
cloudinary.config({ 
  cloud_name: 'ayukjohn', 
  api_key: '769431854987132', 
  api_secret: '0P38iintksT-IGzMeQ9uzbrVtP8' ,
  secure: true,
});

module.exports = cloudinary;