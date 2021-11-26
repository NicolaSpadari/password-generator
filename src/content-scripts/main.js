import { createApp } from "vue";
import Popup from "./Popup.vue";
import "virtual:windi-base.css";
import "virtual:windi-utilities.css";
import "virtual:windi-devtools";

const MOUNT_EL_ID = "ns-password-generator";

let mountEl = document.getElementById(MOUNT_EL_ID);
if (mountEl) {
    mountEl.innerHTML = "";
}
mountEl = document.createElement("div");
mountEl.setAttribute("id", MOUNT_EL_ID);
document.body.appendChild(mountEl);

createApp(Popup).mount(mountEl);

// chrome.action.onClicked.addListener(tab => {
//     chrome.action.setPopup({ tabId: tab.id, popup: "./Popup.vue" });
// });
