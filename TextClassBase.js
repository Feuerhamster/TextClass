class TextClass{

	constructor() {

		// The regex that will be used to tokenize the inputs
		this.tokenizerRegex = /[a-zA-Z0-9äöüß]+/gi;

	}

	tokenize(text){
		// Returns an array with only words in lower case
		return Array.from(text.matchAll(this.tokenizerRegex), el => el[0].toLowerCase());
	}

}

module.exports =TextClass;