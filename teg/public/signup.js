/** IGNORE FOR NOW
document.getElementById("get-started").onclick = function(eventvar) {

  // eventvar.preventDefault()
  console.log("weClick")
  //NOTE: assigning variables to store user information
  let email = document.getElementById("email").value
  let pass = document.getElementById("password").value
  let user = document.getElementById("username").value
  console.log(email, pass, user)

//NOTE: Making a Post (CRUD) fetch request to the SignUp route
  fetch('signup',{
    method:'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
      "password": pass,
      "username": user,
    })
  })
  .then(response => {
     if (response.ok) {
       console.log("success: ");
       console.log(response);
       window.location.href = '/profile'
       // return response.json()
     }
   })
}
**/

document.getElementById("signup-pagina1").onclick = function(eventvar) {

  // eventvar.preventDefault()
  console.log("weClick")
  //NOTE: assigning variables to store user information
  let goalweight = document.getElementById("goalweight").value
  let currentweight = document.getElementById("currentweight").value

  console.log(goalweight, currentweight)

//NOTE: Making a Post (CRUD) fetch request to the SignUp route
  fetch('signuppagina1',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "goalweight": goalweight,
      "currentweight": currentweight,
    })
  })
  .then(response => {
     if (response.ok) {
       console.log("success: ");
       console.log(response);
       // return response.json()
     }
   })
}

// document.getElementById("signup-pagina2").onclick = function(eventvar) {
//
//   // eventvar.preventDefault()
//   console.log("weClick")
//   //NOTE: assigning variables to store user information
//   let allergies = document.getElementById("allergies").value
//
//   console.log(allergies)
//
// //NOTE: Making a Post (CRUD) fetch request to the SignUp route
//   fetch('signup',{
//     method:'put',
//     headers:{
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       "allergies": allergies,
//
//     })
//   })
//   .then(response => {
//      if (response.ok) {
//        console.log("success: ");
//        console.log(response);
//        // return response.json()
//      }
//    })
// }
