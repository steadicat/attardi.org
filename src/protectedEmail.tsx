import React from 'react';

const context = React.createContext<string | null | false>(null);
const {Provider} = context;

let loaded = false;

function loadTurnstileJS() {
  if (loaded) return;
  const script = document.createElement('script');
  script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
  loaded = true;
}

export function ProtectedEmailProvider({
  siteKey,
  endpoint,
  timeout = 3000,
  children,
}: {
  siteKey: string;
  endpoint: string;
  timeout: number;
  children: JSX.Element;
}) {
  const [email, setEmail] = React.useState<string | null | false>(null);

  React.useEffect(() => {
    let done = false;

    window.protectedEmailCallback = async (token: string) => {
      const res = await fetch(`${endpoint}?token=${token}`);
      const body = await res.json();
      done = true;
      if (body.success) {
        setEmail(body.email);
      } else {
        setEmail(false);
      }
      delete window.protectedEmailCallback;
    };

    loadTurnstileJS();

    const timer = setTimeout(() => {
      if (!done) {
        done = true;
        setEmail(false);
        delete window.protectedEmailCallback;
      }
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Provider value={email}>
      <div className="cf-turnstile" data-sitekey={siteKey} data-callback="protectedEmailCallback" />
      {children}
    </Provider>
  );
}

export function ProtectedEmail({
  children,
}: {
  children: (email: string | null | false) => JSX.Element | null;
}) {
  const email = React.useContext(context);
  return children(email);
}
