# KV-Blog

KV-Blog is a modern full-stack blogging platform built with Next.js and PostgreSQL.  
It supports authentication, rich content editing, image uploads, and scalable deployment.

---

## Requirements

- Node.js ≥ 18.x
- pnpm ≥ 8.x
- PostgreSQL ≥ 14.x

---

## Tech Stack

| Layer            | Technology          |
| ---------------- | ------------------- |
| Framework        | Next.js             |
| Database         | PostgreSQL + Prisma |
| Authentication   | Better Auth         |
| UI Library       | Chakra UI           |
| Rich Text Editor | TipTap              |
| State Management | Zustand             |
| File Storage     | Cloudinary          |
| Email Service    | Resend              |
| Deployment       | Vercel              |

---

## Quick Start

Install dependencies:

```bash
pnpm install
```

Copy environment variables:

```bash
cp .env.example .env
```

Run development server:

```bash
pnpm dev
```

Application will be available at:

```
http://localhost:3000
```

---

## Deployment

Production build:

```bash
pnpm build
pnpm start
```

Deploy easily using Vercel.  
Ensure all required environment variables are configured in the production environment.

---

## Documentation

Official documentation for technologies used in this project:

- Node.js — https://nodejs.org/docs/
- pnpm — https://pnpm.io/
- PostgreSQL — https://www.postgresql.org/docs/
- Next.js — https://nextjs.org/docs
- Prisma — https://www.prisma.io/docs
- Better Auth — https://www.better-auth.com/docs
- Chakra UI — https://chakra-ui.com/docs
- TipTap — https://tiptap.dev/docs
- Zustand — https://docs.pmnd.rs/zustand
- Cloudinary — https://cloudinary.com/documentation
- Resend — https://resend.com/docs
- Vercel — https://vercel.com/docs

---

## License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for complete license information.
