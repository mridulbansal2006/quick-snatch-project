import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [useLightText, setUseLightText] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const navbarY = 70; // navbar center position from top
      const centerX = window.innerWidth / 2;
      
      // Get element behind navbar
      const element = document.elementFromPoint(centerX, navbarY);
      
      if (!element) {
        setUseLightText(true);
        return;
      }

      // Walk up DOM tree to find actual background color
      let currentElement = element;
      let foundBackground = false;
      
      for (let i = 0; i < 20 && currentElement; i++) {
        const style = window.getComputedStyle(currentElement);
        const bg = style.backgroundColor;
        
        // Check if we found a non-transparent background
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = bg.match(/\d+/g);
          if (rgb && rgb.length >= 3) {
            const r = parseInt(rgb[0]);
            const g = parseInt(rgb[1]);
            const b = parseInt(rgb[2]);
            
            // Calculate perceived brightness
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
            
            // If background is bright (>150), use dark text
            // If background is dark (<150), use light text
            setUseLightText(brightness < 150);
            foundBackground = true;
            break;
          }
        }
        
        currentElement = currentElement.parentElement;
      }
      
      // Default to white text if no background found
      if (!foundBackground) {
        setUseLightText(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    const timer = setTimeout(handleScroll, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const go = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = `/#${id}`;
  };

  // ONLY text colors change - background stays the same
  const textColor = useLightText ? "#fff" : "#000";
  const mutedColor = useLightText ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)";

  return (
    <nav
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,

        height: "48px",
        padding: "0 26px",
        borderRadius: "999px",

        // BACKGROUND STAYS THE SAME - TRANSPARENT GLASS EFFECT
        background: "linear-gradient(180deg, rgba(255,255,255,0.22), rgba(255,255,255,0.10))",
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",

        border: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 10px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35)",

        display: "flex",
        alignItems: "center",
        gap: "22px",
        whiteSpace: "nowrap",
      }}
    >
      {/* QS */}
      <div
        onClick={() => go("hero")}
        style={{
          fontWeight: 700,
          fontSize: "0.9rem",
          color: textColor,
          cursor: "pointer",
          transition: "color 0.4s ease",
        }}
      >
        QS.
      </div>

      {/* HOME */}
      <button
        onClick={() => go("hero")}
        style={{
          ...btnStyle,
          color: mutedColor,
          transition: "color 0.4s ease",
        }}
      >
        HOME
      </button>

      {/* BRIEF */}
      <button
        onClick={() => go("details")}
        style={{
          ...btnStyle,
          color: mutedColor,
          transition: "color 0.4s ease",
        }}
      >
        BRIEF
      </button>

      {/* ARCHIVE */}
      <button
        onClick={() => go("flashback")}
        style={{
          ...btnStyle,
          color: mutedColor,
          transition: "color 0.4s ease",
        }}
      >
        ARCHIVE
      </button>

      {/* ABOUT */}
      <button
        onClick={() => {
          if (location.pathname === "/about") return;
          window.location.href = "/about";
        }}
        style={{
          ...btnStyle,
          color: location.pathname === "/about" ? textColor : mutedColor,
          textShadow: location.pathname === "/about" 
            ? `0 0 10px ${useLightText ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}` 
            : "none",
          transition: "color 0.4s ease, text-shadow 0.4s ease",
        }}
      >
        ABOUT
      </button>

      {/* JOIN */}
      <button
        onClick={() =>
          window.open("/join", "_blank", "noopener,noreferrer")
        }
        style={{ 
          ...btnStyle, 
          fontWeight: 600, 
          color: textColor,
          transition: "color 0.4s ease",
        }}
      >
        JOIN
      </button>
    </nav>
  );
};

const btnStyle = {
  background: "transparent",
  border: "none",
  fontSize: "0.7rem",
  fontWeight: 500,
  letterSpacing: "1.5px",
  cursor: "pointer",
  padding: "0 6px",
};

export default Navbar;