document.addEventListener("DOMContentLoaded", function() {
  let isEditing = false;
  let currentEditCard = null;

  // Elements
  const alienAnimation = document.getElementById("alien-animation");
  const inspiringQuote = document.querySelector(".inspiring-quote"); // Ensure this selector matches your HTML
  const addFlashcardButton = document.getElementById("add-flashcard");
  const saveButton = document.getElementById("save-btn");
  const questionInput = document.getElementById("question");
  const answerInput = document.getElementById("answer");
  const errorMessage = document.getElementById("error");
  const questionContainer = document.getElementById("add-question-card");
  const closeBtn = document.getElementById("close-btn");
  const cardListContainer = document.querySelector(".card-list-container");

  // Dynamic inspiring quotes
  const quotes = [
      "Learning is a treasure that will follow its owner everywhere. - Chinese Proverb",
      "Education is the most powerful weapon which you can use to change the world. - Nelson Mandela",
      "The beautiful thing about learning is that no one can take it away from you. - B.B. King",
      "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi"
  ];

  function changeQuote() {
      const quoteText = document.getElementById('quote-text');
      const randomIndex = Math.floor(Math.random() * quotes.length);
      quoteText.innerText = quotes[randomIndex];
  }

  changeQuote(); // Initial quote change

  addFlashcardButton.addEventListener("click", () => {
      alienAnimation.style.display = "none"; // Hide the alien animation
      inspiringQuote.style.display = "none"; // Also hide the quotes section
      questionContainer.classList.remove("hide");
  });

  closeBtn.addEventListener("click", () => {
      alienAnimation.style.display = "block"; // Show the alien animation again
      inspiringQuote.style.display = "block"; // Show the quotes section again
      resetForm();
  });

  saveButton.addEventListener("click", () => {
      const question = questionInput.value.trim();
      const answer = answerInput.value.trim();

      if (!question || !answer) {
          errorMessage.classList.remove("hide");
          return;
      }

      errorMessage.classList.add("hide");
      if (isEditing) {
          updateFlashcard(currentEditCard, question, answer);
      } else {
          addFlashcard(question, answer);
      }
      resetForm();
  });

  function addFlashcard(question, answer) {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
          <div class="question-div">${question}</div>
          <div class="answer-div hide">${answer}</div>
          <button class="show-hide-btn">Show/Hide Answer</button>
          <div class="buttons-con">
              <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
      `;
      setupCardButtons(card);
      cardListContainer.appendChild(card);

      // Hide the alien animation whenever a new card is added
      alienAnimation.style.display = "none";
      // Optionally, keep the quotes hidden if that's the intended behavior
      inspiringQuote.style.display = "none";
  }

  function setupCardButtons(card) {
      const showHideButton = card.querySelector(".show-hide-btn");
      showHideButton.addEventListener("click", () => {
          const answerDiv = card.querySelector(".answer-div");
          answerDiv.classList.toggle("hide");
      });

      const deleteButton = card.querySelector(".delete");
      deleteButton.addEventListener("click", () => card.remove());

      const editButton = card.querySelector(".edit");
      editButton.addEventListener("click", () => {
          isEditing = true;
          currentEditCard = card;
          questionInput.value = card.querySelector(".question-div").innerText;
          answerInput.value = card.querySelector(".answer-div").innerText;
          questionContainer.classList.remove("hide");
      });
  }

  function updateFlashcard(card, question, answer) {
      card.querySelector(".question-div").innerText = question;
      card.querySelector(".answer-div").innerText = answer;
  }

  function resetForm() {
      questionContainer.classList.add("hide");
      questionInput.value = "";
      answerInput.value = "";
      errorMessage.classList.add("hide");
      isEditing = false;
      currentEditCard = null;
      // Resetting to the original state might require showing the alien animation and quotes again, depending on your design choice
      // alienAnimation.style.display = "block";
      // inspiringQuote.style.display = "block";
  }
});
