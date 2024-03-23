const startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => displayQuestion("money-time-space"));

const decisionTree = {
  "money-time-space": {
    question: "Is the <strong>[money/time/space]</strong> this person is receiving the same as the rest of the cast and crew?",
    options: {
      yes: "additional-costs-v1",
      no: "more-or-less",
    },
    color: "neutral",
  },
  "additional-costs-v1": {
    question: "Do they have enough of this resource to do the job well (and without incurring additional costs themselves)?",
    options: {
      yes: "positive-foundation",
      no: "performance-related",
    },
    color: "neutral",
  },
  "more-or-less": {
    question: "Is this person receiving <strong>more</strong> or <strong>less</strong>?",
    options: {
      more: "large-proportion",
      less: "additional-costs-v2",
    },
    color: "neutral",
  },
  "additional-costs-v2": {
    question: "Do they have enough of this resource to do the job well (and without incurring additional costs themselves)?",
    options: {
      yes: "demands-of-role",
      no: "inclusion-issue",
    },
    color: "neutral",
  },
  "demands-of-role": {
    question: "Is this a reflection of the <strong>demands of the role (e.g. size, specialist skills)</strong> compared to other cast members?",
    options: {
      yes: "ongoing-projects",
      no: "experience-level",
    },
    color: "neutral",
  },
  "ongoing-projects": {
    question: "Ensure that this rule is consistent across roles, and be clear if this is the case for <strong>this project</strong> or <strong>ongoing projects</strong> with your organisation.",
    options: [],
    color: "warning",
  },
  "experience-level": {
    question: "Is this a reflection of their <strong>experience level</strong> in this post compared to other cast members?",
    options: {
      yes: "ongoing-projects",
      no: "inclusion-issue",
    },
    color: "neutral",
  },
  "large-proportion": {
    question: "Do they have such a large proportion of this resource that other members of the cast are unable to do their job well?",
    options: {
      yes: "inclusion-issue",
      no: "reasonable-adjustment",
    },
    color: "neutral",
  },
  "inclusion-issue": {
    question: "There may be an issue related to inclusion here. You may need to investigate and review your resource allocation to ensure it's inclusive to this cast member, and all the cast members.",
    options: [],
    color: "danger",
  },
  "reasonable-adjustment": {
    question: "Was this related a reasonable adjustment (i.e. needing more time due to neurodiversity, or more money due to socio-economic issues with travel costs)?",
    options: {
      yes: "great-work",
      no: "ask-for-it",
    },
    color: "neutral",
  },
  "great-work": {
    question: "Great work. Continue to be transparent with the team about their ability to request adjustments as required.",
    options: [],
    color: "success",
  },
  "ask-for-it": {
    question: "Do they have more of this resource purely because they asked for it while other cast members did not?",
    options: {
      yes: "tbc",
      no: "inclusion-issue",
    },
    color: "neutral",
  },
  tbc: {
    question: "Wording TBC",
    options: [],
    color: "warning",
  },
  "performance-related": {
    question: "Is this a performance-related issue?",
    options: {
      yes: "reallocate-resources",
      no: "lack-of-resources",
    },
    color: "neutral",
  },
  "positive-foundation": {
    question: "Great, this sounds like a positive foundation for ensuring this person is included and supported.",
    options: [],
    color: "success",
  },
  "reallocate-resources": {
    question: "Does this person require a reasonable adjustment you haven't accounted for? You may need to reallocate resources to account for this.",
    options: [],
    color: "danger",
  },
  "lack-of-resources": {
    question:
      "Do you have enough resources to run this project?. Unless you have been transparent in advance with your cast about the lack of resources (and they have agreed to these conditions), you should consider whether this project is currently viable.",
    options: [],
    color: "danger",
  },
};

const decisionTreeContainer = document.getElementById("decision-tree");

function displayQuestion(questionId) {
  startButton.disabled = true;
  const currentQuestion = decisionTree[questionId];

  const newQuestionDiv = document.createElement("div");
  newQuestionDiv.classList.add("question");
  newQuestionDiv.innerHTML = currentQuestion.question;
  newQuestionDiv.classList.add(currentQuestion.color);
  newQuestionDiv.dataset.id = questionId;
  setTimeout(() => {
    newQuestionDiv.classList.add("active");
  }, 10);

  const newOptionsDiv = document.createElement("div");
  newOptionsDiv.classList.add("options");
  decisionTreeContainer.appendChild(newQuestionDiv);

  const options = currentQuestion.options;
  if (Object.keys(options).length > 0) {
    Object.keys(options).forEach((optionKey) => {
      const button = document.createElement("button");
      button.textContent = optionKey;
      button.dataset.next = options[optionKey];
      button.addEventListener("click", handleOptionClick);

      // Add classes based on text content
      const lowercaseOption = optionKey.toLowerCase();
      if (lowercaseOption.includes("yes") || lowercaseOption.includes("more")) {
        button.classList.add("button--green");
      } else if (lowercaseOption.includes("no") || lowercaseOption.includes("less")) {
        button.classList.add("button--red");
      }

      newOptionsDiv.appendChild(button);
    });

    decisionTreeContainer.appendChild(newOptionsDiv);
  } else {
    startOverButton.style.display = "inline";
  }
}

function handleOptionClick(event) {
  const nextQuestionId = event.target.dataset.next;
  const optionsContainer = event.target.parentNode;

  // Find the button that wasn't clicked
  const buttonNotClicked = optionsContainer.querySelector(`button:not([data-next="${nextQuestionId}"])`);

  buttonNotClicked.disabled = true;

  displayQuestion(nextQuestionId);
}

const startOverButton = document.getElementById("startOverButton");
startOverButton.style.display = "none"; // Initially hide the button

function resetDecisionTree() {
  startButton.disabled = false; // Re-enable the start button

  // Remove existing questions and options
  const decisionTreeContainer = document.getElementById("decision-tree");
  decisionTreeContainer.innerHTML = "";

  startOverButton.style.display = "none"; // Hide start over button

  // ... (Optional:  Reset any other variables or states related to your tree)
}

startOverButton.addEventListener("click", resetDecisionTree);
