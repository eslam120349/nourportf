import SEO from "../components/SEO.jsx";
import Panel from "../components/Panel.jsx";
import { PROJECTS } from "../data.js";

export default function Work() {
  return (
    <div>
      <SEO
        title="Selected work"
        description="Six projects across brand identity, editorial design, packaging, and interface design by Nour Youssef."
        path="/work"
        keywords="portfolio, brand identity, packaging design, editorial design, app design"
      />

      <section style={{ paddingTop: 56 }}>
        <div className="section-head">
          <div>
            <p className="section-num">Panel 01</p>
            <h2 className="section-title display">Selected work</h2>
          </div>
          <p style={{ maxWidth: "34ch", fontSize: 13, color: "var(--gray)" }}>
            Six projects, six different problems — branding, print, and interface work from the last three years.
          </p>
        </div>
        <div className="work-grid">
          {PROJECTS.map((p) => (
            <Panel key={p.id} className="work-card">
              <div>
                <p className="work-id">{p.id}</p>
                <h3 className="work-title display">{p.title}</h3>
                <p className="work-meta">{p.type} · {p.year}</p>
              </div>
              <p className="work-blurb">{p.blurb}</p>
            </Panel>
          ))}
        </div>
      </section>
    </div>
  );
}
