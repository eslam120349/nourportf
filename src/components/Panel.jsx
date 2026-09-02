import { useEffect, useRef, useState } from "react";

export function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

export default function Panel({ children, className = "", style = {} }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  return (
    <div
      ref={ref}
      className={`panel ${visible ? "panel--visible" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
