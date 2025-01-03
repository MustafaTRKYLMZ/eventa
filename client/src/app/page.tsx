// app/page.tsx
import NewVenuePage from "./components/NewVenuePage";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Eventa</h1>
      <NewVenuePage />
    </div>
  );
}
