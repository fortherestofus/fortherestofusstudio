import type { Metadata } from "next";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_EMAIL } from "@/lib/contact";

export const metadata: Metadata = {
  title: { absolute: "CaughtSlipping · Privacy Policy" },
  description:
    "How CaughtSlipping handles your data. Short version: your browsing stays on your device. No accounts, no servers, no tracking.",
};

const LAST_UPDATED = "2 July 2026";
const CONTACT = LEGAL_EMAIL;

export default function CaughtSlippingPrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      backHref="/apps/caught-slipping/"
      backLabel="Back to CaughtSlipping"
      intro={[
        "CaughtSlipping is built to respect your privacy by default. It tracks your time on websites entirely on your own device. Your browsing history and activity are never sent to us, never stored on a server, and never sold to anyone.",
        "This policy explains exactly what the extension stores, the one external service it talks to, and why it needs the permissions it asks for.",
      ]}
      sections={[
        {
          heading: "Who we are",
          body: [
            <>
              CaughtSlipping is a Chrome extension published by For The Rest Of
              Us, operated by Alroy Ndhlovu (&ldquo;we&rdquo;, &ldquo;us&rdquo;).
              For any privacy question, contact us at{" "}
              <a className="text-accent-deep underline" href={`mailto:${CONTACT}`}>
                {CONTACT}
              </a>
              .
            </>,
          ],
        },
        {
          heading: "What the extension stores (on your device)",
          body: [
            "All of the following is saved locally in your browser using Chrome's storage. It stays on your device and is readable only by the extension:",
          ],
          bullets: [
            "Time spent on the sites it tracks (YouTube, Facebook, X/Twitter, LinkedIn, Reddit, and any custom sites you add).",
            "Daily and weekly totals, your productivity percentage, focus streaks, and short session records used to calculate them.",
            "Per-website time, but only if you switch on Work Mode. This is off by default and collects nothing until you enable it.",
            "Your settings: which sites are tracked, time limits, site classifications, and feature toggles.",
          ],
        },
        {
          heading: "What we never do",
          bullets: [
            "No accounts. There is no sign-up, login, email, or password.",
            "No analytics, telemetry, advertising, or tracking pixels.",
            "No servers of ours ever receive your browsing data. It physically does not leave your device.",
            "We never sell, rent, or share your data, because we never have it.",
          ],
        },
        {
          heading: "Browser sync",
          body: [
            "Your settings (not your browsing data) may sync between your own Chrome browsers through Chrome's built-in sync, if you have that enabled. That syncing happens through your own Google account and is governed by Google's terms. We never receive or have access to it.",
          ],
        },
        {
          heading: "The one external request",
          body: [
            "CaughtSlipping is local-first. Only one feature makes an outside request:",
          ],
          bullets: [
            <>
              <strong className="text-ink">Site icons.</strong> For sites you
              add yourself, the extension fetches a favicon from Google&rsquo;s
              public icon service, which receives only the domain name (for
              example &ldquo;netflix.com&rdquo;). No personal data is sent.
            </>,
          ],
        },
        {
          heading: "Why the extension needs each permission",
          bullets: [
            <>
              <strong className="text-ink">Tabs &amp; host access</strong>: to
              see which site is in your active tab so it can measure time on it.
              By default this covers only the built-in platforms (YouTube,
              Facebook, X/Twitter, LinkedIn, Reddit). Access to any other site is
              requested only if you add that site yourself, and Chrome asks your
              permission at that moment.
            </>,
            <>
              <strong className="text-ink">Idle detection</strong>: to pause
              tracking when you step away, so only real attention counts.
            </>,
            <>
              <strong className="text-ink">Storage</strong>: to save your stats
              and settings on your device.
            </>,
            <>
              <strong className="text-ink">Alarms</strong>: to periodically save
              your latest totals and reset the day&rsquo;s counters at midnight.
            </>,
            <>
              <strong className="text-ink">declarativeNetRequest</strong>: to
              block a site once you hit a limit you set.
            </>,
            <>
              <strong className="text-ink">Scripting</strong>: to show the
              on-site pause screen when you reach a limit you set.
            </>,
            <>
              <strong className="text-ink">Offscreen</strong>: reserved for an
              optional spoken line on your most extreme days. No audio ships by
              default, and this collects no data.
            </>,
            <>
              <strong className="text-ink">Clipboard</strong>: only used when you
              tap &ldquo;Copy&rdquo; on a share card, to place that image on your
              clipboard.
            </>,
          ],
        },
        {
          heading: "Keeping or deleting your data",
          body: [
            "Your data lives on your device until you remove it. You can wipe everything any time from Settings → Reset all data, or by uninstalling the extension. Because nothing is stored on our side, there is nothing for us to delete on your behalf.",
          ],
        },
        {
          heading: "Children",
          body: [
            "CaughtSlipping is not directed at children and is not intended for anyone under the age required to form a binding agreement in their country.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Because your activity data never leaves your device, you are already in full control of it. To ask a privacy question, contact us and we will help. Depending on where you live, you may have rights under laws such as POPIA or the GDPR; we are happy to honour them.",
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "If we change how the extension handles data, we will update this page and the date above. Significant changes will be reflected in the extension or its store listing.",
          ],
        },
        {
          heading: "Contact",
          body: [
            <>
              Questions about your privacy? Email{" "}
              <a className="text-accent-deep underline" href={`mailto:${CONTACT}`}>
                {CONTACT}
              </a>
              .
            </>,
          ],
        },
      ]}
    />
  );
}
