import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

export default function NotFound() {
  return <section className="not-found shell"><code>404 / route not found</code><h1>This surface does not exist.</h1><p>Return to the Termco workspace overview or open the documentation.</p><div className="hero-actions"><Link className="button button-primary" href="/">Back home <ArrowIcon /></Link><Link className="button button-secondary" href="/docs">Documentation</Link></div></section>;
}
