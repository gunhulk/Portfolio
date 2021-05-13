const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * @description Attempt to create a student account using
 * Firebase Admin function.
 * @see admin.auth().createUser()
 *
 * @async
 * @function
 * @param {String} name displayName for student account
 * @param {String} password the password for new student account
 * @param {String} teacherName displayName of students teacher
 * @returns {Promise} on success the uid of the new student is
 * returned, else an error is returned.
 *
 * @todo rethink student email format. Current has high potential
 * for duplicates.
 */
exports.createStudentAccountFunction = functions.https.onCall(
  (data, context) => {
    return admin
      .auth()
      .createUser({
        email: data.name + "@" + data.teacherName + ".com",
        displayName: data.name,
        password: data.password,
      })
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully created new user:", userRecord.uid);
        return { uid: userRecord.uid };
      })
      .catch(function (error) {
        console.log("Error creating new user: ", error);
        return { error: error };
      });
  }
);

/**
 * @description Retrieve the Firebase Authentication account
 * of student given their uid. Uses Firebase Authentication
 * Admin functions.
 * @see admin.auth().getUser()
 *
 * @async
 * @function retrieveStudentAuthFunction
 * @param {String} uid the firebase auth id of the requested
 * student
 * @returns {Promise} on success an array or length two is
 * is returned in the format: [true, authAccount]. On error
 * the array is in format: [false, error]
 */
exports.retrieveStudentAuthFunction = functions.https.onCall(
  (data, context) => {
    return admin
      .auth()
      .getUser(data.uid)
      .then(function (userRecord) {
        return [true, userRecord];
      })
      .catch(function (error) {
        console.log("Error retrieving student name: ", error);
        return [false, error];
      });
  }
);

/**
 * @description Reset the password of a students account based
 * on a given uid
 * @see admin.auth.updateUser()
 *
 * @async
 * @function resetStudentPasswordFunction
 * @param {String} uid
 * @param {String} password
 * @returns {Promise} An array with the first index containing
 * the succes of the request. The second index holds the return 
 * message for the user.
 * 
 * @todo Unable to run function due to CORS restrictions
 */
exports.resetStudentPasswordFunction = functions.https.onCall(
  (data, context) => {
    return admin
      .auth()
      .updateUser(data.uid, {
        password: data.password,
      })
      .then(function (userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user", userRecord.toJSON());
        return [true, "Password successfully updated"];
      })
      .catch(function (error) {
        console.log("Error updating user:", error);
        return [false, error];
      });
  }
);