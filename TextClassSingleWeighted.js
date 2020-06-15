const TextClassBase = require('./TextClassBase');

class TextClassSingleWeighted extends TextClassBase{

	constructor(){

		super();

		// default construct of a model
		this.model = {
			tokens: {},
			importantTokens: {},
			processed: false
		};

		// set to default value. This will be updated automatically to a better value while processing the tokens.
		this.importanceWeighting = 2;

	}

	learn(text){

		this.model.processed = false;

		let tokens = this.tokenize(text);

		// add tokens with quantity to the model
		for(let token of tokens){
			// if token not exist, create it. If token exist, increase quantity
			if(!this.model.tokens[token]){
				this.model.tokens[token] = 1;
			}else{
				this.model.tokens[token]++;
			}

		}


	}

	processModel() {

		/*
		* Calculate average quantity of all token quantities
		* Result -> importanceWeighting
		* */
		let tokenQuantities = Object.values(this.model.tokens);
		this.importanceWeighting = Math.round(tokenQuantities.reduce((a, c) => a + c) / tokenQuantities.length);

		for(let token in this.model.tokens){

			let tokenQuantity = this.model.tokens[token];

			//importance levels
			if(tokenQuantity >= this.importanceWeighting && tokenQuantity < this.importanceWeighting * 2){
				this.model.importantTokens[token] = 1;

			}else if(tokenQuantity > this.importanceWeighting * 2){
				this.model.importantTokens[token] = 2;
			}

		}

		this.model.processed = true;

	}

	run(text){

		// Check if model has no value
		if(Object.keys(this.model.tokens).length < 1){
			return null;
		}

		// Check if the model is processed or not. If not, do it.
		if(!this.model.processed){
			this.processModel();
		}

		// Get the tokens (array with lower case words) of both input and model
		let tokens = this.tokenize(text);
		let modelTokens = Object.keys(this.model.tokens);

		let points = 0;
		let totalPoints = tokens.length;
		let matchedTokens = [];

		// loop over the words of the input
		for(let token of tokens){

			/*
			* Rules of this algorithm:
			* - If the word of the input is in the model, get +1 points
			* - If the word of the input is NOT in the model, get -1 points
			* - If the word of the input is important, add importance level to points (+1 or +2, depends on word importance)
			* */

			if(modelTokens.includes(token)){

				matchedTokens.push(token);

				points++;
				// if the current token is important, add importance level to points
				points += this.model.importantTokens[token] ? this.model.importantTokens[token] : 0;

			}else{
				// decrease points. If points are already lower than 1, set to 0
				points = points < 1 ? 0 : points - 1;
			}

		}

		// calculate percent
		let confidence = (points / totalPoints);

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

module.exports = TextClassSingleWeighted;