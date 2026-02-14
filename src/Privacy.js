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
              Averium Dynamics UG (haftungsbeschränkt) i.G.<br />
              Kastanienallee 51, 12627 Berlin, Germany<br />
              Email:{' '}
              <a className="text-primary hover:underline" href="mailto:info@averiumdynamics.com">
                info@averiumdynamics.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">2. Data we process</h3>
            <p>
              When you contact us via the contact form or email, we process the information you provide (e.g., name, email address, organization, message)
              in order to respond to your inquiry.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">3. Purpose & legal basis</h3>
            <p>
              We process your data to communicate with you and handle your request (Art. 6(1)(b) GDPR — steps prior to entering into a contract,
              and/or Art. 6(1)(f) GDPR — legitimate interest in responding to inquiries).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">4. Hosting</h3>
            <p>
              This website may be hosted on infrastructure provided by Vercel. Server logs (e.g., IP address, request metadata) may be processed
              for security and operational purposes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">5. Cookies & analytics</h3>
            <p>
              We do not intentionally use tracking cookies or analytics tools on this website at this time.
              If we add analytics in the future, we will update this policy accordingly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">6. Data retention</h3>
            <p>
              We keep your inquiry data only as long as necessary to respond and for any follow-up communication,
              unless longer retention is required by law.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">7. Your rights</h3>
            <p>
              You have the right to access, rectify, erase, restrict processing, object to processing, and data portability (where applicable),
              as well as the right to lodge a complaint with a supervisory authority.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">8. Security</h3>
            <p>
              We apply appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div className="text-sm text-foreground-muted">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </div>
        </div>
      </div>
    </div>
  );
}
