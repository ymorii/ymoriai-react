import { motion } from 'framer-motion';
import { IconBtn } from './Button';
import { useRef, useCallback, useState } from 'react';
import { useNavigation, useSubmit, useParams } from 'react-router-dom';
import { input } from 'framer-motion/client';
const PromptField = () => {
  const inputField = useRef();
  const inputFieldContainer = useRef();
  const submit = useSubmit();
  const navigation = useNavigation();
  const { conversationId } = useParams();

  const [placeholderShown, setPlaceholderShown] = useState(true);
  const [isMultiLine, setMultiLine] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(() => {
    if (inputField.current.innerText === '\n')
      inputField.current.innerHTML = '';
    setPlaceholderShown(!inputField.current.innerText);
    setMultiLine(inputFieldContainer.current.clientHeight > 64);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  const moveCursorToEnd = useCallback(() => {
    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(editableElem);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
  });
  //   Handle paste text
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChange();
      moveCursorToEnd();
    },
    [handleInputChange, moveCursorToEnd],
  );

  const handleSubmit = useCallback(() => {
    if (!inputValue || navigation.state === 'submitting') return;
    submit(
      {
        user_prompt: inputValue,
        request_type: 'user_prompt',
      },
      {
        method: 'POST',
        encType: 'application/x-www-form-urlencoded',
        action: `/${conversationId || ''}`,
      },
    );

    inputField.current.innerHTML = '';
    handleInputChange();
  }, [handleInputChange, inputValue, navigation.state, submit, conversationId]);

  const promptFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        straggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };
  const promptFieldChildrenVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <motion.div
      className={`prompt-field-container ${isMultiLine ? 'rounded-large' : ''}`}
      variants={promptFieldVariant}
      initial='hidden'
      animate='visible'
      ref={inputFieldContainer}
    >
      <motion.div
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable={true}
        role='textbox'
        aria-multiline={true}
        aria-label='Enter a prompt here'
        data-placeholder='Enter a prompt here'
        variants={promptFieldChildrenVariant}
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          if (e.key == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <IconBtn
        icon='send'
        title='Submit'
        size='large'
        classes='ms-auto'
        variants={promptFieldChildrenVariant}
        onClick={handleSubmit}
      />
      <div className='state-layer'></div>
    </motion.div>
  );
};

export default PromptField;
