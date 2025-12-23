# Auto-Resume Architect

A sophisticated web application that automates the tailoring of LaTeX resumes based on Job Descriptions using LLMs (Google Gemini or Perplexity Sonar).

## features

- **Split-Screen Interface**: Paste your Master Resume and Job Description side-by-side.
- **AI-Powered Customization**: Uses LLMs to tailor bullet points to keywords in the JD.
- **Privacy First**: API keys are stored in your browser's LocalStorage and never sent to a backend server.
- **Model Selection**: Choose between Google Gemini Pro (Free tier available) and Perplexity Sonar (Optimized for search/citations, but great for reasoning).

## Setup & Local Development

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd auto-resume-architect
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## Deployment

### Netlify (Recommended)

This project is configured for easy deployment on Netlify.

1. Fork this repository to your GitHub.
2. Log in to [Netlify](https://www.netlify.com/).
3. Click **"Add new site"** > **"Import an existing project"**.
4. Select your repository.
5. Netlify will detect the `netlify.toml` automatically. Click **"Deploy"**.

### API Keys

To use the application, you need API keys:

- **Google Gemini**: [Get Key from Google AI Studio](https://aistudio.google.com/)
- **Perplexity**: [Get Key from Perplexity Settings](https://www.perplexity.ai/settings/api)

Enter these keys in the generic "Settings" menu (gear icon) on the top right.

## Tech Stack

- React + Vite
- Tailwind CSS
- Lucide React
- Google Generative AI SDK
