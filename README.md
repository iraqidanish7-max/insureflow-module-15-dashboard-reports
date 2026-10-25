# Insurance Management UI — Modular Frontend Structure

This repository contains the existing UI reference plus starter Angular components organized by business module. It is a frontend scaffold only; API endpoints, validation, real data, authentication, and backend integration must be agreed and implemented by the team.

## Run the UI

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## Module ownership structure

All module folders are generic and contain no individual team-member names.

- `src/app/features/authorization/` — login, user management, role management
- `src/app/features/customer-management/` — customer list, form, details
- `src/app/features/kyc-underwriting/` — KYC review, underwriting review
- `src/app/features/product-management/` — product list, form, details
- `src/app/features/quote-generation/` — quote list, form, details
- `src/app/features/policy-lifecycle/` — policy list/details, renewal, closure, servicing
- `src/app/features/premium-payment/` — premium schedule, pay premium, payment history
- `src/app/features/claims-settlement/` — claim list/details, investigation, settlement
- `src/app/features/reports-dashboard/` — dashboard overview, reports

Each screen folder contains:
- `<screen>.ts` — standalone Angular component and UI behavior
- `<screen>.html` — starter markup
- `<screen>.css` — screen styles

Each business module also contains:
- `<module>.routes.ts` — route definitions for the module's screens (starter routes; not automatically connected to the main router)
- `services/<module>.service.ts` — service scaffold for API calls

## Important integration notes

- `src/app/app.ts`, `src/app/app.html`, `src/app/app.css`, `src/app/app.routes.ts`, and `src/app/features/workspace/` are the shared shell/current UI reference. Coordinate before changing them.
- Module routes are intentionally not connected automatically to the main router, so the existing reference UI is preserved. Integrate routes into `src/app/app.routes.ts` when the team agrees on the final navigation structure.
- Starter tables and forms are placeholders. Replace fields and actions with the correct BRD requirements; connect real API data only after agreeing on endpoint and DTO contracts.
- Keep components in their module folders; do not put all module screens into the shared workspace component.
- Do not commit `node_modules/`, `.angular/`, or secrets.


## Reports & Dashboard integration

The Module 15 dashboard and policy report now call the reporting microservice at `http://localhost:8015/api/v1`. Update `src/app/features/reports-dashboard/services/reports-dashboard.service.ts` before production deployment to point at the deployed API URL.

The dashboard uses `/dashboard/summary` and `/dashboard/charts`; the policy report uses `/reports/policies` and the existing `/reports/export/{csv|excel|pdf}?category=policies` endpoints. The service must allow the Angular dev-server origin through CORS.
