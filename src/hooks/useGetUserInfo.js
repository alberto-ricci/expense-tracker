export const useGetUserInfo = () => {
  const auth = localStorage.getItem("auth");
  if (!auth) {
    return { name: "", profilePhoto: "", userID: "", isAuth: false };
  }

  const { name, profilePhoto, userID, isAuth } = JSON.parse(auth);
  return { name, profilePhoto, userID, isAuth };
};
