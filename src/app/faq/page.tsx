import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = { title: "FAQ", description: "Answers about Termco platforms, plugins, updates, AI providers, privacy, and licensing." };

const questions = [
  ["Is Termco only a terminal?", "No. The terminal is the center, while files, editor and LSP feedback, search, Git, Preview, containers, SSH, AI, agents, and plugin-defined surfaces share the same project workspace."],
  ["Which platforms are supported?", "Termco publishes builds for macOS, Windows, and Linux. Windows users can also work with projects in WSL through the Windows experience."],
  ["Do I need a Termco account?", "No. You can install Termco and open a local project without creating a Termco account."],
  ["Does AI work automatically?", "No model provider is assumed. Configure and test a provider first; then chat, workflows, and related AI surfaces become available."],
  ["Can I use local or compatible models?", "Termco supports configurable providers, including OpenAI-compatible endpoints. Actual model behavior and availability depend on the endpoint you connect."],
  ["Why are plugins updated separately?", "A compatible plugin change does not need to replace the Electron application. Termco checks the signed plugin catalog and updates only the plugin versions that changed."],
  ["When is a full application update required?", "Use an application update when the Electron host, native dependencies, security boundary, or platform/plugin contracts change."],
  ["Can I change official plugins?", "Yes. The platform supports inspecting, disabling, restoring, forking, verifying, and replacing plugins within its compatibility and approval model."],
  ["Where are credentials stored?", "Configured secrets are stored locally through Electron safeStorage, which uses the operating system's protection mechanism."],
  ["Is Termco open source?", "Yes. The application is available on GitHub under the Apache-2.0 license."],
] as const;

export default function FaqPage() {
  return <><PageIntro kicker="Frequently asked" title="The short answers."><p>Termco is a desktop developer workspace with a separately updateable plugin layer. These are the boundaries people usually want to understand first.</p></PageIntro><section className="faq-list shell">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>{question}</span><i>+</i></summary><p>{answer}</p></details>)}</section><section className="faq-next shell"><h2>Go deeper into the workspace model.</h2><Link className="button button-primary" href="/docs">Read the documentation <ArrowIcon /></Link></section></>;
}
