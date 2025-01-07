export type Input = {
  label: string;
  name: string;
  type?: string;
  value: string | number;

  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const Input = ({
  label,
  name,
  type,
  value,
  handleInputChange,
}: Input) => {
  return (
    <label className="flex flex-row gap-1 items-center justify-start">
      {label}:
      <input
        type={type}
        name={name}
        style={{
          color: "black",
          padding: "5px",
          borderRadius: "5px",
        }}
        value={value}
        onChange={handleInputChange}
      />
    </label>
  );
};
