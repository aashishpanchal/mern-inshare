import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky bg-white border-stone-100 border-b px-10">
      <Link to="/" className="inline-block w-36 overflow-hidden">
        <img src={logo} alt="inShare logo" className="w-full" />
      </Link>
    </header>
  );
}
