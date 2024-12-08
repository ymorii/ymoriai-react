import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';
import { redirect } from 'react-router-dom';
const userPromptAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');
  const user = await account.get();
  const conversationTitle = await getConversationTitle(userPrompt);

  let conversation = null;

  try {
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      generateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      },
    );
  } catch (err) {
    console.log(`Error generating conversation title: ${err.message}`);
  }

  // generate ai response
  const aiResponse = await getAiResponse(userPrompt);

  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      },
    );
  } catch (err) {
    console.log(`Error creating chat: ${err.message}`);
  }

  return redirect(`/${conversation.$id}`);
};

const conversationAction = async (formData) => {
  const conversationId = formData.get('conversation_id');
  const conversationTitle = formData.get('conversation_title');

  try {
    await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      conversationId,
    );
    return { conversationTitle };
  } catch (err) {
    console.log(`Error in deleting conversation: ${err.message}`);
  }
};

const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type');

  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }

  if (requestType === 'delete_conversation') {
    return await conversationAction(formData);
  }
};

export default appAction;
