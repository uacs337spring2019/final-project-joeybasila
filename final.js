/*
My javascript code, by Joey Basila
CS 337, Spring 2019 
This javascript code is written to play the word guessing game Hangman.
*/

(function() {
	//These global variables hold the word that the user will guess, the amount
	//times that the user is wrong, how many times the user was correct to
	//compare to the length of the word, and a list of letters the user has
	//guessed.
	"use strict";
	let wordToGuess = "";
	let wrong = 0;
	let win = 0;
	let used = [];

/*
On load the url is fetched and the JSON from the service code is obtained. 
the json is sent into different functions. These functions are called when
the buttons on the paged are clicked
*/
	window.onload = function() {
		var url = "http://csc337hangman.herokuapp.com/?mode=words&title=hangman";
		fetch(url)
			.then(checkStatus)
			.then(function(responseText) {
				let json = JSON.parse(responseText);
				setup_page(json);
				hangman();
				let start = document.getElementById("submitCategory");
				start.onclick = function() {
					start_game(json);
				};
				let submit = document.getElementById("submitGuess");
				submit.onclick = function() {
					submit_guess();
				};
				let submitfull = document.getElementById("fullbutton");
				submitfull.onclick = function() {
					submit_full();
				};
			})
			.catch(function(error) {
				console.log(error);
			});
	};

/*
This function adds new guesses to the Used letters section of the webpage by
accessing the <p> on the html page and adding to the innerHTML. Called whenever
the submit button is pressed. The guess parameter is the guess the user 
submited.
*/
	function used_letters(guess) {
		let usedBox = document.getElementById("used");
		usedBox.innerHTML += guess + " ";
	}

/*
This function is called when the submit button for the full guess of the word
to be guess is clicked. If the text matches the word to guess (cases dont 
matter) then the user has won the game and the empty textboxes that hold the
word to guess are filled in and an alert pops up letting the user know they won
*/
	function submit_full() {
		let guess = document.getElementById("fullanswer");
		if(guess.value.toLowerCase() === wordToGuess.toLowerCase()){
			for(let i = 0; i < wordToGuess.length; i++) {
				if(wordToGuess[i] !== " ") {
					let spot = document.getElementById(i);
					spot.innerHTML = wordToGuess[i];
				}
			}
			window.alert("You won");
		} else {
			used.push(guess);
			used_letters(guess);
			wrong += 1;
			if(wrong == 1) {
				draw_head();
			} else if(wrong === 2) {
				draw_body();
			} else if(wrong === 3) {
				draw_rightarm();
			} else if(wrong === 4) {
				draw_leftarm();
			} else if(wrong === 5) {
				draw_rightleg();
			} else if(wrong === 6) {
				draw_leftleg();
			} else if(wrong === 7) {
				draw_face();
				window.alert("You lost");
			}
		}
	}

/*
This function is called when the user clicks the submit button. The users guess
is obtained. If the amount of wins matches the length of the word then user has
won. If not an else if is called to make sure the user submited a one letter
answer. Then another is called to make sure the user doesn't submit the same
letter. Then if I check if the word to guess contains the letter. If it does
the global varialbe used adds the guess and win is increased by one. All the
spots where the letters are supposed to be are added to the textboxes. If the
word to guess doesn't include the guess then depending on how many times the 
user has been wrong a part is drawn on the canvas.
*/
	function submit_guess() {
		let guess = document.getElementById("guess").value.toLowerCase();
		if(win == wordToGuess.length - 1){
			window.alert("You won!");
		} else if(guess.length > 1) {
			window.alert("Submit a one letter guess");
		} else if(used.includes(guess)){
			window.alert("Already used");
		} else if(wordToGuess.includes(guess.toLowerCase())) {
			used.push(guess);
			used_letters(guess);
			win += 1;
			for(let i = 0; i < wordToGuess.length; i++) {
				if(wordToGuess[i] === guess){
					let spot = document.getElementById(i);
					spot.innerHTML = guess;
				}
			}
		} else {
			used.push(guess);
			used_letters(guess);
			wrong += 1;
			if(wrong == 1) {
				draw_head();
			} else if(wrong === 2) {
				draw_body();
			} else if(wrong === 3) {
				draw_rightarm();
			} else if(wrong === 4) {
				draw_leftarm();
			} else if(wrong === 5) {
				draw_rightleg();
			} else if(wrong === 6) {
				draw_leftleg();
			} else if(wrong === 7) {
				draw_face();
				window.alert("You lost");
			}
		}
	}

/*
This function draws a circle to represent the head on the hangman.
*/
	function draw_head() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.beginPath();
		context.arc(175, 95, 20, 0, 2 * Math.PI);
		context.stroke();
	}

/*
This function draws a line from the circle to represent the body of the hangman
*/
	function draw_body() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(175, 115);
		context.lineTo(175, 175);
		context.stroke();
	}

