import { useState } from "react";
import { NavLink, useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const ORDER = ["/", "/work", "/about", "/contact"];

const TABS = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

// Pages hinge on the edge they're travelling toward. transformOrigin is
// kept IDENTICAL between "enter" and "center" (only exit's differs) —
// transformOrigin doesn't tween like rotateY does, it snaps instantly, so
// if "center" reset it to the middle, the pivot would jump there the
// instant the entrance animation starts and the page would appear to grow
// out from the middle of the screen instead of swinging in from the edge.
// Opacity is also delayed relative to rotation (via per-property
// transitions below) so the page is still visibly turning in 3D before it
// fades, rather than reading as a plain crossfade.
const pageVariants = {
  enter: (direction) => ({
    rotateY: direction >= 0 ? 90 : -90,
    opacity: 0,
    filter: "brightness(0.6)",
    transformOrigin: direction >= 0 ? "left center" : "right center",
  }),
  center: (direction) => ({
    rotateY: 0,
    opacity: 1,
    filter: "brightness(1)",
    transformOrigin: direction >= 0 ? "left center" : "right center",
  }),
  exit: (direction) => ({
    rotateY: direction >= 0 ? -90 : 90,
    opacity: 0,
    filter: "brightness(0.6)",
    transformOrigin: direction >= 0 ? "right center" : "left center",
  }),
};

const pageTransition = {
  rotateY: { duration: 0.6, ease: [0.62, 0.04, 0.28, 1] },
  filter: { duration: 0.6, ease: [0.62, 0.04, 0.28, 1] },
  opacity: { duration: 0.6, times: [0, 0.55, 1] },
};

export default function Layout() {
  const location = useLocation();
  // useOutlet() (rather than <Outlet/> inline) captures the matched route's
  // element as a plain value we control the key/wrapper for, so the OLD
  // page's own subtree keeps rendering untouched while it plays its exit
  // animation, instead of being swapped out the instant the route changes.
  const outletElement = useOutlet();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = Math.max(ORDER.indexOf(location.pathname), 0);
  // Direction is decided at click time (see state={{ direction }} on each
  // NavLink below) and travels with the navigation via location.state —
  // no ref, no render-order dependency, nothing for StrictMode's double
  // render to desync.
  const direction = location.state?.direction ?? 1;

  return (
    <div className="page">
      <nav className="nav">
        <NavLink to="/" className="nav-mark" onClick={() => setMenuOpen(false)}>
          <span className="nav-mark-dot" />
          Nour Youssef
        </NavLink>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {TABS.map((tab, i) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              state={{ direction: i - currentIndex || 1 }}
              end={tab.to === "/"}
              className={({ isActive }) => `nav-tab ${isActive ? "nav-tab--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {tab.label}
            </NavLink>
          ))}
        </div>
        <button className="nav-burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className="book-stage">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={location.pathname}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="book-page"
          >
            {outletElement}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer>
        <span>© {new Date().getFullYear()} Nour Youssef. All rights reserved.</span>
        <span>Designed panel by panel.</span>
      </footer>
    </div>
  );
}
