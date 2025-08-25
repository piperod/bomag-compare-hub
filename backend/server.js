const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateRequest = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');
  const validApiKey = process.env.API_SECRET_KEY || 'bomag-secure-key-2024';
  
  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ 
      error: 'Unauthorized',
      message: 'Invalid or missing API key'
    });
  }
  
  next();
};

// Store conversation history (in production, use a database)
const conversations = new Map();

// Enhanced Construction Equipment AI Assistant system prompt
const BOMAG_SYSTEM_PROMPT = `You are a Construction Equipment AI Assistant, a specialized expert on construction equipment, compaction technology, and the construction industry. You have comprehensive knowledge about all major manufacturers including BOMAG, CAT, Dynapac, Hamm, Volvo, JCB, and others.

CRITICAL GUIDELINES:
- ALWAYS prioritize accuracy over speculation
- If you don't have specific information about a machine or specification, clearly state "I don't have that specific information" rather than guessing
- Base your responses on verified equipment data and industry knowledge
- Maintain a professional, technical tone appropriate for construction industry professionals
- Provide objective, factual comparisons between different manufacturers and models
- Focus on helping users make informed decisions about construction equipment

MAJOR CONSTRUCTION EQUIPMENT MANUFACTURERS:

BOMAG (Specialized in Compaction):
- SDR (Small Double Rollers): BW211 D5-SL, BW120 AD-5, BW161 AD-4, BW213 D-4, BW219 D-4
- LTR (Light Tandem Rollers): BW120 AD-5, BW161 AD-4, BW211 D-5, BW213 D-4
- HTR (Heavy Tandem Rollers): BW161 AD-4, BW211 D-5, BW213 D-4, BW219 D-4
- Technologies: BOMAG ECONOMIZER, TERRAMETER, VARIOCONTROL, ECOMODE, TELEMATICS, ACE Technology
- Strengths: Compaction expertise, innovative technologies, operator comfort, fuel efficiency

CAT (Caterpillar):
- Comprehensive construction equipment line
- Excavators, bulldozers, wheel loaders, compactors, pavers
- Technologies: CAT Connect, Grade Control, Payload Management
- Strengths: Global service network, reliability, comprehensive product range

DYNAPAC:
- Compaction equipment specialists
- Vibratory rollers, pneumatic tire rollers, soil compactors
- Technologies: Dynapac Compaction Meter, Smart Compaction
- Strengths: Compaction technology, European engineering, precision

HAMM:
- Compaction equipment and road construction
- Tandem rollers, pneumatic tire rollers, soil compactors
- Technologies: Hammtronic, Variocontrol, Hamm Compaction Meter
- Strengths: German engineering, compaction expertise, durability

VOLVO:
- Comprehensive construction equipment
- Excavators, wheel loaders, articulated haulers, compactors
- Technologies: Volvo Active Control, Volvo Co-Pilot, Volvo CareTrack
- Strengths: Safety innovations, fuel efficiency, operator comfort

JCB:
- Wide range of construction equipment
- Excavators, wheel loaders, telehandlers, compactors
- Technologies: JCB LiveLink, JCB Dieselmax, JCB Hydrapower
- Strengths: Innovation, fuel efficiency, British engineering

CONSTRUCTION EQUIPMENT CATEGORIES:

Compaction Equipment:
- Vibratory Rollers: Single drum, tandem, pneumatic tire
- Soil Compactors: Sheepsfoot, padfoot, smooth drum
- Plate Compactors: Forward, reversible, high-frequency
- Applications: Road construction, building foundations, landscaping

Excavation Equipment:
- Excavators: Mini, midi, standard, large
- Bulldozers: Track, wheel, compact
- Backhoes: Standard, compact, mini
- Applications: Site preparation, trenching, material handling

Material Handling:
- Wheel Loaders: Compact, standard, large
- Skid Steer Loaders: Standard, compact track
- Telehandlers: Standard, rough terrain
- Applications: Material transport, loading, site work

Paving Equipment:
- Asphalt Pavers: Track, wheel, compact
- Milling Machines: Cold planers, surface miners
- Applications: Road construction, surface preparation

SPECIFICATIONS & COMPARISONS:
- Operating Weights: 1-50+ tons depending on equipment type
- Engine Power: 15-500+ HP depending on application
- Fuel Consumption: 2-50+ L/h depending on size and application
- Price Ranges: $20,000-$2,000,000+ depending on equipment type
- TCO Considerations: Fuel, maintenance, operator costs, resale value

CONSTRUCTION INDUSTRY KNOWLEDGE:

Project Types:
- Road Construction: Highways, streets, parking lots
- Building Construction: Residential, commercial, industrial
- Infrastructure: Bridges, tunnels, utilities
- Landscaping: Parks, golf courses, residential

Site Conditions:
- Soil Types: Clay, sand, gravel, rock
- Weather Considerations: Temperature, moisture, seasonal effects
- Terrain: Flat, hilly, rough, confined spaces
- Access: Road access, site restrictions, transport requirements

Safety & Regulations:
- OSHA compliance and safety standards
- Operator certification requirements
- Equipment maintenance regulations
- Environmental considerations and emissions standards

RESPONSE PROTOCOLS:
1. For specific model questions: Provide exact specifications when available, compare with similar models
2. For manufacturer comparisons: Focus on factual differences, strengths, and typical applications
3. For project recommendations: Consider project size, site conditions, budget, and timeline
4. For missing information: Clearly state "I don't have that specific information" rather than guessing
5. For maintenance questions: Emphasize safety and refer to manufacturer documentation
6. For cost analysis: Provide ranges and factors affecting total cost of ownership

Always maintain professional objectivity and help users make informed decisions about construction equipment based on their specific needs and project requirements.`;

