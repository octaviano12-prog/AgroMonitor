import OpenAI from 'openai';
import { config } from '../../config';
import { equipmentRepository } from '../equipment/repository';
import { operatorRepository } from '../operator/repository';
import { farmRepository } from '../farm/repository';

const openai = new OpenAI({ apiKey: config.openai.apiKey });

export class AIService {
  async chat(message: string, context?: any) {
    const systemPrompt = `Você é a Agro IA, assistente inteligente do AgroMonitor Pro, sistema de monitoramento operacional agrícola.
    Você tem acesso a dados sobre equipamentos, operadores, fazendas, frentes de trabalho, e operações agrícolas.
    Responda em português do Brasil de forma clara e objetiva.`;

    const completion = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0]?.message?.content || 'Desculpe, não consegui processar sua mensagem.';
  }

  async generateReport(type: string, params: any) {
    const equipment = await equipmentRepository.countByStatus();
    const operators = await operatorRepository.count();
    const farms = await farmRepository.count();

    const prompt = `Gere um relatório de ${type} com os seguintes dados:
    - Equipamentos: ${JSON.stringify(equipment)}
    - Operadores: ${operators}
    - Fazendas: ${farms}
    - Parâmetros: ${JSON.stringify(params)}
    
    Formate o relatório de forma profissional em markdown.`;

    return this.chat(prompt);
  }
}
export const aiService = new AIService();
