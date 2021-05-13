var titleHeader = document.getElementById("title-header");

var wordInputField = document.getElementById("new-word");
var hintInputField = document.getElementById("new-hint");
var sort = document.getElementById("sort");
var firstGradeSelect = document.getElementById("first-grade");
var secondGradeSelect = document.getElementById("second-grade");
var thirdGradeSelect = document.getElementById("third-grade");
var fourthGradeSelect = document.getElementById("fourth-grade");
var fifthGradeSelect = document.getElementById("fifth-grade");

firstGradeSelect.value = FIRST_GRADE;
secondGradeSelect.value = SECOND_GRADE;
thirdGradeSelect.value = THIRD_GRADE;
fourthGradeSelect.value = FOURTH_GRADE;
fifthGradeSelect.value = FIFTH_GRADE;

var username = document.getElementById("name");

var studentsList = document.getElementById("students-list");
let wordsList = document.getElementById("custom-words");

var studentName = document.getElementById("student-name");
var studentPassword = document.getElementById("student-password");
var studentGrade = document.getElementById("student-grade");
var studentConfirmPassword = document.getElementById(
  "student-confirm-password"
);

/**
 * @description listen to updates on the user status. If the
 * user is signed in we update the ui of home page.
 */
currentUserListener.registerListener(function (val) {
  if (val) {
    // User is signed in
    if (currentUserIsTeacher()) {
      // Update display name
      var displayName = currentUser.auth.displayName;
      if (displayName) {
        username.value = displayName;
        titleHeader.innerHTML = "Welcome " + displayName;
      } else {
        username.value = null;
      }

      // Update students
      updateStudentsUI();

      //Update custom words
      updateCustomWordsUI();
    } else if (currentUserIsStudent()) {
      window.location.replace("/student/home.html");
    } else {
      console.log("Unknown user account type.");
    }
  } else {
    // User is not signed in
    window.location.replace("/");
  }
});

/**
 * @description Update the display name of the current user.
 * @see updateUserDisplayName
 *
 * @function updateName
 */
function updateName() {
  promise = updateUserDisplayName(username.value);

  promise.then(function (result) {
    if (result == true) {
      titleHeader.innerHTML = "Welcome " + username.value;
      alert("Name successfully updated");
    } else {
      alert(result);
    }
  });
}

/**
 * @description Update the UI of the students tab
 *
 * @function updateStudentsUI
 */
function updateStudentsUI() {
  studentsList.innerHTML = `
		<input
			id=""
			type="button"
			value="Create Student"
			onclick="displayModal('createStudent')"
		/>
	`;
  currentUser.students.forEach(function (student) {
    studentsList.innerHTML +=
      `
			<div class="list-content">
				<h2>` +
      student.auth.displayName +
      `</h2>
				<button id="button` +
      student.auth.uid +
      `" onclick="displayEditStudentModal('` +
      student.auth.uid +
      `')">Edit</button>
			</div>
    `;
  });
}

/**
 * @description Update the UI of the custom words tab
 *
 * @function updateStudentsUI
 */
function updateCustomWordsUI() {
  wordsList.innerHTML = `
	<input
	  id=""
	  type="button"
	  value="Add Word"
	  onclick="displayModal('addWord')"
	/>`;

  wordsList.innerHTML += '<h3 id="1">First Grade</h3>';
  currentUser.words.FIRST_GRADE.forEach(function (word) {
    wordsList.innerHTML +=
      `
			  <div class="list-content">
				  <h2 id="word` +
      word.uid +
      `">` +
      word.word +
      `</h2>
				  <button onclick="displayEditWordModal(1, '` +
      word.uid +
      `')">Edit</button>
			  </div>
		  `;
  });

  wordsList.innerHTML += '<h3 id="2">Second Grade</h3>';
  currentUser.words.SECOND_GRADE.forEach(function (word) {
    wordsList.innerHTML +=
      `
      <div class="list-content">
        <h2 id="word` +
      word.uid +
      `">` +
      word.word +
      `</h2>
        <button onclick="displayEditWordModal(2, '` +
      word.uid +
      `')">Edit</button>
      </div>
    `;
  });

  wordsList.innerHTML += '<h3 id="3">Third Grade</h3>';
  currentUser.words.THIRD_GRADE.forEach(function (word) {
    wordsList.innerHTML +=
      `
      <div class="list-content">
        <h2 id="word` +
      word.uid +
      `">` +
      word.word +
      `</h2>
        <button onclick="displayEditWordModal(3, '` +
      word.uid +
      `')">Edit</button>
      </div>
    `;
  });

  wordsList.innerHTML += '<h3 id="4">Fourth Grade</h3>';
  currentUser.words.FOURTH_GRADE.forEach(function (word) {
    wordsList.innerHTML +=
      `
      <div class="list-content">
        <h2 id="word` +
      word.uid +
      `">` +
      word.word +
      `</h2>
        <button onclick="displayEditWordModal(4, '` +
      word.uid +
      `')">Edit</button>
      </div>
    `;
  });

  wordsList.innerHTML += '<h3 id="5">Fifth Grade</h3>';
  currentUser.words.FIFTH_GRADE.forEach(function (word) {
    wordsList.innerHTML +=
      `
      <div class="list-content">
        <h2 id="word` +
      word.uid +
      `">` +
      word.word +
      `</h2>
        <button onclick="displayEditWordModal(5, '` +
      word.uid +
      `')">Edit</button>
      </div>
    `;
  });
}

