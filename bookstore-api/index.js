const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');

app.use(express.json()); // parse JSON body
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
