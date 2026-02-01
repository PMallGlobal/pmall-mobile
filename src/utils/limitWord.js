const LimitWord = (text, length) => {
    const limitedText = text?.split(' ').slice(0, length).join(' ') + (text?.split(' ').length > length ? '...' : '');
    return limitedText;
  };
  export default LimitWord;