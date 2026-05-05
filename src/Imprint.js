import React from 'react';
import { Link } from 'react-router-dom';

export default function Imprint() {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
        <p className="text-sm font-mono uppercase tracking-widest text-foreground-muted mt-6 mb-4">LEGAL</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-10 font-heading text-foreground">Imprint</h1>

        <div className="bg-slate-50 border border-border/50 p-6 md:p-8 rounded-sm space-y-6">

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Information pursuant to § 5 TMG</h3>
            <p className="text-foreground-muted leading-relaxed">
              <strong>Averium Dynamics UG (haftungsbeschränkt)</strong>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Address</h3>
            <p className="text-foreground-muted leading-relaxed">
              Kastanienallee 51<br />
              12627 Berlin<br />
              Germany
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Commercial Register</h3>
            <p className="text-foreground-muted leading-relaxed">
              Registered at: Amtsgericht Charlottenburg (Berlin)<br />
              Registration number: HRB 285037 B
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Represented by</h3>
            <p className="text-foreground-muted leading-relaxed">
              Leo Safia (Geschäftsführer / Managing Director)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Contact</h3>
            <p className="text-foreground-muted leading-relaxed">
              Phone: +49 159 06490410<br />
              Email:{' '}
              <a className="text-primary hover:underline" href="mailto:info@averiumdynamics.com">
                info@averiumdynamics.com
              </a>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">VAT identification</h3>
            <p className="text-foreground-muted leading-relaxed">
              VAT identification number pursuant to § 27 a UStG: pending issuance by the German tax authorities. Will be published here upon receipt.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Responsible for content pursuant to § 18 Abs. 2 MStV</h3>
            <p className="text-foreground-muted leading-relaxed">
              Leo Safia<br />
              Address as above
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disclaimer</h3>
            <p className="text-foreground-muted leading-relaxed">
              Despite careful content control, we assume no liability for the content of external links. The operators of the linked pages are solely responsible for their content.
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
