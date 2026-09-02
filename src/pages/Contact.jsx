import { useState } from "react";
import SEO from "../components/SEO.jsx";
import Panel from "../components/Panel.jsx";
import { QUOTES } from "../data.js";

export default function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSent(true);
  };

  return (
    <div>
      <SEO
        title="Contact"
        description="Get in touch with Nour Youssef about a brand identity, print, or interface design project."
        path="/contact"
        keywords="contact, hire designer, design inquiry"
      />

      <section style={{ paddingTop: 56 }}>
        <div className="section-head">
          <div>
            <p className="section-num">Panel 04</p>
            <h2 className="section-title display">What clients say</h2>
          </div>
        </div>
        <div className="quotes-grid">
          {QUOTES.map((q, i) => (
            <Panel className="quote-bubble" key={i}>
              <span className="quote-mark display">&ldquo;</span>
              {q.quote}
              <p className="quote-who">{q.name} — {q.role}</p>
            </Panel>
          ))}
        </div>
      </section>

      <section style={{ borderBottom: "none" }}>
        <div className="section-head">
          <div>
            <p className="section-num">Final panel</p>
            <h2 className="section-title display">Let's start something</h2>
          </div>
        </div>
        <Panel className="contact-inner">
          <div className="contact-left">
            <h3 className="contact-title display">Have a brief?<br />Send it over.</h3>
            <p className="contact-text">
              Best for identity, print, and interface work. I reply within two working days, wherever
              in the world you're writing from.
            </p>
            <a className="contact-email" href="mailto:hello@nouryoussef.design">hello@nouryoussef.design</a>
            <div className="contact-socials">
              <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Behance</a>
              <a href="#" onClick={(e) => e.preventDefault()}>LinkedIn</a>
            </div>
          </div>
          <div>
            {sent ? (
              <p className="sent-msg">Message sent — I'll be in touch soon.</p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="field-label" htmlFor="name">Name</label>
                  <input id="name" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="Your name" />
                </div>
                <div>
                  <label className="field-label" htmlFor="email">Email</label>
                  <input id="email" type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="you@studio.com" />
                </div>
                <div>
                  <label className="field-label" htmlFor="message">Project brief</label>
                  <textarea id="message" value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="Tell me what you're building" />
                </div>
                <button className="send-btn" type="submit">Send message</button>
              </form>
            )}
          </div>
        </Panel>
      </section>
    </div>
  );
}
