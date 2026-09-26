import { howToUseContent } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";
import GoldIcon from "@/components/ui/GoldIcon";

export default function HowToUse() {
  const { sectionTitle, sectionSubtitle, steps } = howToUseContent;

  return (
    <section id="how-to-use" className="section-padding bg-cream">
      <div className="container-narrow mx-auto">
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className="absolute -top-3 -left-1 text-6xl font-bold text-gold/10 font-display select-none">
                {step.step}
              </div>
              <GoldIcon size="lg">{step.icon}</GoldIcon>
              <h3 className="mt-4 text-lg font-semibold text-maroon-dark">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-warm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
