import "@babel/polyfill";
import { getIntoRoom } from "./joinRoom";

const joinForm = document.querySelector(".joinForm");
//const algo = document.querySelector(".algo");

/* if (algo) {
  algo.addEventListener("click", () => {
    //e.preventDefault();
    const username = document.getElementById("username").value;
    const room = document.getElementById("room").value;
    getIntoRoom(username, room);
  });
} */

if (joinForm) {
  joinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const room = document.getElementById("room").value;
    getIntoRoom(username, room);
  });
}
