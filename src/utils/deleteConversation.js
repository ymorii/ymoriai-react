const deleteConversation = ({ id, title, submit }) => {
  const deleteConfirm = confirm(
    `Delete chat? \n\nYou'll longer see this chat here. This will also delete related activity like prompts, responses.`,
  );
  if (!deleteConfirm) return;
  submit(
    {
      request_type: 'delete_conversation',
      conversation_id: id,
      conversation_title: title,
    },
    {
      method: 'DELETE',
      encType: 'application/x-www-form-urlencoded',
      action: '/',
    },
  );
};

export default deleteConversation;
