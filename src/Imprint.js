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
            <h3 className="text-lg font-semibold text-foreground mb-2">Company</h3>
            <p className="text-foreground-muted leading-relaxed">
              <strong>Averium Dynamics UG (haftungsbeschränkt) i.G.</strong><br />
              (in formation / pending registration)
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
            <h3 className="text-lg font-semibold text-foreground mb-2">Represented by</h3>
            <p className="text-foreground-muted leading-relaxed">
              Leo Safia (Managing Director / Geschäftsführer)
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Contact</h3>
            <p className="text-foreground-muted leading-relaxed">
              Email:{' '}
              <a className="text-primary hover:underline" href="mailto:info@averiumdynamics.com">
                info@averiumdynamics.com
              </a>
            </p>
          </div>

          <div className="text-sm text-foreground-muted">
            Note: The company is currently in formation (“i.G.”). Official commercial register details (HRB / register court) will be added after registration.
          </div>
        </div>
      </div>
    </div>
  );
}