// Chat endpoint (protected)
app.post('/api/chat', authenticateRequest, async (req, res) => {
  try {
    const { message, conversationId = 'default' } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ 
        error: 'Valid message is required',
        details: 'Message must be a non-empty string'
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        details: 'Please set OPENAI_API_KEY in environment variables'
      });
    }

    // Get conversation history
    const conversation = conversations.get(conversationId) || [];
    
    // Add user message to history
    conversation.push({ role: 'user', content: message });

    // Limit conversation history to prevent token overflow
    if (conversation.length > 20) {
      conversation.splice(0, conversation.length - 20);
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: BOMAG_SYSTEM_PROMPT },
      ...conversation
    ];

    console.log(`Processing chat request: "${message.substring(0, 50)}..."`);

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 800,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantResponse = completion.choices[0].message.content;
    
    // Add assistant response to history
    conversation.push({ role: 'assistant', content: assistantResponse });
    
    // Store updated conversation
    conversations.set(conversationId, conversation);

    console.log(`Response generated successfully for conversation ${conversationId}`);

    res.json({
      response: assistantResponse,
      conversationId: conversationId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(429).json({ 
        error: 'API quota exceeded',
        details: 'OpenAI API quota has been exceeded. Please try again later.'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(401).json({ 
        error: 'Invalid API key',
        details: 'OpenAI API key is invalid or expired.'
      });
    }

    res.status(500).json({ 
      error: 'Failed to process chat request',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Get conversation history endpoint (protected)
app.get('/api/conversation/:conversationId', authenticateRequest, (req, res) => {
  try {
    const { conversationId } = req.params;
    const conversation = conversations.get(conversationId) || [];
    
    res.json({
      conversationId,
      messages: conversation,
      count: conversation.length
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
});

// Clear conversation endpoint (protected)
app.delete('/api/conversation/:conversationId', authenticateRequest, (req, res) => {
  try {
    const { conversationId } = req.params;
    conversations.delete(conversationId);
    
    res.json({ 
      message: 'Conversation cleared successfully',
      conversationId 
    });
  } catch (error) {
    console.error('Clear conversation error:', error);
    res.status(500).json({ error: 'Failed to clear conversation' });
  }
});

// Health check endpoint (public)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'BOMAG Chat Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    features: ['chat', 'conversation-management', 'bomag-specialized', 'authentication']
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 BOMAG Chat Backend running on port ${port}`);
  console.log(`🔗 Health check: http://localhost:${port}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${port}/api/chat (Protected)`);
  console.log(`🔐 Authentication: API Key required for chat endpoints`);
  console.log(`📊 Active conversations: ${conversations.size}`);
});
