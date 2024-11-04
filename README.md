# Cover Letter Generator

A Next.js application that helps you generate personalized cover letters using AI. Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🤖 AI-powered cover letter generation using OpenAI's GPT-4
- 📝 Multi-step wizard interface for easy cover letter creation
- 🎯 Smart keyword extraction from job descriptions
- 💾 Local storage persistence for managing multiple cover letters
- 🎨 Clean, modern UI with dark mode support
- 📱 Responsive design with mobile-friendly sidebar

## Getting Started

1. Clone the repository
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

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5. Paste your OpenAI API key into the field in the sidebar.

## How It Works

1. **Job Description**: Paste the job description you're applying for
2. **Company Info**: Add information about the company from their website or careers page
3. **Keywords**: AI extracts relevant keywords from the job description and company info
4. **Review**: Generate and edit your cover letter, then export to PDF

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [OpenAI API](https://openai.com/) - AI-powered content generation
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - Reusable React components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and type definitions
- `/src/types` - TypeScript type definitions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
