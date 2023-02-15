import React from 'react';

const context = React.createContext<string | null | false>(null);
const {Provider} = context;

export function ProtectedEmailProvider({siteKey, endpoint, children}) {
  const [email, setEmail] = React.useState<string | null | false>(null);

  React.useEffect(() => {
    window.protectedEmailCallback = async (token: string) => {
      const res = await fetch(`${endpoint}?token=${token}`);
      const body = await res.json();
      console.log(body);
      if (body.success) {
        setEmail(body.email);
      } else {
        setEmail(false);
      }
      delete window.protectedEmailCallback;
    };

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
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
