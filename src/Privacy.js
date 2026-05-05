import React from 'react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
        <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mt-6 mb-4">LEGAL</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-10 font-heading text-foreground">Privacy Policy</h1>

        <div className="bg-slate-50 border border-border/50 p-6 md:p-8 rounded-sm space-y-8 text-foreground-muted leading-relaxed">

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">1. Controller</h3>
            <p>
              Averium Dynamics UG (haftungsbeschränkt)<br />
              Kastanienallee 51, 12627 Berlin, Germany<br />
              HRB 285037 B, Amtsgericht Charlottenburg<br />
              Email:{' '}
              <a className="text-primary hover:underline" href="mailto:info@averiumdynamics.com">
                info@averiumdynamics.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Data we process</h3>
            <p>
              When you contact us via the contact form or by email, we process the information you provide
              (name, email address, organization, and the content of your message) for the sole purpose of
              responding to your inquiry.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Purpose &amp; legal basis</h3>
            <p>
              We process your data to communicate with you and handle your request, on the basis of
              Art. 6(1)(b) GDPR (steps prior to entering into a contract) and/or Art. 6(1)(f) GDPR
              (legitimate interest in responding to inquiries).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Form processing</h3>
            <p>
              Contact form submissions are processed via Formspree (Formspree, Inc., USA). Submissions are
              transmitted to Formspree, which forwards the message to our company email. Formspree processes
              submissions on the basis of standard contractual clauses for international data transfer.
              See Formspree&apos;s privacy notice at{' '}
              <a className="text-primary hover:underline" href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noreferrer">
                formspree.io/legal/privacy-policy
              </a>.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Hosting</h3>
            <p>
              This website is hosted on infrastructure provided by Vercel Inc. (USA). Server logs
              (IP address, request metadata, user-agent, timestamp) are processed for security and
              operational purposes on the basis of Art. 6(1)(f) GDPR.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">6. Cookies &amp; analytics</h3>
            <p>
              This website does not use tracking cookies or third-party analytics tools.
              If we add analytics in the future, we will update this policy and request consent where required.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">7. Data retention</h3>
            <p>
              We retain inquiry data only as long as necessary to respond to and follow up on your request,
              unless longer retention is required by law (e.g. tax or commercial obligations).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">8. Your rights</h3>
            <p>
              You have the right to access, rectify, erase, restrict the processing of, object to the processing of,
              and to data portability of your personal data (where applicable). You also have the right to lodge a
              complaint with a data protection supervisory authority — for Berlin, the Berliner Beauftragte für
              Datenschutz und Informationsfreiheit.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">9. Security</h3>
            <p>
              We apply appropriate technical and organisational measures to protect your data, including
              TLS-encrypted transmission. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="text-sm text-foreground-muted pt-2 border-t border-border/40">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </div>

        </div>
      </div>
    </div>
  );
}
