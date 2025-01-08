export type InputProps = {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export const Input = ({ label, value, onChange, type }: InputProps) => {
  return (
    <label className="display flex flex-row gap-4 text-gray-700 font-bold mb-2 justify-center items-center">
      {label}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </label>
  );
};
