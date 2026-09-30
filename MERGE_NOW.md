# IBB Road Leadership — Merge V10 into the EXISTING Google AI Studio project

You are operating inside an existing production-oriented React project. The existing project is the MASTER and must NOT be replaced.

## Mission
Merge the contents of `ibb-v10-overlay/` into the current project to produce one coherent platform whose primary authenticated landing experience is the **IBB Operations Room / غرفة عمليات إب**, while preserving all existing business logic, Firebase configuration, users, permissions, portals, and original data.

## Non-negotiable rules
1. Inspect the existing project BEFORE changing files.
2. Do NOT replace the host `App.tsx`, `main.tsx`, `index.css`, `data.ts`, `types.ts`, `permissions.ts`, `package.json`, Vite config, Firebase config, or metadata.
3. For every collision, compare the host and overlay implementations and merge the useful behavior instead of blindly overwriting.
4. Preserve the existing Firebase/Auth/Firestore/RBAC behavior. Never weaken security rules.
5. Preserve existing portals and their routes. They must remain reachable through the new adaptive navigation.
6. Merge missing dependencies only; never downgrade working dependencies.
7. Integrate `OperationsRoom.tsx` as the default post-login command center.
8. Integrate `AdaptiveNavigation.tsx` and `GlobalSearch.tsx` as the primary navigation/search layer.
9. Preserve and expose Data Trust, decision trace/source, governance, and role-aware access.
10. Preserve the official road network and survey-track GIS layers.
11. Do not fabricate route geometry or data.

## UI target
The home screen should feel like a professional operations room: the map is central, executive alerts and decisions are immediately visible, and specialized portals are secondary tools rather than competing home dashboards.

## Required integration sequence
- Read `MERGE_MANIFEST.json` and `V10_DEPENDENCY_MANIFEST.json`.
- Inspect the host `App.tsx`, routing/navigation, auth provider, package.json and Firebase setup.
- Copy/merge overlay modules under `src/` where compatible.
- Resolve import collisions carefully.
- Wire OperationsRoom into the authenticated home route.
- Wire AdaptiveNavigation and GlobalSearch without removing existing portal access.
- Merge any required CSS/tokens into the host stylesheet without replacing it.
- Merge dependencies.
- Run the project's normal typecheck/build.
- Fix only integration/build/runtime errors caused by the merge.
- Verify security and RBAC tests if available.
- Verify the map and route datasets load.
- Verify the original platform's existing pages still work.

## Final acceptance
Do not report success until the project builds, the authenticated home opens as Operations Room, the map renders, route layers render, existing portals remain accessible, and unauthorized users are still denied protected actions.
