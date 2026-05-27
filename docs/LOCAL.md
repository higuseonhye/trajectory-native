# Local development — Drift & Return

## Repositories

| Human name | GitHub | Local folder (target) | Port |
|------------|--------|----------------------|------|
| **Return** | [higuseonhye/return](https://github.com/higuseonhye/return) | `return/` | 3000 |
| **Drift** | [higuseonhye/drift](https://github.com/higuseonhye/drift) | `drift/` | 3001 |
| **Continuity** | [higuseonhye/continuity](https://github.com/higuseonhye/continuity) | `continuity/` | 3002 |

Legacy GitHub slugs redirect. If your local folders still use old names (`trajectory-native`, etc.), rename when no dev server or IDE has them open:

```powershell
Rename-Item C:\Users\Lenovo\trajectory-native return
Rename-Item C:\Users\Lenovo\trajectory-drift drift
Rename-Item C:\Users\Lenovo\org-reasoning-mvp continuity
```

---

## Full stack

```bash
# Return — personal rhythm (:3000)
cd return   # or trajectory-native
npm install && npm run dev

# Continuity — decision memory (:3002)
cd continuity   # or org-reasoning-mvp
npm install && npm run dev

# Drift — collective rhythm (:3001)
cd drift   # or trajectory-drift
npm install && npm run dev
```

Return → Continuity: `ORG_REASONING_URL=http://localhost:3002` (default in API route).

Return → Drift: export JSON from **Shared rhythm**, import in Drift dashboard.

---

## Screenshots

```bash
cd return && node scripts/capture-readme-screenshots.mjs
cd drift && node scripts/capture-readme-screenshots.mjs
```

---

## localStorage

Browser keys still use `trajectory-native:*` prefix for session continuity.
