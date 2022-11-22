const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Partner = require('./models/Partner');
const Article = require('./models/Article');
const Plastic_type = require('./models/Plastic_type');
const Collect = require('./models/Collect');
const Request = require('./models/Request');



// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files
const partners = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/partners.json`, 'utf-8')
);
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/articles.json`, 'utf-8')
);
const plastic_types = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/plastic_types.json`, 'utf-8')
);
const collects = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/collects.json`, 'utf-8')
);
const requests = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/requests.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Partner.create(partners);
    await Article.create(articles);
    await Plastic_type.create(plastic_types);
     await Collect.create(collects);
    await Request.create(requests);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Partner.deleteMany();
    await Article.deleteMany();
    await Plastic_type.deleteMany();
    await Collect.deleteMany();
    await Request.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
