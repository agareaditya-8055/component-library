# Component Library Monorepo

## Folder structure

```text
.
├── package.json
├── pnpm-workspace.yaml
├── postcss.config.cjs
├── tailwind.config.ts
├── tailwind.preset.ts
├── tsconfig.base.json
├── tsconfig.json
└── packages
    ├── components
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    ├── hooks
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    ├── primitives
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    ├── tokens
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── src/index.ts
    └── utils
        ├── package.json
        ├── tsconfig.json
        └── src/index.ts
```

## Basic setup commands

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```
