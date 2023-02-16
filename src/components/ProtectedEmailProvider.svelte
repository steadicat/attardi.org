<script lang="ts">
  import {onMount} from 'svelte';
  import {email} from './email';

  export let siteKey: string;
  export let endpoint: string;

  onMount(() => {
    if (process.env.NODE_ENV !== 'production') {
      setTimeout(() => {
        email.set('test@example.com');

        document.querySelectorAll('.email').forEach((el) => {
          el.innerHTML = 'test@example.com';
          el.setAttribute('href', `mailto:${'test@example.com'}`);
          el.classList.remove('email');
        });
      }, 2000);
    }

    window.protectedEmailCallback = async (token: string) => {
      if (process.env.NODE_ENV !== 'production') return;

      try {
        const res = await fetch(`${endpoint}?token=${token}`);
        const body = await res.json();
        if (body.success) {
          email.set(body.email);

          document.querySelectorAll('.email').forEach((el) => {
            el.innerHTML = body.email;
            el.setAttribute('href', `mailto:${body.email}`);
            el.classList.remove('email');
          });
        } else {
          email.set(false);
        }
        delete window.protectedEmailCallback;
      } catch (err) {
        console.error(err);
        email.set(false);
      }
    };
  });
</script>

<svelte:head>
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<div class="cf-turnstile" data-sitekey={siteKey} data-callback="protectedEmailCallback" />
