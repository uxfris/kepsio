# Kepsio

A modern Next.js application for generating and managing social media captions with an intuitive, component-driven interface.

## 🚀 Features

- **Caption Generation**: Streamlined interface for creating social media captions
- **Product Link Integration**: Add product links to your content
- **Image Upload**: Support for uploading and managing images
- **Advanced Options**: Customizable generation settings including:
  - Platform selection
  - Tone and style controls
  - Content length preferences
- **Modern UI**: Built with Radix UI components for accessibility and polish
- **Type-Safe**: Full TypeScript support with centralized type definitions
- **State Management**: Efficient state handling with Zustand
- **Custom Icon System**: Reusable TSX icon components

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: 
  - `clsx` & `tailwind-merge` for className management
  - `class-variance-authority` for component variants

## 📁 Project Structure

```
kepsio/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard layout group
│   │   ├── generate/      # Caption generation page
│   │   └── layout.tsx     # Dashboard layout with navbar
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── generate/          # Generation-specific components
│   ├── icons/             # Custom TSX icon components
│   ├── shared/            # Shared components (navbar, etc.)
│   └── ui/                # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and constants
├── store/                 # Zustand state stores
└── types/                 # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kepsio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Architecture Highlights

### Component Organization
- **Separation of Concerns**: UI components are separated from business logic
- **Custom Hooks**: Reusable hooks for state management (e.g., `useDropdownMenuState`)
- **Type Safety**: Centralized type definitions in `/types` directory

### State Management
- **Zustand Stores**: Lightweight state management for dropdown menus and UI state
- **Type-Safe Actions**: All store actions are fully typed with TypeScript

### Icon System
- **TSX Components**: SVG icons converted to reusable React components
- **Consistent API**: All icons accept `className` prop for styling
- **Tree-Shakeable**: Import only the icons you need

## 🎨 Styling

The project uses Tailwind CSS 4 with:
- Custom design tokens in `globals.css`
- Component-scoped styles
- Responsive design utilities
- Dark mode support (via CSS variables)

## 📦 Building for Production

```bash
npm run build
npm start
```

The optimized production build will be created in the `.next` directory.

## 🚀 Deployment

### Deploy on Vercel

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Deploy!

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

### Other Platforms

This application can also be deployed to:
- **Netlify**: Use the Next.js build plugin
- **AWS Amplify**: Configure with Next.js SSR support
- **Docker**: Create a containerized deployment

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction) - Explore accessible UI components
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Master utility-first CSS
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction) - Understand state management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

---

Built with ❤️ using Next.js
