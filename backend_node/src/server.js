require('dotenv').config();
const app = require('./app');
const AppDataSource = require('./config/data-source');

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed', err);
  });
