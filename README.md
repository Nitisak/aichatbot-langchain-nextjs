

## Project Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd aichatbot-langchain-nextjs
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example environment file and add your OpenAI API key:

```bash
cp env.example .env.local
```

Edit `.env.local` and set your OpenAI API key:

```
OPENAI_API_KEY=your-openai-api-key-here
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

**Scripts:**

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint checks

---

**Requirements:**

- Node.js
