import { Blog } from "@/components/sections/Blog";
import { Footer } from "@/components/sections/Footer";

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-black pt-10">
      <Blog />
      <Footer />
    </main>
  );
}
