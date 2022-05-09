// NPM packages
const aposToLexForm = require('apos-to-lex-form');
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

// sentiment alalyzer 
exports.sentimentAnalyzer = (req, res, next) => {
  const { review } = req.body;
  // convert contractions into standard lexicon (e.g I'm -> I am)
  const lexedReview = aposToLexForm(review);
  // convert text data to lowercase
  const casedReview = lexedReview.toLowerCase();
  // remove non-alphobetical and special characters
  const alphaOnlyReview = casedReview.replace(/[^a-zA-Z\s]+/g, '');

  // Tokenization - splitting a text into its individual meaningful units
  const { WordTokenizer } = natural;
  const tokenizer = new WordTokenizer();
  const tokenizedReview = tokenizer.tokenize(alphaOnlyReview);

  // correct misspelled words
  tokenizedReview.forEach((word, index) => {
    tokenizedReview[index] = spellCorrector.correct(word);
  })
  // remove stop words
  const filteredReview = SW.removeStopwords(tokenizedReview);

  /*
    Stemming - word normalization in NLP used to convert derived or inflected words to their base or root form
    e.g The stemmer algorithm is expected to reduce the words “giving,” “gave,” and “giver” to their root word, “give.”
  */
  const { SentimentAnalyzer, PorterStemmer } = natural;
  const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
  const analysis = analyzer.getSentiment(filteredReview);

  res.status(200).json({ analysis });
};