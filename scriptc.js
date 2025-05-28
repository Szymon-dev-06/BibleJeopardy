const preloader = document.getElementById('preloader')
const gameBox = document.getElementById('game-box')
const showQuestion = document.getElementById('showQuestion')
const trueButton = document.getElementById('true-button')
const closeButton = document.getElementById('close-button')
const questionText = document.getElementById('question-text')
const answerButton = document.getElementById('answer-button')
const answerText = document.getElementById('answer-text')

preloader.addEventListener('animationend', function () {
	this.remove()
	gameBox.classList.remove('hidden')
})

let questionsDatabase = null

fetch('questions.JSON')
	.then(response => response.json())
	.then(json => {
		questionsDatabase = json
	})

let questionIndices = {}
let answerIndices = {}

function questionClick(categoryIndex, level) {
	if (!(categoryIndex in questionIndices)) {
		questionIndices[categoryIndex] = {}
	}
	if (!(level in questionIndices[categoryIndex])) {
		questionIndices[categoryIndex][level] = 0
	}

	let questionIndex = questionIndices[categoryIndex][level]
	let questions = questionsDatabase.categories[categoryIndex].questions[level]

	let question = `Вопрос: ${questions[questionIndex].question}`
	questionText.textContent = question

	showQuestion.dataset.category = categoryIndex
	showQuestion.dataset.level = level

	answerText.textContent = ''

	showQuestion.classList.remove('hidden')
}

answerButton.addEventListener('click', () => {
	const categoryIndex = parseInt(showQuestion.dataset.category)
	const level = parseInt(showQuestion.dataset.level)

	let questionIndex = questionIndices[categoryIndex][level]
	let questions = questionsDatabase.categories[categoryIndex].questions[level]
	let answer = `Ответ: ${questions[questionIndex].answer}`

	answerText.textContent = answer
})

function closeModal() {
	showQuestion.classList.add('hidden')
	answerText.textContent = ''
}

closeButton.addEventListener('click', closeModal)

trueButton.addEventListener('click', function () {
	closeModal()

	const categoryIndex = parseInt(showQuestion.dataset.category)
	const level = parseInt(showQuestion.dataset.level)

	if (
		questionIndices[categoryIndex] &&
		questionIndices[categoryIndex][level] !== undefined
	) {
		questionIndices[categoryIndex][level]++
	}
})