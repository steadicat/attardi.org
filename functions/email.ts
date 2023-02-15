interface Env {
  SECRET_KEY: string;
  EMAIL: string;
}

export const onRequestGet: PagesFunction<Env> = async ({request, env}) => {
  const token = new URL(request.url).searchParams.get('token');
  const ip = request.headers.get('CF-Connecting-IP');

  // Validate the token by calling the
  // "/siteverify" API endpoint.
  let formData = new FormData();
  formData.append('secret', env.SECRET_KEY!);
  formData.append('response', token ?? '');
  formData.append('remoteip', ip ?? '');

  console.log(formData);

  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  const result = await fetch(url, {
    body: formData,
    method: 'POST',
  });

  const outcome = await result.json<{success: boolean}>();
  console.log(outcome);

  if (outcome.success) {
    return new Response(JSON.stringify({success: true, email: env.EMAIL}), {
      headers: {'Content-Type': 'application/json'},
    });
  } else {
    return new Response(JSON.stringify({success: false, email: env.EMAIL}), {
      status: 401,
      headers: {'Content-Type': 'application/json'},
    });
  }
};
