/**
 * @description object to hold teacher profile
 * 
 * @var teacher
 * @param {firebase.auth().user} auth
 * @param {[student]} students
 * @param {[word]} words
 * @param {ACCOUNT_TYPE_TEACHER} accountType
 */
var teacher = {
    auth: undefined,
    students: [],
    words: undefined, 
    accountType: ACCOUNT_TYPE_TEACHER
}

/**
 * @description object to hold student profile
 * 
 * @var student
 * @param {firebase.auth().user} auth
 * @param {ACCOUNT_TYPE_STUDENT} accountType
 */
var student = {
    auth: undefined,
    accountType: ACCOUNT_TYPE_STUDENT,
    grade: undefined
}

/**
 * @description object to hold all customWords
 * @see customWord
 * 
 * @var customWords
 * @param {[customWord]} FIRST_GRADE
 * @param {[customWord]} SECOND_GRADE
 * @param {[customWord]} THIRD_GRADE
 * @param {[customWord]} FOURTH_GRADE
 * @param {[customWord]} FIFTH_GRADE 
 */
var customWords = {
    FIRST_GRADE: [],
    SECOND_GRADE: [],
    THIRD_GRADE: [],
    FOURTH_GRADE: [],
    FIFTH_GRADE: [],
}

/**
 * @description object to hold a word and its hint
 * 
 * @var word
 * @param {String} word
 * @param {String} hint
 * @param {String} uid
 */
var word = {
    word: undefined,
    hint: undefined,
    uid: undefined
}

/**
 * @description required return from async functions
 * 
 * @var asyncReturn
 * @param {Boolean} success
 * @param {*} return either the return from the async
 * call or the error 
 */
var asyncReturn = {
    success: undefined,
    return: undefined
}