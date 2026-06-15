import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero onGetStarted={onGetStarted} />

      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-5xl font-bold text-center mb-16">
          Why Choose EcoStay?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <Card
            title="Eco Homestays"
            description="Stay with local families and support sustainable tourism."
          />

          <Card
            title="Responsible Travel"
            description="Reduce environmental impact while exploring new places."
          />

          <Card
            title="Community Support"
            description="Help local communities grow through tourism."
          />
        </div>
      </section>

      <Footer />
    </div>
  );
}