/**
 * @description Update the password of the current
 * user by sending a recovery link to users email.
 * Uses Firebase Authentication Function.
 * @see sendPasswordResetEmail
 *
 * @function updatePassword
 */
function updatePassword() {
  var email = currentUser.auth.email;

  if (email != null) {
    var promise = sendPasswordResetEmail(email);

    promise.then(function (result) {
      alert("Password reset email sent to: " + email);
    });
  } else {
    alert("No email found");
  }
}

/**
 * @description sign out the current user and return them
 * to the home page. Uses Firebase Authentication function.
 * @see signOutFirebaseUser
 *
 * @function signOut
 */
function signOut() {
  var promise = signOutFirebaseUser();

  promise.then(function (result) {
    if ((result = true)) {
      window.location.replace("/");
    } else {
      alert(result);
    }
  });
}

/**
 * @description create a student account using Firebase
 * Authentication methods.
 * @see createStudentAccount
 *
 * @function addStudentAccount
 *
 * @todo handle promise
 * @todo update ui with new student
 */
function addStudentAccount() {
  var name = studentName.value;
  var password = studentPassword.value;
  var confirmPassword = studentConfirmPassword.value;
  var grade = studentGrade.options[studentGrade.selectedIndex].value;

  console.log(grade)

  if (password == confirmPassword) {
    createStudentAccount(name, password, grade);
  } else {
    alert("Passwords do not match");
  }
}

/**
 * @description Attempt to add a new word to the database.
 * Inputs are taken from wordInputField and from sort.
 *
 * @function addWord
 *
 * @todo Create check to make sure word input field is
 * popolated and that a grade is selected.
 * @todo update ui with new word
 */
function addWord() {
  var newWord = wordInputField.value;
  var newHint = hintInputField.value;
  var grade = sort.options[sort.selectedIndex].value;

  var promise = addWordToDatabase(newWord, newHint, grade);

  promise.then(function (result) {
    if (result.success == true) {
      var gradeSection = document.getElementById(grade);
      insertAfterEndAdjacentHTML(
        gradeSection,
        `
        <div class="list-content">
          <h2 id="word` +
          result.return +
          `">` +
          newWord +
          `</h2>
          <button onclick="displayEditWordModal(` +
          grade +
          `, '` +
          result.return +
          `')">Edit</button>
        </div>
      `
      );

      wordInputField.value = "";
      hintInputField.value = "";
      alert("Word successfully added");
    } else {
      alert(result.return);
    }
  });
}

/**
 * @description Display a modal containing the students
 * information as well as provididng the teacher the
 * ability to edit the students information.
 *
 * @function displayEditStudentModal
 * @param {String} uid Firebase Auth identifier
 * of student.
 *
 * @todo student password does not work due to CORS
 * controls.
 */
