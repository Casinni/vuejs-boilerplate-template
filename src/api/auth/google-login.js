import store from "@/store";
import router from "@/router";
import axios from "@/plugins/axios";

export async function googleLogin(googleToken) {
  store.dispatch("loading", true).then();
  const token = googleToken.credential;
  const response = await axios.post("/auth/google", { token });
  if (response.status === 200) {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + response.data.accessToken;
    const accessToken = response.data.accessToken;
    store.dispatch("insertAccessToken", accessToken).then();
    store.dispatch("loading", false).then();
    router.push({ name: "Dashboard" }).then();
  } else {
    store.dispatch("loading", false).then();
  }
}
