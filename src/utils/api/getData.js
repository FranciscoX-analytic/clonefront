// import http from "../../service/httpCommon";

// export async function getData(url, header = null) {
//     let data = [];
//     if (header) {
//       await http
//         .get(url, header)
//         .then((response) => {
//           //console.log(response);
//           data = response.data;
//         })
//         .catch((e) => {
//           console.log(e);
//           console.log(e.status);
//           //if (e.toString().includes(401)) {
//            // storeAuth.logout();
//           //}
//         });
//     } else {
//       await http
//         .get(url)
//         .then((response) => {
//           data = response.data;
//         })
//         .catch((e) => {
//           console.log(e);
//           //if (e.toString().includes(401)) {
//            // storeAuth.logout();
//           //}
//         });
//     }
//     return data;
//   }

//   export async function getData1(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//       method: 'GET', // *GET, POST, PUT, DELETE, etc.
//       mode: 'no-cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json();
// }