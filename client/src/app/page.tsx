// app/page.tsx
import NewVenuePage from "./components/NewVenuePage";

export default function Home() {
  return (
    <div className="display flex flex-col items-center justify-center m-0 p-0">
      <h1 className="text-3xl font-bold mb-4 p-4">Welcome to Eventa</h1>
      <NewVenuePage />
    </div>
  );
}
