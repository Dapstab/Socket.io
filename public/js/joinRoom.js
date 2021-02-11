import axios from "axios";

/* algo.addEventListener("click", () => {
  console.log(username.value);
}); */

export const getIntoRoom = async (username, room) => {
  //console.log("AXIOS", username, room);
  try {
    const res = await axios({
      method: "POST",
      // Cambiar las url's dependiendo si estamos en production o en development
      url: "/api/v1/users",
      data: {
        name: username,
        activeRoom: room,
      },
    });
    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign(`/chat/${username}`);
      }, 1500);
    }
  } catch (err) {
    console.log("Hubo un error en axios");
  }
};
