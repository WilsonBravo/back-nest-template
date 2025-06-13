# Nombre del Proyecto

## Descripción

### Requerimientos

- [NodeJS](https://nodejs.org/en) (23.11.x);
- [pnpm](https://pnpm.io/es/) (10.12.x);

### Tecnologías

1. [Typescript](https://www.typescriptlang.org/)
2. [NestJS](https://docs.nestjs.com/first-steps)
3. [Fastify](https://fastify.dev/)
4. [Prisma](https://www.prisma.io/?utm_source=cli&utm_medium=promo-init&utm_campaign=release-5-10)
5. [Swagger](https://docs.nestjs.com/openapi/introduction)

## Estructura de Carpetas

- public
- src
  - common - modulos compartidos y utilidades
    - components
    - enums
    - helpers
    - types
  - modules - modulos, controladores y servicios

## Instalación

```shell
npm install -g pnpm@latest-10
pnpm install --strict-peer-dependencies=false --reporter=silent
pnpm approve-builds
```

## Cómo ejecutar

Crear el archivo `.env` tomando como referencia el archivo `.env.example`

Para desarrollo:

```shell
# development
pnpm start

# watch mode
pnpm start:dev

```

Para producción:

```bash
pnpm start:prod
```

## Flujo de Desarrollo

### Flujo de Pull Request

```
<tipo>: <nombre-de-tiquet>
```

For the full list of types check [Conventional Commits](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)

Examples:

- `feat: add dashboard screen tm-123`

### Flujo de Ramas

```
<tipo>/<desc-corta>
```

Examples:

- `feat/add-dashboard`
- `feat/add-user-flow`
- `fix/user-flow`

### Flujo de Commits

Este proyecto usa [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0) para manejar los mensajes

```
<tipo>(alcance opcional): mensaje en minúscula
```

Ejemplos:

- `feat: add login endpoint`
- `fix(auth): handle missing token`
- `docs(readme): update installation instructions`
- `refactor(ui): simplify button component`
- `perf(api): optimize query execution time`
- `style: fix spacing in card layout`
- `test(forms): add unit tests for validation`
- `build: configure webpack cache strategy`
- `ci(github): add deploy workflow to vercel`
- `chore: update dependencies`
- `revert: fix(auth): handle missing token`
