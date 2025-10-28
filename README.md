# devTinder — UI

Frontend for the devTinder application. This is a small React app built with Vite, Tailwind + DaisyUI, and Redux Toolkit. The frontend talks to a separate backend API (typically at http://localhost:7000 in development).

This README covers local setup, development notes (including a Vite proxy to avoid CORS in development), and common troubleshooting steps.

## Features
- React (functional components + hooks)
- Redux Toolkit for state
- Tailwind CSS + DaisyUI for styling
- Vite dev server with a proxy for local API requests

## Prerequisites
- Node.js 16+ (or the version you use for the project)
- npm (or yarn / pnpm)

## Quick start (development)

1. Install dependencies

```powershell
cd C:\Users\HP\Desktop\DevTinder-web
npm install
```

2. Start the dev server

```powershell
npm run dev
```

Open the app at the URL printed by Vite (for example: http://localhost:5174).

## Build & preview

Build for production:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

## Dev-time proxy & CORS

To avoid CORS issues during development the project uses a Vite proxy (see `vite.config.js`). The proxy forwards requests from `/api/*` to your backend (by default `http://localhost:7000`).

- `src/utilis/constants.js` currently sets `BASE_URL = '/api'` so requests like `/api/profile/edit` are proxied to the backend.
- If you prefer calling the backend directly (no proxy), set `BASE_URL` to `http://localhost:7000` and ensure the backend CORS is configured to allow `http://localhost:5174` and the methods used (PATCH, PUT, POST, OPTIONS, etc.).

Example Express CORS config:

```js
app.use(cors({
	origin: 'http://localhost:5174',
	methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
	credentials: true,
}));
```

## Common issues & troubleshooting

1) Blank page / "Cannot read properties of null (reading 'firstName')"

- Cause: `EditProfile` was trying to read `user.firstName` before `user` existed (null/undefined).
- Fix: the component now falls back to the Redux `user` slice when a `user` prop is not provided and uses safe defaults and `useEffect` to sync state.

2) CORS preflight fails (Method PATCH is not allowed)

- Symptom: browser console shows preflight/OPTIONS blocked for PATCH.
- Dev workaround: use the Vite proxy (configured in `vite.config.js`) and set `BASE_URL = '/api'` in `src/utilis/constants.js`.
- Production: update backend CORS to include PATCH in `Access-Control-Allow-Methods`.

3) 400 Bad Request when saving profile

- A 400 means the backend validated and rejected the payload. Inspect the failed request's Response body in DevTools → Network to see the server message.
- The frontend sanitizes the payload (casts `age` to a number only when valid). If you still get a 400, please paste the backend route handler (`Routes/profile.js`) and I can align the frontend payload shape with the server's expectations.

4) Cookies / credentials

- For endpoints that use cookies/sessions we set `withCredentials: true` in Axios. If backend uses credentials, it must also set `Access-Control-Allow-Credentials: true` and allow the specific origin.

## Project structure (high level)

```
/src
	/assets
	/components
		EditProfile.jsx
		UserCard.jsx
		...
	/utilis
		appStore.js
		constants.js   <-- BASE_URL is defined here
		userSlice.js
		connectionSlice.js
	main.jsx
	index.css
	app.css
vite.config.js
package.json
tailwind.config.mjs
postcss.config.js
```

## Useful commands

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Preview build: `npm run preview`

## Next steps I can help with
- Inspect `Routes/profile.js` and remove the 400 by matching the exact expected payload.
- Add a visible inline error box to the Edit Profile form so server validation messages are visible in the UI.
- Add a developer note to README showing how to switch between proxy and direct backend calls.

## Contributing

- Small, focused PRs are welcome. Keep styling consistent with Tailwind utility classes.

## License

Add a license of your choice (e.g. MIT) if you plan to publish this repository.

---

If you want, I can commit this README for you and/or add a small Developer Quick Start section that documents the exact proxy/base_url change we applied during debugging.
