// "use strict";
// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("form");
//   form.addEventListener("submit", formSend);

//   async function formSend(e) {
//     e.preventDefault();

//     let error = formValidation(form);
//   }

//   function formSend(e) {
//     let error = 0;
//     let formReq = document.querySelectorAll("._req");

//     for (let index = 0; index < formReq.length; index++) {
//       const input = formReq[index];

//       formRemoveError(input);

//       if (input.classList.contains("_email")) {
//         if (emailTest(input)) {
//           formAddError(input);
//           error++;
//         } else {
//           if (input.value === "") {
//             formAddError(input);
//             error++;
//           }
//         }
//       }
//     }
//     function formAddError(input) {
//       input.parentElement.classList.add("_error");
//       input.classList.add("_error");
//     }
//     function formRemoveError(input) {
//       input.parentElement.classList.add("_error");
//       input.classList.add("_error");
//     }
//     function emailTest(input) {
//       return !/^\w+([\.-]?\w+)*@\w+([\.-]?\W+)*(\.\w{2,8})+$/.test(input.value);
//     }
//   }
// });
