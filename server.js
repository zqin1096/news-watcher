const express = require('express');

const app = express();

// Parses incoming requests with JSON payloads.
// A new body object containing the parsed data is populated on the request
// object after the middleware (i.e. req.body), or an empty object ({}) if there
// was no body to parse, the Content-Type was not matched, or an error occurred.
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});