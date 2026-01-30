import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.axios = axios;
window.Pusher = Pusher;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.Echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST, // Should resolve to localhost
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8081,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 8081,
    forceTLS: false,
    enabledTransports: ["ws", "wss"],
});
