# Ali Dereyurt - Portfolio Website

A modern, minimalist portfolio website inspired by Apple's design principles, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Apple-inspired minimalist design
- Smooth animations and transitions
- Dark mode support
- Fully responsive
- Projects showcase
- Dedicated page for graduating project

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel / Docker

## Getting Started

### Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Free & Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Configure custom domain: `ali.dereyurt.dev`
5. Deploy!

Vercel will automatically:
- Build and deploy your site
- Provide SSL certificates
- Enable automatic deployments on git push
- Offer serverless functions support

### Option 2: Hostinger Server (Docker)

1. SSH into your Hostinger server:
```bash
ssh user@your-server-ip
```

2. Clone your repository:
```bash
git clone <your-repo-url>
cd dereyurt.dev
```

3. Build and run with Docker:
```bash
docker-compose up -d
```

4. Configure nginx reverse proxy for `ali.dereyurt.dev`:
```nginx
server {
    listen 80;
    server_name ali.dereyurt.dev;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

5. Enable SSL with Let's Encrypt:
```bash
sudo certbot --nginx -d ali.dereyurt.dev
```

## Project Structure

```
dereyurt.dev/
├── src/
│   └── app/
│       ├── layout.tsx       # Root layout
│       ├── page.tsx         # Homepage
│       ├── globals.css      # Global styles
│       └── parameter/       # Graduating project page
│           └── page.tsx
├── public/                  # Static assets
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose config
└── tailwind.config.ts      # Tailwind configuration
```

## Customization

### Update Projects

Edit the `projects` array in `src/app/page.tsx`:

```typescript
const projects: Project[] = [
  {
    title: "Your Project",
    description: "Project description",
    tech: ["React", "Node.js"],
    link: "/your-project",
  },
  // Add more projects
];
```

### Update Skills

Modify the skills section in `src/app/page.tsx` to reflect your expertise.

### Update Contact Information

Update the contact section in `src/app/page.tsx` with your:
- Email
- GitHub profile
- LinkedIn profile
- Other social links

### Customize Parameter Project

Edit `src/app/parameter/page.tsx` to add specific details about your graduating project.

## DNS Configuration

To point `ali.dereyurt.dev` to your hosting:

### For Vercel:
1. Add CNAME record: `ali` → `cname.vercel-dns.com`

### For Hostinger Server:
1. Add A record: `ali` → `your-server-ip`

## License

MIT

## Contact

Ali Dereyurt - [ali@dereyurt.dev](mailto:ali@dereyurt.dev)
