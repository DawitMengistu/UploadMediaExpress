const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

// Configure the express-fileupload middleware
app.use(fileUpload());

// Serve static files (e.g., uploaded files)
app.use(express.static('public'));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html")
});

// Define a route for file uploads
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Access the uploaded files using the 'files' field name from the HTML form
  const uploadedFiles = req.files;

  // Loop through the uploaded files and move them to the 'uploads' directory
  for (const fieldName in uploadedFiles) {
    const file = uploadedFiles[fieldName];

    // Check if the file field is an array (multiple files with the same field name)
    if (Array.isArray(file)) {
      file.forEach((singleFile) => {
        singleFile.mv(`uploads/${singleFile.name}`, (err) => {
          if (err) {
            return res.status(500).send(err);
          }
        });
      });
    } else {
      // Handle a single file upload
      file.mv(`uploads/${file.name}`, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
  }

  res.send('Files uploaded successfully!');
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
