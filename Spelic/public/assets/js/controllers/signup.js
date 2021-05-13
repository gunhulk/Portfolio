function signUp() {
	var errorMessage = document.querySelector("#error-message");
	var name = document.querySelector("#name").value;
	var email = document.querySelector("#email").value;
	var password = document.querySelector("#password").value;
	var confirmPassword = document.querySelector("#confirm-password").value;

	if (password == confirmPassword) {
		promise = createUserWithEmailAndPassword(email, password);

		promise.then(function(result) {
			if (result.user != null) {
				// User is successfully logged in

				// TODO: dynamically redirect user based on if
				// user account is teacher or student.
				updateUserDisplayName(name);
				dbPromise = pushBlankUserToDatabase(result.user.uid, ACCOUNT_TYPE_TEACHER);

				dbPromise.then(function(result) {
					if (result == true) {
						window.location.replace("teacher/home.html");
					} else {
						alert(result)
					}
				});
			} else {
				// Error attempting to sign in user
				errorMessage.innerHTML = result;
			}
		});
	} else {
		errorMessage.innerHTML = "Passwords do not match";
	}
}
