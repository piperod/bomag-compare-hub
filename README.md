# BOMAG Compare Hub

A comprehensive construction equipment comparison platform with an AI-powered chat assistant. Built with React frontend and Express backend.

## 🏗️ Project Structure

```
bomag-compare-hub/
├── frontend/          # React + Vite application (GitHub Pages)
├── backend/           # Express.js API server (Railway/Render)
├── .github/           # GitHub Actions workflows
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/bomag-compare-hub.git
   cd bomag-compare-hub
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend environment
   cd backend
   cp env.example .env
   # Edit .env with your OpenAI API key
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```

This will start both:
- Frontend: http://localhost:8080/bomag-compare-hub/
- Backend: http://localhost:3001

## 📁 Frontend (React + Vite)

The frontend is a React application built with Vite, featuring:

- **Machine Comparison**: Compare BOMAG and competitor equipment
- **Performance Calculator**: Calculate equipment performance metrics
- **AI Assistant**: Chat with construction equipment expert
- **Multi-language Support**: English, Spanish, German, Portuguese
- **Responsive Design**: Works on all devices

### Frontend Commands
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run deploy       # Deploy to GitHub Pages
```

## 🔧 Backend (Express.js)

The backend provides a secure API for the AI chat functionality:

- **OpenAI Integration**: Powered by GPT-3.5-turbo
- **Authentication**: API key protection
- **Conversation Management**: Track chat history
- **Construction Expertise**: Specialized knowledge base

### Backend Commands
```bash
cd backend
npm run dev          # Start development server
npm start            # Start production server
```

## 🔐 Authentication

The backend is protected with API key authentication:

```bash
# Set in backend/.env
API_SECRET_KEY=your_secure_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

## 🚀 Deployment

### Frontend (GitHub Pages)

1. **Build the frontend**
   ```bash
   npm run build:frontend
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy:frontend
   ```

### Backend (Railway/Render/Heroku)

Choose your preferred platform:

#### Railway (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy
cd backend
railway login
railway init
railway up
```

#### Render
```bash
# Create render.yaml in backend/
services:
  - type: web
    name: bomag-chat-backend
    env: node
    buildCommand: npm install
    startCommand: node server.js
```

#### Heroku
```bash
# Deploy to Heroku
cd backend
heroku create bomag-chat-backend
git push heroku main
```

### Environment Variables for Production

Set these in your deployment platform:

```bash
OPENAI_API_KEY=your_openai_api_key_here
API_SECRET_KEY=your_secure_production_api_key_here
PORT=3001
```

## 🔄 Update Frontend API URL

After deploying the backend, update the frontend to use the production API URL:

```typescript
// In frontend/src/components/ChatView.tsx
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' 
  : 'http://localhost:3001';
```

## 📊 Features

### Machine Comparison
- Compare specifications across manufacturers
- Visual data presentation
- Performance metrics analysis

### AI Assistant
- Construction equipment expertise
- Multi-manufacturer knowledge
- Professional recommendations
- Safety and maintenance guidance

### Performance Calculator
- Equipment efficiency calculations
- Cost analysis tools
- Project planning assistance

## 🛠️ Development

### Available Scripts

```bash
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
npm run build            # Build frontend for production
npm run install:all      # Install all dependencies
```

### Adding New Features

1. **Frontend**: Add components in `frontend/src/components/`
2. **Backend**: Add routes in `backend/server.js`
3. **Data**: Update machine specifications in `frontend/src/data/machineData.ts`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

---

**Built with ❤️ for the construction industry**
