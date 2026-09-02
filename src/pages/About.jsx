import SEO from "../components/SEO.jsx";
import Panel from "../components/Panel.jsx";
import { PROCESS } from "../data.js";

export default function About() {
  return (
    <div>
      <SEO
        title="About"
        description="Nour Youssef is a visual designer working across brand identity, editorial, and digital product, drawing on a background in comics and manga."
        path="/about"
        keywords="about, designer bio, design process"
      />

      <section style={{ paddingTop: 56 }}>
        <div className="section-head">
          <div>
            <p className="section-num">Panel 02</p>
            <h2 className="section-title display">About</h2>
          </div>
        </div>
        <Panel className="about-grid" style={{ border: "3px solid var(--ink)" }}>
          <div className="about-panel-a halftone">
            <svg viewBox="0 0 120 160" width="140" style={{ margin: "0 auto" }}>
              <path
                d="M60 14 C78 14 90 28 90 48 C90 64 82 74 70 80 C70 80 100 90 106 122 L106 150 L14 150 L14 122 C20 90 50 80 50 80 C38 74 30 64 30 48 C30 28 42 14 60 14 Z"
                fill="var(--paper)" stroke="var(--ink)" strokeWidth="3"
              />
            </svg>
            <div className="stat-row">
              <div className="stat">
                <p className="stat-num">8</p>
                <p className="stat-label">Years in practice</p>
              </div>
              <div className="stat">
                <p className="stat-num">40+</p>
                <p className="stat-label">Brands shipped</p>
              </div>
            </div>
          </div>
          <div className="about-panel-b">
            <div className="bubble">
              I'm Nour Youssef, a visual designer working across brand identity, editorial, and digital
              product. I grew up reading manga and Silver Age comics, and it shows — everything I make
              starts with a strong line, a clear panel, and a willingness to leave things black and white
              when color would only get in the way.
              <br /><br />
              I work directly with founders and small teams, from first sketch to final delivery, and I
              hand off systems that hold up long after I'm off the project.
            </div>
          </div>
        </Panel>
      </section>

      <section style={{ borderBottom: "none" }}>
        <div className="section-head">
          <div>
            <p className="section-num">Panel 03</p>
            <h2 className="section-title display">How a project runs</h2>
          </div>
        </div>
        <Panel className="process-strip">
          {PROCESS.map((step) => (
            <div className="process-card" key={step.id}>
              <span className="process-id">{step.id}</span>
              <h3 className="process-title">{step.title}</h3>
              <p className="process-text">{step.text}</p>
            </div>
          ))}
        </Panel>
      </section>
    </div>
  );
}
