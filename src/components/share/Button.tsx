interface IButton {
  handleSubmit: () => void;
  describe: string;
}
export default function Button({ handleSubmit, describe }: IButton) {
  return (
    <button className="bg-primary text-white p-2 rounded-2xl w-full" onClick={handleSubmit}>
      {describe}
    </button>
  );
}
