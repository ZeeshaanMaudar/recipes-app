const express = require('express');

const app = express();

// setup the server
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`server listening on PORT: ${PORT} `);
});
