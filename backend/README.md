# BOMAG Chat Backend

Backend service for the BOMAG Compare Hub chat functionality with OpenAI integration.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp env.example .env
   ```
   Then edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3001
   ```

3. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `POST /api/chat` - Chat with the AI assistant
- `GET /api/health` - Health check

## Usage

The backend will be available at `http://localhost:3001` and the frontend can communicate with it via the `/api/chat` endpoint.

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)
