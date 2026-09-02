import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Panel from "../components/Panel.jsx";
import { PROJECTS } from "../data.js";

export default function Home() {
  const featured = PROJECTS.slice(0, 3);

  return (
    <div>
      <SEO
        title="Visual designer"
        description="Nour Youssef is a visual designer working across brand identity, editorial, and digital product — bold ink, clean grids, and a story that reads in a single glance."
        path="/"
        keywords="visual designer, brand identity, graphic design, editorial design, packaging design, portfolio"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Nour Youssef",
          jobTitle: "Visual Designer",
          url: "https://www.nouryoussef.design",
          sameAs: [
            "https://www.instagram.com/nouryoussef",
            "https://www.behance.net/nouryoussef",
            "https://www.linkedin.com/in/nouryoussef",
          ],
        }}
      />

      <div className="hero">
        <div className="hero-main">
          <p className="hero-eyebrow">Visual designer — based worldwide, working remotely</p>
          <h1 className="hero-title display in">
            <span>Nour</span>
            <span>Youssef</span>
          </h1>
          <p className="hero-sub">
            I design brand worlds with the clarity of a comic panel — bold ink, clean grids, and a story
            that reads in a single glance. Identity, print, and product design for clients who want
            something with a spine.
          </p>
          <Link to="/work" className="hero-cta">View the work →</Link>
        </div>
        <div className="hero-side halftone">
          <div className="hero-badge">OPEN FOR PROJECTS</div>
          <svg className="hero-silhouette" viewBox="0 0 200 260" preserveAspectRatio="xMidYMax meet">
            <path
              d="M100 24 C130 24 148 46 148 78 C148 104 136 120 118 128 C118 128 168 142 176 190 L176 250 L24 250 L24 190 C32 142 82 128 82 128 C64 120 52 104 52 78 C52 46 70 24 100 24 Z"
              fill="var(--paper)" stroke="var(--ink)" strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      <section>
        <div className="section-head">
          <div>
            <p className="section-num">Panel 01</p>
            <h2 className="section-title display">A few recent pages</h2>
          </div>
          <Link to="/work" className="text-link">See all work →</Link>
        </div>
        <div className="work-grid">
          {featured.map((p) => (
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

      <section style={{ borderBottom: "none" }}>
        <Panel className="cta-strip">
          <h2 className="cta-title display">Have a brief? Let's open the book.</h2>
          <Link to="/contact" className="hero-cta">Get in touch →</Link>
        </Panel>
      </section>
    </div>
  );
}
