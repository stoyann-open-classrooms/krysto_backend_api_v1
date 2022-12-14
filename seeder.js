const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Partner = require('./models/Partner');
const User = require('./models/User');
const Article = require('./models/Article');
const Review = require('./models/Review');
const Message = require('./models/Message');
const Plastic_type = require('./models/Plastic_type');
const Collect = require('./models/Collect');
const Recyclable_product = require('./models/Recyclable_product');
const Request = require('./models/Request');



// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

// Read JSON files
const partners = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/partners.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/articles.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, 'utf-8')
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
const messages = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/message.json`, 'utf-8')
);
const recyclable_products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/recyclableProducts.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
   
    await Partner.create(partners);
    await User.create(users);
    await Article.create(articles);
    await Review.create(reviews);
    await Plastic_type.create(plastic_types);
    await Collect.create(collects);
    await Request.create(requests);
    await Message.create(messages);
    await Recyclable_product.create(recyclable_products);
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
    await User.deleteMany();
    await Article.deleteMany();
    await Review.deleteMany();
    await Plastic_type.deleteMany();
    await Recyclable_product.deleteMany();
    await Collect.deleteMany();
    await Request.deleteMany();
    await Message.deleteMany();
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
