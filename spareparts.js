socketRef.current.on("connect_error", (err) => handleErrors(err));
socketRef.current.on("connect_failed", (err) => handleErrors(err));

function handleErrors(e) {
  console.log("socket error", e);
  toast.error("Socket connection failed, try again later");
  reactNavigator("/");
}
