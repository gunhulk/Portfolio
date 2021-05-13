
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
apiKey: "AIzaSyC5QHaYUnk-U5H9YHDaqobrTdl5PpysvyY",
authDomain: "galaxy-chores.firebaseapp.com",
databaseURL: "https://galaxy-chores-default-rtdb.firebaseio.com",
projectId: "galaxy-chores",
storageBucket: "galaxy-chores.appspot.com",
messagingSenderId: "411919216683",
appId: "1:411919216683:web:208dccfb7b6c3378533a6e",
measurementId: "G-S2Y15P3DGH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
var database = firebase.database();


function signup(){
    window.location="signup.html"
}

function signupclick(){
    var emails = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.createUserWithEmailAndPassword(emails.value, password.value);
    promise.then(cred => {
        alert("You signed up! Now login with your credentials.");
        window.location="login.html"; 
    });       
    promise.catch(e => {
        alert(e.message);
    });
}

function setup(){ 
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var email = user.email;
    var uListRef = firebase.database().ref('users/' + userId);
    uListRef.set({
        name: document.getElementById("user").value,
        email: email,
        rank: "Cadet",
        credits: 0,
        exp: 0,
        lvl: 0,
        lvlB: 500,
        pending:0,
        setup: "done"
}).then(function() {
    window.location = "home.html";
});
}

function login(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.then(cred => {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                var r = firebase.database().ref('/users/' + user.uid + "/setup");
                r.on('value', (snapshot) => {
                const data = snapshot.val();
                if("done" === data){
                    window.location="home.html";
                }
                else{
                    window.location="setup.html";
                }
            })
        }
    })
        });
    promise.catch(e => {
        alert(e.message);
    })  
}

function logout(){
    auth.signOut();
    window.location="login.html";
    alert("You Logged Out");
}

function forgotPassword(){
    window.location="resetPassword.html";
}

function sendEmail(){
    var inputEmail = document.getElementById("inputEmail");
    firebase.auth().sendPasswordResetEmail(inputEmail.value);
    alert("Password Recovery Email Sent");
}

function popup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

function createpop() {
    document.getElementById('displayChangeCredits').style.display = "block";
    document.getElementById('displayChangeCredits').style.display = "block";
}

function editChore(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var i = 0;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            const b = document.querySelectorAll(".chorebtn");
            b.forEach(childSnapshot => childSnapshot.addEventListener("click", function() {
                window.resultExp = parseInt(childSnapshot.value);
                window.resultCredits = parseInt(childSnapshot.getAttribute("data-value"));
                keys = childSnapshot.getAttribute("data-id");
                console.log(keys);
                r.child(keys).update({
                    ccredits: +document.getElementById("editCredit").value,
                    cexp: +document.getElementById("editExp").value
            });
                //location.reload();   
            }));
        //levelup(); 
        //window.onload = levelup();
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
    
}

function settings(){
    window.location="settings.html";
}

function displayUserName(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/name");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayName").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayName").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserEmail(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/email");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayEmail").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayEmail").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserExp(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/exp");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayExp").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayExp").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserBonus(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/lvlB");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayBonus").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayBonus").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserlvl(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/lvl");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displaylvl").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displaylvl").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserCredits(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/credits");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayCredits").innerHTML = data;
    });
        } else {
          // No user is signed in.
            document.getElementById("displayCredits").innerHTML = "You are not signed in!"
        }
      });  
}

function displayUserRank(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
            var r = firebase.database().ref('/users/' + user.uid + "/rank");
            r.on('value', (snapshot) => {
            const data = snapshot.val();
            document.getElementById("displayRank").innerHTML = data + "  ";
    });
        } else {
          // No user is signed in.
            document.getElementById("displayRank").innerHTML = "You are not signed in!"
        }
      });  
}
  
function home(){
    window.location="home.html";
}

function blogin(){
    window.location="login.html";
}

function changeuser(){
    var userId = firebase.auth().currentUser.uid;
    database.ref("users/" + userId).update({name: document.getElementById("user").value});
    displayUserName();
    displayUserEmail();
    displayUserExp();
    displayUserCredits();
}

