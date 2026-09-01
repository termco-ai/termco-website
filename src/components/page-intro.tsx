import type { ReactNode } from "react";

export function PageIntro({ kicker, title, children }: { kicker: string; title: string; children: ReactNode }) {
  return (
    <section className="page-intro shell">
      <p className="kicker"><span />{kicker}</p>
      <h1>{title}</h1>
      <div className="page-intro-copy">{children}</div>
    </section>
  );
}
