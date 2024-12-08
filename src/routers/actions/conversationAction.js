import { databases } from '../../lib/appwrite';
import { getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

const conversationAction = async ({ request, params }) => {
  const { conversationId } = params;
  const formData = await request.formData();
  const userPrompt = formData.get('user_prompt');

  let chatHistory = [];
  let aiResponse = '';

  try {
    const { chats } = await databases.getDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    );

    chatHistory = chats.map(({ user_prompt, ai_response }) => {
      return { user_prompt, ai_response };
    });
  } catch (err) {
    console.log(`Error getting chat: ${err.message}`);
  }

  try {
    aiResponse = await getAiResponse(userPrompt, chatHistory);
  } catch (err) {
    console.log(`Error getting Gemini response: ${err.message}`);
  }

  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversationId,
      },
    );
  } catch (err) {
    console.log(`Error storing chat: ${err.message}`);
  }

  return null;
};

export default conversationAction;
