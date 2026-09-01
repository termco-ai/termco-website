"use client";

import { useEffect, useState } from "react";

const command = "termco .";

const bootLines = [
  { tone: "muted", key: "◆ opening workspace ~/code/orbit-api", value: "" },
  { tone: "signal", key: "✓ terminal · files · editor", value: "attached" },
  { tone: "signal", key: "✓ git", value: "on main, clean" },
  { tone: "signal", key: "✓ agents", value: "provider ready (your keys)" },
  { tone: "signal", key: "✓ preview", value: "localhost:3000" },
  { tone: "ink", key: "workspace ready — nothing left to re-explain.", value: "" },
] as const;

function Prompt() {
  return <><span className="v3-arrow">➜</span> <span className="v3-dir">orbit-api</span> </>;
}

export function HomeTerminal() {
  const [typed, setTyped] = useState("");
  const [visibleLines, setVisibleLines] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const complete = window.setTimeout(() => { setTyped(command); setVisibleLines(bootLines.length); setReady(true); }, 0);
      return () => window.clearTimeout(complete);
    }
    const timers: number[] = [];
    command.split("").forEach((_, index) => timers.push(window.setTimeout(() => setTyped(command.slice(0, index + 1)), 700 + index * 130)));
    const bootStart = 700 + command.length * 130 + 500;
    bootLines.forEach((_, index) => timers.push(window.setTimeout(() => setVisibleLines(index + 1), bootStart + (index === 0 ? 0 : 550 + (index - 1) * 300))));
    timers.push(window.setTimeout(() => setReady(true), bootStart + 550 + (bootLines.length - 1) * 300 + 300));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  const typing = !ready && visibleLines === 0;

  return (
    <div className="v3-terminal" role="img" aria-label="Termco opens the Orbit API directory and attaches its terminal, files, editor, Git, AI provider, and local preview.">
      <div aria-hidden="true">
        <div className="v3-terminal-bar"><span className="v3-traffic"><i /><i /><i /></span><span>zsh — ~/code/orbit-api</span><span /></div>
        <div className="v3-terminal-body">
          <p><Prompt /><span className="v3-cmd">{typed}</span>{typing ? <i className="v3-cursor" /> : null}</p>
          {bootLines.slice(0, visibleLines).map(({ tone, key, value }) => <p key={key} className={`v3-boot v3-boot-${tone}`}>{value ? <><span>{key}</span><span>{value}</span></> : key}</p>)}
          {ready ? <p><Prompt /><i className="v3-cursor" /></p> : null}
        </div>
      </div>
    </div>
  );
}
