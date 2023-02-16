'use client';

import * as React from 'react';

import {ProtectedEmail} from '@/components/ProtectedEmail';
import {Button, Link} from '@/components/text';

export const EmailButton = React.memo(function EmailButton() {
  return (
    <ProtectedEmail>
      {React.useMemo(
        // eslint-disable-next-line react/display-name
        () => (email) =>
          (
            <Button disabled={!email} href={email ? `mailto:${email}` : undefined}>
              Get in Touch
            </Button>
          ),
        []
      )}
    </ProtectedEmail>
  );
});

export const EmailLink = React.memo(function EmailLink() {
  return (
    <ProtectedEmail>
      {React.useMemo(
        // eslint-disable-next-line react/display-name
        () => (email) =>
          (
            <Link href={email ? `mailto:${email}` : undefined} disabled={!email}>
              Email
            </Link>
          ),
        []
      )}
    </ProtectedEmail>
  );
});
