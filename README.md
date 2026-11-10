# Hash Online Store

A modern full-stack e-commerce platform for Hash Online Store built with React 19, Vite, Tailwind CSS, and react-router.

## Environment Variables & Admin Protection

The frontend uses environment variables defined in `.env` (see `.env.example`):

- `VITE_ENABLE_ADMIN_DEMO`: Controls access to the browser-local admin preview (`/admin`). Set to `"true"` to enable the "Continue to admin preview" button on demo/staging environments. When unset or `"false"` (e.g. in public production deploys), the admin preview displays "Admin is not available" with a safe return link to the storefront.