function displayEditStudentModal(uid) {
  var modal = document.getElementById("editStudent");
  var content = document.getElementById("editStudentContent");

  currentUser.students.forEach(function (student) {
    if (student.auth.uid == uid) {
      content.innerHTML =
        `
        <h1>` +
        student.auth.displayName +
        `</h1>
        <div class="form">
          <p>Update Password</p>
          <input id="studentPassword" type="password" name="new-password" id="new-password" placeholder="New Password" />
          <input id="studentConfirmPassword" type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />

          <input id="update` +
        student.auth.uid +
        `" type="submit" value="Update Password" class="special"" />
        </div>
      `;

      var updatePasswordButton = document.getElementById(
        "update" + student.auth.uid
      );
      updatePasswordButton.onclick = function () {
        var passwordField = document.getElementById("studentPassword");
        var confirmPasswordField = document.getElementById(
          "studentConfirmPassword"
        );
        var password = passwordField.value;
        var confirmPassword = confirmPasswordField.value;

        if (password == confirmPassword) {
          var promise = resetStudentPassword(student.auth.uid, password);

          promise
            .then(function (result) {
              console.log(result.return);
              alert(result.return);
            })
            .catch(function (error) {
              console.log(error);
              alert(error);
            });
        } else {
          alert("Passwords do not match");
        }
      };
    }
  });

  modal.style.display = "block";
}

/**
 * @description Display the edit words modal with given id.
 *
 * @function displayEditWordModal
 * @param {int} grade grade associated with custom word
 * @param {String} uid the Firebase uid of the word
 *
 * @todo prevent one model from opening if another is open
 */
function displayEditWordModal(grade, uid) {
  var modal = document.getElementById("editWord");
  var wordInput = document.getElementById("update-word");
  var hintInput = document.getElementById("update-hint");
  var updateButton = document.getElementById("update-word-button");

  switch (grade) {
    case FIRST_GRADE:
      currentUser.words.FIRST_GRADE.forEach(function (word) {
        if (word.uid == uid) {
          wordInput.value = word.word;
          hintInput.value = word.hint;
          updateButton.onclick = function () {
            var promise = updateWord(word, 1, wordInput.value, hintInput.value);

            promise.then(function (result) {
              if (result.success == true) {
                var wordLabel = document.getElementById("word" + word.uid);
                wordLabel.innerHTML = wordInput.value;

                word.word = wordInput.value;
                word.hint = hintInput.value;
                alert("Word successfully updated.");
              } else {
                alert(result.return);
              }
            });
          };
        }
      });
      break;
    case SECOND_GRADE:
      currentUser.words.SECOND_GRADE.forEach(function (word) {
        if (word.uid == uid) {
          wordInput.value = word.word;
          hintInput.value = word.hint;
        }
      });
      break;
    case THIRD_GRADE:
      currentUser.words.THIRD_GRADE.forEach(function (word) {
        if (word.uid == uid) {
          wordInput.value = word.word;
          hintInput.value = word.hint;
        }
      });
      break;
    case FOURTH_GRADE:
      currentUser.words.FOURTH_GRADE.forEach(function (word) {
        if (word.uid == uid) {
          wordInput.value = word.word;
          hintInput.value = word.hint;
        }
      });
      break;
    case FIFTH_GRADE:
      currentUser.words.FIFTH_GRADE.forEach(function (word) {
        if (word.uid == uid) {
          wordInput.value = word.word;
          hintInput.value = word.hint;
        }
      });
      break;
  }

  modal.style.display = "block";
}

/**
 * @description Display a modal with given id.
 *
 * @function displayModal
 * @param {String} modalName ID of modal being opened
 *
 * @todo prevent one model from opening if another is open
 */
function displayModal(modalName, data) {
  let modal = document.getElementById(modalName);

  if (data != null) {
    modal.dataset.uid = data;
  }
  modal.style.display = "block";
}

/**
 * @description Close a model with given id.
 *
 * @function closeModal
 * @param {String} modalName Id of the modal being hidden
 */
function closeModal(modalName) {
  let modal = document.getElementById(modalName);
  modal.style.display = "none";
}

/**
 * @description Inserts a section HTML afterend of a
 * DOM element
 *
 * @param {DOM element} element
 * @param {String} html
 */
function insertAfterEndAdjacentHTML(element, html) {
  element.insertAdjacentHTML("afterend", html);
}

/**
 * @description Redirect a teacher to game page with 
 * a given level selected.
 */
function testGame() {
  var level_select = document.getElementById("game-level");
  var level = level_select.options[level_select.selectedIndex].value;

  window.location.href = "../../game.html?level=" + level;
}
