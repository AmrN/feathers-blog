const { postSchema } = require('shared');

// posts-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  mongooseClient.set('debug', true);
  const posts = new mongooseClient.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: false, default: null },
    authorId: { type: String, ref: 'User' },
  }, {
    timestamps: true,
  });
  
  // text index all string fields
  posts.index({title: 'text', body: 'text'});


  posts.joiSchema = postSchema;

  return mongooseClient.model('posts', posts);
};
