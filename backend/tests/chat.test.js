const request = require('supertest');
const app = require('../server');

// Mock Google Generative AI
jest.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: jest.fn().mockImplementation(() => {
      return {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: jest.fn().mockResolvedValue({
              response: {
                text: () => 'Mocked response'
              }
            })
          })
        })
      };
    })
  };
});

describe('Chat API', () => {
  it('should return a response from the chatbot', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({
        message: 'Hello',
        history: [],
        electionType: 'lok-sabha'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('text');
    expect(res.body.text).toEqual('Mocked response');
  });

  it('should handle errors gracefully', async () => {
    // Re-mock to throw error
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const mockGenAI = new GoogleGenerativeAI();
    mockGenAI.getGenerativeModel.mockImplementationOnce(() => {
        throw new Error('API Error');
    });

    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello' });
    
    expect(res.statusCode).toEqual(500);
    expect(res.body.text).toContain('assistant is busy');
  });
});
