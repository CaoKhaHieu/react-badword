import { useEffect, useState } from 'react';
import { badWordsList } from '../data/badwords.js';

const createBadWordsRegex = (badwords) => {
  return new RegExp(`\\b(${badwords.join('|').replace(/\+/g, '\\+')})\\b`, 'gi');
};

const DEFAULT_PLACEHOLDER = '*';
const badWordRegexDefault = createBadWordsRegex(badWordsList);
const defaultOptions = {
  placeholder: DEFAULT_PLACEHOLDER,
  emptyList: false,
};

const useBadWords = (options = defaultOptions) => {
  // regex like: /\b(ass|dick|bollocks)\b/gi;
  const [badWordRegex, setBadWordRegex] = useState(badWordRegexDefault);
  const [words, setWords] = useState(badWordsList);

  const {
    placeholder = DEFAULT_PLACEHOLDER,
    emptyList = false,
  } = options;

  useEffect(() => {
    if(emptyList) {
      setWords([]);
    }
  }, []);

  useEffect(() => {
    if (words.length) {
      const newRegex = createBadWordsRegex(words)
      setBadWordRegex(newRegex);
    }
  }, [words]);

  const filterBadWord = (text) => {
    return text.replaceAll(badWordRegex, (match) => placeholder.repeat(match.length));
  };

  const hasBadWord = (text) => {
    return badWordRegex.test(text);
  };

  const addWords = (newWords) => {
    setWords((oldWords) => {
      // check word is exists
      const filteredArray = newWords.filter(word => !oldWords.includes(word));
      return [...oldWords, ...filteredArray];
    });
  };

  const removeWord = (removeWords) => {
    setWords((oldWords) => {
      const filteredArray = oldWords.filter(word => !removeWords.includes(word));
      return filteredArray;
    });
  };

  return {
    addWords,
    removeWord,
    filterBadWord,
    hasBadWord,
  };
};

export default useBadWords;
