var titleHeader = document.getElementById("title-header");
var gradeLevel = document.getElementById("grade-level");

/**
 * @description listen to updates on the user status. If the
 * user is signed in we update the ui of home page.
 */
currentUserListener.registerListener(function (val) {
  console.log(currentUser);
  if (val) {
    // User is signed in
    if (currentUserIsStudent()) {
      // Update display name
      var displayName = currentUser.auth.displayName;
      if (displayName) {
        titleHeader.innerHTML = "Welcome " + displayName;
      } else {
        username.value = null;
      }

      if (currentUser.grade) {
        gradeLevel.innerHTML =
          "Welcome back " +
          displayName +
          ", you are currently in grade " +
          currentUser.grade +
          ".";
      } else {
        gradeLevel.innerHTML =
          "Welcome back " + displayName + ", you are currently in grade 1.";
      }
    } else if (currentUserIsTeacher()) {
      window.location.replace("/teacher/home.html");
    } else {
      console.log("Unknown user account type.");
    }
  } else {
    // User is not signed in
    window.location.replace("/");
  }
});

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
 * @description Display a modal with given id.
 *
 * @function displayModal
 * @param {String} modalName ID of modal being opened
 *
 * @todo prevent one model from opening if another is open
 */
function displayModal(modalName) {
  let modal = document.getElementById(modalName);
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
