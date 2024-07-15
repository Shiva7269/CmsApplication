const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
  pageName: { type: String, required: true },
  pageUrl: { type: String, required: true },
  components: { type: Array, default: [] },
  layout: { type: String, required: true }
});

module.exports = mongoose.model('Page', PageSchema);
