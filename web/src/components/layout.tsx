import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    <main className="flex flex-col h-screen">
      <Header />
      <Outlet />
    </main>
  );
}
