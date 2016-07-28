// don't clutter up any scopes
Oque = (function() {
	// DOM tools
	var DT = {
		setText: function(el, text) {
			if (typeof el.innerText !== 'undefined') el.innerText = text
			else {
				DT.clear(el)
				el.appendChild(document.createTextNode(text))
			}
		},
		getText: function(el) {
			return el.childNodes[0].nodeValue
		},
		clear: function(el, condition) {
			if (!condition) condition = function() { return true }

			var children = Array.prototype.slice.call(el.childNodes)
			for (var i = 0; i < children.length; i++) {
				if (condition(children[i])) el.removeChild(children[i])
			}
		},
		on: function(el, event, f) {
			if (el.addEventListener) el.addEventListener(event, f, false)
			else if (el.attachEvent) el.attachEvent(event, f)
			else el['on' + event] = f
		},
		growFont: function(el, height, min, step) {
			if (!min) min = 0
			if (!step) step = 1

			el.style.fontSize = min + 'px'
			var safe = 0
			while (DT.height(el) < height) {
				if (safe++ > 1000) break // just in case
				el.style.fontSize = (min += step) + 'px'
			}

			el.style.fontSize = (min -= step) + 'px'
			return min
		},
		height: function(el) { return el.clientHeight || el.offsetHeight },
		width: function(el) { return el.clientWidth || el.offsetWidth },
		disableTransitionsAndExecute: function(el, func) {
			el.className += ' noTransition'
			func(el)
			DT.height(el) // trigger a reflow - see http://stackoverflow.com/a/16575811/
			el.className = el.className.replace(/(\s+noTransition)|(noTransition\s+)/, '')
		}
	}

	// JS tools
	var JT = {
		shuffle: function(a) {
			var index = a.length
			while (index) {
				var swapIndex = Math.floor(Math.random() * index--)

				// swap
				var tmp = a[index]
				a[index] = a[swapIndex]
				a[swapIndex] = tmp
			}
			return a
		},
		pad: function(str, len, padChr) {
			str = str + ''
			while (str.length < len) str = padChr + str
			return str
		}
	}

	// the main Oque object
	return {
		// Question objects to be passed to init
		Question: function(question, answers) {
			this.question = question
			this.answers = answers
		},

		Answer: function(text, correct) {
			this.text = text
			this.correct = correct
		},

		// helper method to create questions
		q: function(question, answers) {
			for (var i = 0; i < answers.length; i++) answers[i] = new Oque.Answer(answers[i], false)
			answers[0].correct = true
			return new Oque.Question(question, JT.shuffle(answers))
		},

		// initialization function, with parameters as an object
		init: function(params) {
			if (!params.container) throw new TypeError('oque: container not specified in init')
			if (!params.questions) throw new TypeError('oque: questions not specified in init')

			var questionContainer = document.createElement('header')
			var questionText = document.createElement('h1')
			questionText.id = 'question'
			questionContainer.appendChild(questionText)

			var answersContainer = document.createElement('section')

			var hud = document.createElement('footer')
			hud.id = 'hud'
			
			var score = document.createElement('section')
			score.id = 'score'
			DT.setText(score, '+000\u00A0') // &nbsp;

			var time = document.createElement('section')
			time.id = 'time'
			var timeBar = document.createElement('div')
			timeBar.id = 'timeBar'
			DT.setText(timeBar, '10s') // so that the height is right for calculation in first quesiton
			time.appendChild(timeBar)

			hud.appendChild(score)
			hud.appendChild(time)
			answersContainer.appendChild(hud)

			params.container.appendChild(questionContainer)
			params.container.appendChild(answersContainer)

			oque = {
				container: params.container,
				questionContainer: questionContainer,
				questionText: questionText,
				answersContainer: answersContainer,
				questions: params.questions,
				hud: hud,
				score: score,
				time: time,
				timeBar: timeBar,
				start: function(finishedCallback) { Oque.start(oque, finishedCallback); return oque }, // allow chaining
				askQuestion: function(index, callback) { Oque.askQuestion(oque, index, callback); return oque },
				updateScoreRelative: function(relativeChange) { Oque.updateScoreRelative(oque, relativeChange); return oque }
			}
			return oque
		},

		// start the questions in order
		start: function(oque, finishedCallback) {
			if (!oque) throw new TypeError('oque: oque object not specified in start')
			var i = 0, askNextQuestion = function(el, correct, time) {
				if (el !== null) el.style.backgroundColor = correct ? '#0F0' : '#F00'
				else oque.time.style.backgroundColor = '#F00'

				oque.updateScoreRelative(correct ? (10 + Math.ceil(time + 0.1)) : (-Math.ceil(time + 0.1)))

				if (i < oque.questions.length) setTimeout(function() {
					oque.time.style.removeProperty('background-color')
					Oque.askQuestion(oque, i++, askNextQuestion)
				}, 1500)
				else setTimeout(function() { finishedCallback(parseInt(DT.getText(oque.score))) }, 1500)
			}
			Oque.askQuestion(oque, i++, askNextQuestion)
		},

		// ask a specific question with callback
		askQuestion: function(oque, index, callback) {
			if (!oque) throw new TypeError('oque: oque object not specified in askQuestion')
			if (!index) index = 0
			if (!callback) callback = function(){}

			var time = 0, interval = null // will be used later

			var q = oque.questions[index]
			DT.setText(oque.questionText, q.question)
			DT.growFont(oque.questionText, Math.floor((1 / q.answers.length) * DT.height(oque.container)))

			DT.clear(oque.answersContainer, function(el) { return el.className.match(/\banswer\b/) })
			var answerElements = []
			for (var i = 0; i < q.answers.length; i++) {
				var a = document.createElement('div')
				a.className = 'answer'
				DT.setText(a, q.answers[i].text)
				DT.on(a, 'click', (function(a, correct){
					return function(e) {
						clearInterval(interval)
						callback(a, correct, time)
					}
				})(a, q.answers[i].correct))
				oque.answersContainer.insertBefore(a, oque.hud)
				answerElements.push(a)
			}

			DT.growFont(oque.answersContainer, Math.floor(DT.height(oque.container) - DT.height(oque.questionText)) - (5 * q.answers.length))

			for (var i = 0; i < answerElements.length; i++) answerElements[i].style.visibility = 'hidden'

			setTimeout(function() {
				for (var i = 0; i < answerElements.length; i++) answerElements[i].style.removeProperty('visibility')

				// start timing
				var totalTime = 10, oldTime = -1, intervalSubtract = 0.125
				time = totalTime
				interval = setInterval(function() {
					oque.timeBar.style.width = Math.floor(time / totalTime * 100) + '%'
					if (Math.ceil(time) !== oldTime) DT.setText(oque.timeBar, (oldTime = Math.ceil(time)) + 's')
					if (time <= 0) {
						clearInterval(interval)
						callback(null, false, 0)
					}
					time -= intervalSubtract
				}, 125)
			}, 2000)
		},

		// change the number in the HUD
		updateScore: function(oque, newScore) {
			var scoreStr = newScore > 0 ? '+' : '-'
			scoreStr += JT.pad(Math.abs(newScore), 3, '0')
			DT.setText(oque.score, scoreStr + '\u00A0') // &nbsp;
		},

		updateScoreRelative: function(oque, relativeChange) {
			var scoreNum = parseInt(DT.getText(oque.score))
			Oque.updateScore(oque, scoreNum + relativeChange)
		}
	}
})()