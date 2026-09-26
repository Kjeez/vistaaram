import { comparisonContent } from "@/data/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Comparison() {
  const { sectionTitle, sectionSubtitle, rows } = comparisonContent;

  return (
    <section id="comparison" className="section-padding bg-white">
      <div className="container-narrow mx-auto">
        <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

        <div className="overflow-x-auto">
          <table className="w-full max-w-3xl mx-auto border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 text-sm uppercase tracking-wider text-gray-warm font-medium border-b-2 border-gold/30">
                  Feature
                </th>
                <th className="text-center p-4 text-sm uppercase tracking-wider text-maroon font-bold border-b-2 border-gold/30 bg-gold/5">
                  ✦ Vistaaram
                </th>
                <th className="text-center p-4 text-sm uppercase tracking-wider text-gray-warm font-medium border-b-2 border-gold/30">
                  Others
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-gold/10 hover:bg-gold/5 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-ink">
                    {row.feature}
                  </td>
                  <td className="p-4 text-sm text-center text-maroon font-medium bg-gold/5">
                    {row.vistaaram}
                  </td>
                  <td className="p-4 text-sm text-center text-gray-warm">
                    {row.others}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
