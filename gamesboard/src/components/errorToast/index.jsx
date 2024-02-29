import useError from "../../hooks/useError";
export default function ErrorToast() {
  const error = useError();

  return (
    error && (
      <div className="fixed bottom-10 right-10 bg-red-500  text-white p-4 rounded-md w-[350px] text-center ease-in-out shadow px-8">
        {error}
      </div>
    )
  );
}
