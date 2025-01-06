export const AddButton = ({ floor, addSection }) => {
  return (
    <div className="flex justify-end items-center">
      {/* <h2 className="text-lg font-bold">{floor.name}</h2> */}
      <button
        className="bg-blue-500 text-white px-2 py-1 rounded"
        onClick={() => addSection(floor.id)}
      >
        +
      </button>
    </div>
  );
};
