# TextClass // Text classification algorithms

With TextClass, you get a text classification library with zero dependencies.

**Example use cases:**
- Spam-filter
- Potential insult checking
- Simple ChatBot
- Self-learning bot applications
- Text sample detection

## How the algorithms work
The algorithms in TextClass work slightly differently than, for example, Bayesian classification.
They are also not based on neural networks or some kind of AI.
TextClass works with a points system. So the inputs will be tokenized to only words in lower case without any special chars.
In the "weighted" classes, the tokens are counted according to their frequency.
Then on use of the class it will check and calculate the results using frequencies and weightings to rate the texts.
The difference between normal and "weighted" classes is that with "weighted" classes, the frequency and value of importance does also matter, not just the number of matches.
A big difference to other classifications like Bayes is that TextClass needs less but more accurate training data to be more accurate. If there is a lot of data, I recommend the use of "weighted" classes, because they show the importance of the tokens.
Furthermore, the "single" classes do not need any additional training data for comparing. That means, if you build a spam filter, you don't need even spam AND normal data for training. You only need the spam data to train.
And thats how TextClass works!

## Examples
Simple greeting detection
```javascript
let tcs = new TextClass.Single();

tcs.learn('Hello there!');
tcs.learn('Hi');
tcs.learn('Welcome everyone');
tcs.learn('Hey how are you?');

let result1 = tcs.run('Hi, how are you?');
/*
{
  inputTokens: [ 'hi', 'how', 'are', 'you' ],
  matchedTokens: [ 'hi', 'how', 'are', 'you' ],
  result: { confidence: 1, percent: 100 }
}
*/

let result2 = tcs.run('I want to have food');
/*
{
  inputTokens: [ 'i', 'want', 'to', 'have', 'food' ],
  matchedTokens: [],
  result: { confidence: 0, percent: 0 }
}
*/
```

## Classes

## `TextClass.Single()`
Most simple and primitive classification. The system only checks whether the tokens are present in the model and uses them to count and calculate the points for the result.
#### Methods:
#### `learn(text: string)`
Train the model of your instance with text

#### `run(text: string)`
Classify text and get results

#### Returns:
```javascript
let result = {
    inputTokens: Array,
    matchedTokens: Array,
    result: {
        confidence: Number,
        percent: Number
    }
}
```
#### Properties:
#### `model: Array`
The model. In this TextClass, its just an array with all tokens.

## `TextClass.SingleWeighted()`
More advanced classification. It calculates the importance of every token in the model and can deliver more accurate results on heavy data.
#### Methods:
#### `learn(text: string)`
Train the model of your instance with text

#### `run(text: string)`
Classify text and get results

#### Returns:
```javascript
let result = {
    inputTokens: Array,
    matchedTokens: Array,
    result: {
        confidence: Number,
        percent: Number
    }
}
```
#### Properties:
#### `model: Object`
The model. In this TextClassWeighted, it looks like this:
```javascript
let model = {
    tokens: Object,
    importantTokens: Object,
    processed: Boolean
}
```


## TextClassMulti
*Comming soon*

## TextClassMultiWeighted
*Comming soon*

## WordClass
*Comming soon*