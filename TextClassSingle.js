const TextClassBase = require('./TextClassBase');

class TextClassSingle extends TextClassBase{

	constructor(){

		super();

		this.model = [];

	}

	learn(text){

		// Merge arrays
		this.model = this.model.concat(this.tokenize(text));

	}

	run(text){

		let tokens = this.tokenize(text);
		let matchedTokens;

		// Match tokens in text by filtering with tokens of model
		matchedTokens = tokens.filter((token) => this.model.includes(token));

		// calculate percent
		let confidence = (matchedTokens.length / tokens.length);

		// check if percent is greater than 1 (0.0 to 1.0). If yes, set to 1.
		confidence = confidence > 1 ? 1 : confidence;

		return {
			inputTokens: tokens,
			matchedTokens: matchedTokens,
			result: {
				confidence: confidence,
				percent: parseFloat((confidence * 100).toFixed(2))
			}
		};

	}

}

module.exports = TextClassSingle;