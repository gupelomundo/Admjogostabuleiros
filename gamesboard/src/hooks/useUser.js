import useAppContext from "./useAppContext";

export default function useUser() {
  const { loggedUser, authenticate, setLoggedUser } = useAppContext();

  return {
    loggedUser,
    authenticate,
    setLoggedUser,
  };
}
