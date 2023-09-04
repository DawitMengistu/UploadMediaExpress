const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

// Configure the express-fileupload middleware
app.use(fileUpload());

// Serve static files (e.g., uploaded files)
app.use(express.static('uploads'));

app.get('/', (req, res) => {
    
    res.sendFile(__dirname + "/index.html")
});

// Define a route for file uploads
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Access the uploaded file using the 'file' field name from the HTML form
  const uploadedFile = req.files.file;

  // Move the file to the 'uploads' directory
  uploadedFile.mv(`uploads/${uploadedFile.name}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send('File uploaded successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
