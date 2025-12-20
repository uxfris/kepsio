import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";

export default function Homepage() {
  return (
    <main className="min-h-screen bg-background relative flex flex-col items-center">
      {/* Background Gradients/Effects could go here */}

      <Header />

      <Hero />

      {/* We can add the footer and other sections later as needed, 
            but for now the design only showed the Hero area predominantly 
            until scrolling down. */}
    </main>
  );
}