function changebonus(){
    var userId = firebase.auth().currentUser.uid;
    database.ref("users/" + userId).update({lvlB: parseInt(document.getElementById("lvlB").value)});
    displayUserName();
    displayUserBonus();
    displayUserEmail();
    displayUserExp();
    displayUserCredits();
}

function createchores(){
    window.location="createChores.html";
}

function missions(){
    window.location="missions.html";
}

function createchore(){
    var userId = firebase.auth().currentUser.uid;
    var choreListRef = firebase.database().ref('users/' + userId + "/chores");
    var newChoreRef = choreListRef.push();
    newChoreRef.update({
        clocation: document.getElementById("cLocation").value,
        cname: document.getElementById("cName").value,
        cdescription: document.getElementById("cDescription").value,
        ccredits: +document.getElementById("cCredits").value,
        cexp: +document.getElementById("cExp").value
});
    displayChoreName();
    window.location="createChores.html";
}

function displayOneChore(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    document.getElementById("displayOneChore").innerHTML += (String(childData["clocation"] + " " +
                    childData["cname"] + " " +
                    childData["cdescription"] + " " +
                    childData["ccredits"] + " " +
                    childData["cexp"]) + "<br />"
                    );
                  });   
    });
         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });

}

function displayChoreName(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    
                    document.getElementById("displayChores").innerHTML += (String("Location: " + childData["clocation"] + " Name: " +
                    childData["cname"] + "<br />" + " Description: " +
                    childData["cdescription"] + "<br />" + " Credits: " +
                    childData["ccredits"] + "<br />" + " Experience: " +
                    childData["cexp"]) + "<br />" +
                    "<button class='chorebtn homebtnc bt5' data-value='"+childData["ccredits"]+"' value= '"+childData["cexp"]+"' onclick=\"choreDone();\">Mission Complete</button><br>"
                    + "<hr />"
                    );
                    
                  });
                     
    });
         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
}

function displayChoreNameCreate(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid + "/chores").orderByChild("clocation");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var keys = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    
                    document.getElementById("displayChoresCreate").innerHTML += (String("Location: " + childData["clocation"] + "<br />" + " Mission: " +
                    childData["cname"] + "<br />" + " Description: " +
                    childData["cdescription"] + "<br />" + " Credits: " +
                    childData["ccredits"] + "<br />" + " Experience: " +
                    childData["cexp"]) +
                    "<button class='chorebtn homebtn mbtn dbtn'  data-id='"+keys+"' data-value='"+childData["ccredits"]+"' value= '"+childData["cexp"]+"' onclick=\"choreDelete();\"><i class='fas fa-trash-alt'></i> Delete Mission</button></div><br>" + 
                    "<hr />"
                    );
                    
                  });
                     
    });
         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
}

//Almost Done! Need to let buttons work on different chores.
function displayDefaultChores(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref("/defaultChores/");
            r.on('value', (snapshot) => {
                snapshot.forEach(function(childSnapshot) {
                    // key will be "ada" the first time and "alan" the second time
                    var key = childSnapshot.key;
                    // childData will be the actual contents of the child
                    var childData = childSnapshot.val(); 
                    
                    document.getElementById("displayDefaultChores").innerHTML += (String(childData["clocation"] + " " +
                    childData["cname"] + " " +
                    childData["cdescription"] + " " +
                    childData["ccredits"] + " " +
                    childData["cexp"]) + "<br />" +
                    "<button class='chorebtn' data-value='"+childData["ccredits"]+"' value= '"+childData["cexp"]+"' onclick=\"choreDone();\">Mission Complete</button><br>"
                    );  
                });
                     
    });
         
        } 
        else {
            document.getElementById("displayDefaultChores").innerHTML = "No user logged in"
        }
    });
}

//Almost Done! Need to let buttons work on different chores.
function choreDone(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var i = 0;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            var u = firebase.database().ref('/users/' + user.uid);
            const b = document.querySelectorAll(".chorebtn");
            
            b.forEach(childSnapshot => childSnapshot.addEventListener("click", function() {
                window.resultExp = parseInt(childSnapshot.value);
                window.resultCredits = parseInt(childSnapshot.getAttribute("data-value"));   
            }));
            u.once('value')
                .then(function(childSnap){
                    var userKey = childSnap.key;
                    window.userData = childSnap.val();
                    u.update({ 
                        credits: window.resultCredits + window.userData["credits"],
                        exp: window.resultExp + window.userData["exp"]
          });
        //levelup(); 
        location.reload();
        //window.onload = levelup();

    });
            
                
                         
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
    
}

