import useAppContext from "./useAppContext";

export default function useError() {
  const { error } = useAppContext();

  return error;
}
