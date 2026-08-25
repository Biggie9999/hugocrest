"use client";
import { useEffect } from "react";

export default function ScriptInjector() {
  useEffect(() => {
    const runScripts = () => {
      // Find all scripts inside our dangerouslySetInnerHTML wrappers that haven't been run
      const scripts = document.querySelectorAll('script:not([data-injected="true"])');
      scripts.forEach((script) => {
        // If it's a script that's already in the head or naturally executed, ignore
        if (script.parentNode.tagName.toLowerCase() === 'head') return;
        
        script.setAttribute("data-injected", "true");
        
        const newScript = document.createElement("script");
        Array.from(script.attributes).forEach(attr => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (script.innerHTML) {
          newScript.innerHTML = script.innerHTML;
        }
        document.body.appendChild(newScript);
      });
    };

    // Run once after initial render
    setTimeout(runScripts, 100);
  }, []);

  return null;
}