//Done!
function levelup(){
    var ranks = ['Cadet', "Private", "Corporal", "Sergeant", "Master Sergeant", "Lieutenant", "First Lieutenant", "Captain", "Major", "Colonel", "General"]
    var level = 0;
    var experience = [0,100,200,400,800,1600,3200,6400,12800,25600,51200];
    var rank = "";
    var i = 0;
    var eLength = 11;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var u = firebase.database().ref('/users/' + user.uid);
            
            
            u.once('value', (snapshot) => {
                const data = snapshot.val();
                window.savelevel = data["lvl"];   
                while(eLength>1){
                    eLength = eLength - 1; 
                    if(data["exp"] >= experience[i]) {
                      level = i;
                      rank = ranks[i];
                      u.update({ 
                        lvl: level,
                        rank: rank,
                    });
                    i += 1;
                }
                
                
            } 
            i = i - 1;
            if(data["lvl"] < i){
                u.update({ 
                    credits: data["credits"] + data["lvlB"]   
                });
                alert("Congratulations you just leveled up!");
            }
            console.log(data["lvl"]);
            console.log("boom " + i);
            
            
         
        
        })
        
    }
})

}

function cashout(){
    var userId = firebase.auth().currentUser.uid;
    var uc = firebase.database().ref('/users/' + userId);
    uc.once('value')
        .then(function(childSnap){
            var userD = childSnap.val()
            console.log(userD["credits"]);
            if(userD["credits"] < document.getElementById("cashout").value){
                alert("You do not have that many credits. Please enter in another amount.");
            }
            else{
                uc.update({credits: userD["credits"] - document.getElementById("cashout").value,
                pending: parseInt(userD["pending"]) + parseInt(document.getElementById("cashout").value)});
            }
        });  
}

function displayPending(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var r = firebase.database().ref('/users/' + user.uid);
            r.on('value', (snapshot) => {
                // key will be "ada" the first time and "alan" the second time
                var key = snapshot.key;
                // childData will be the actual contents of the child
                var childData = snapshot.val(); 
                document.getElementById("pending").innerHTML = parseInt(childData["pending"]);
                });   
}
});
}

function withdraw(){
    var userId = firebase.auth().currentUser.uid;
    var uc = firebase.database().ref('/users/' + userId);
    uc.once('value')
        .then(function(childSnap){
            var userD = childSnap.val()
            if(userD["pending"] === 0){
                alert("You have no pending balance");
            }
            else{uc.update({pending: 0});
            alert("Withdraw Successful");
        }
            
        }); 
}

function cwithdraw(){
    var userId = firebase.auth().currentUser.uid;
    var uc = firebase.database().ref('/users/' + userId);
    uc.once('value')
        .then(function(childSnap){
            var userD = childSnap.val()
            if(userD["pending"] === 0){
                alert("You have no pending balance");
            }
            else{uc.update({pending: 0,
                credits: parseInt(userD["credits"]) + parseInt(userD["pending"])
            });
            alert("Withdraw Cancelled");
        } 
        });
}

function choreDelete(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            //var userId = firebase.auth().currentUser;
            var i = 0;
            var r = firebase.database().ref('/users/' + user.uid + "/chores");
            var u = firebase.database().ref('/users/' + user.uid);
            const b = document.querySelectorAll(".chorebtn");
            b.forEach(childSnapshot => childSnapshot.addEventListener("click", function() {
                window.resultExp = parseInt(childSnapshot.value);
                window.resultCredits = parseInt(childSnapshot.getAttribute("data-value"));
                keys = childSnapshot.getAttribute("data-id");
                console.log(r.child(keys));
                r.child(keys).remove();
                location.reload();   
            }));
        //levelup(); 
        //window.onload = levelup();
        } 
        else {
            document.getElementById("displayChores").innerHTML = "No user logged in"
        }
    });
    
}




