import Link from "next/link";
import Navigation from "./components/navigation";

export default function Page() {
  return (
    <div>
      <Navigation />
      The Wild Oasis. Welcome to the paradise.

      <Link href="/cabins">Explore luxury cabins</Link>
    </div>
  )
}
