//creates a HTTP message that is to be sent to the backend
const xhr = new XMLHttpRequest();

//we set up the eventlistener b4 sending the request, its the same aswhen you set us an eeventlistener function before now clicking the button function. so this code wait for the response from the request.
xhr.addEventListener("load", () => {
  console.log(xhr.response);
});

//set up the request, the request method, request URL, and synchronous flag etc
xhr.open("GET", "https://supersimplebackend.dev");
xhr.send();

//we can also send our request through diffrennt url path
//status code that starts with 2 means its successfull.that which start with 4 means its the engineers problem, thatwhich starts with 5 means , thebackend crashed.

//the list of URL path that re supported is the known as the backend API (Application Programming interface.)