/*
This function draws the right arm to the hangman.
*/
	function draw_rightarm() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(175, 130);
		context.lineTo(200, 145);
		context.stroke();
	}

/*
This function draws the left arm to the hangman
*/
	function draw_leftarm() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(175, 130);
		context.lineTo(150, 145);
		context.stroke();
	}

/*
This function draws the right leg to the hangman.
*/
	function draw_rightleg() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(175, 175);
		context.lineTo(200, 195);
		context.stroke();
	}

/*
This function draws the left leg to the hangman.
*/
	function draw_leftleg() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(175, 175);
		context.lineTo(150, 195);
		context.stroke();
	}

/*
This function draws the eyes on the hangman.
*/
	function draw_face() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");

		context.moveTo(165, 85);
		context.lineTo(170, 90);
		context.stroke();

		context.moveTo(165, 90);
		context.lineTo(170, 85);
		context.stroke();

		context.moveTo(180, 85);
		context.lineTo(185, 90);
		context.stroke();

		context.moveTo(180, 90);
		context.lineTo(185, 85);
		context.stroke();
	}

/*
This function is called when the start game button is pressed. First it clears
the page of anything from the last page. Then a randomly slected variable is
chosen to pick a word from one of the categories in the word.txt. After that
textboxes are created to represent each letter to be guessed for the word that
was chosen.
*/
	function start_game(json) {
		clear_page();
		let guessCategory = "";
		let selector = document.getElementById("categories");
		let categories = selector.options;
		for(let i = 0; i < categories.length; i++) {
			if(categories[i].selected) {
				let guessCategory = json[categories[i].text];
				let randomNum = Math.floor((Math.random() * guessCategory.length));
				wordToGuess = guessCategory[randomNum].toLowerCase();
			}
		}
		console.log(wordToGuess);
		let letters = document.getElementById("letters");
		for(let i = 0; i < wordToGuess.length; i++) {
			if(wordToGuess[i] === " ") {
				let space = document.createElement("p");
				letters.appendChild(space);
			} else {
				let letterBox = document.createElement("textarea");
				letterBox.readOnly = true;
				letterBox.rows = "1";
				letterBox.cols = "1";
				letterBox.id = i;
				letters.appendChild(letterBox);
			}
		}
	}

/*
This function sets up the categories in the category selector.
*/
	function setup_page(json) {
		let selector = document.getElementById("categories");
		let categories = json["categories"];
		for(let i = 0; i < categories.length; i++) {
			let option = document.createElement("option");
			option.text = categories[i];
			selector.add(option);
		}
	}

/*
This function draws the lines to create the stage for the hangman in the canvas
*/
	function hangman() {
		let canvas = document.getElementById("hangman");
		let context = canvas.getContext("2d");
		context.moveTo(100, 50);
		context.lineTo(100, 250);
		context.stroke();
		context.moveTo(100, 50);
		context.lineTo(175, 50);
		context.stroke();
		context.moveTo(175, 50);
		context.lineTo(175, 75);
		context.stroke();
		context.moveTo(50, 250);
		context.lineTo(150, 250);
		context.stroke();
	}

/*
This function clears the page by reseting the canvas width and then setting
the letters div innerHTML to "".
*/
	function clear_page() {
		wrong = 0;
		win = 0;
		used = [];
		let canvas = document.getElementById("hangman");

		let w = canvas.width;
		canvas.width = 10;
		canvas.width = w;
		hangman();

		let letterBox = document.getElementById("letters");
		letterBox.innerHTML = "";
	}

	function checkStatus(response) {
		// if(response.status == 400) {
		// 	return Promise.reject(new Error("Error, may be missing parameter"));
		// } else if(response.status == 410) {
		// 	return Promise.reject(new Error("Invalid State Request"));
		// } else {
		// return response.text();
		// }
		return response.text();
	}

})();
