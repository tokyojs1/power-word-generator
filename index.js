'use strict';

const data = require('./words');

class PowerWordGenerator {
  constructor() {
    this.data = data;
    this.langs = Object.keys(data);
  }

  getCategories(lang) {
    lang = this._normLang(lang);
    return Object.keys(this.data[lang]);
  }

  word(category, lang) {
    const opts = this._resolveCatLang(category, lang);
    const pool = this._getPool(opts.category, opts.lang);
    return pool[Math.floor(Math.random() * pool.length)];
  }

  words(count, category, lang) {
    if (typeof count === 'string') {
      lang = category;
      category = count;
      count = 5;
    }
    count = count || 5;

    const opts = this._resolveCatLang(category, lang);
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(this.word(opts.category, opts.lang));
    }
    return result;
  }

  uniqueWords(count, category, lang) {
    if (typeof count === 'string') {
      lang = category;
      category = count;
      count = 5;
    }
    count = count || 5;

    const opts = this._resolveCatLang(category, lang);
    let pool;

    if (!opts.category) {
      pool = this._getAllWords(opts.lang);
    } else {
      pool = this._getPool(opts.category, opts.lang);
    }

    if (count > pool.length) {
      throw new Error('Requested ' + count + ' words but only ' + pool.length + ' available');
    }

    const copy = pool.slice();
    const result = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return result;
  }

  sentence(wordCount, lang) {
    if (typeof wordCount === 'string') {
      lang = wordCount;
      wordCount = null;
    }
    lang = this._normLang(lang);
    const count = wordCount || Math.floor(Math.random() * 8) + 4;
    const w = this.words(count, null, lang);

    if (lang === 'en') {
      w[0] = w[0].charAt(0).toUpperCase() + w[0].slice(1);
    }
    return w.join(' ') + '.';
  }

  sentences(count, lang) {
    if (typeof count === 'string') {
      lang = count;
      count = 3;
    }
    count = count || 3;
    lang = this._normLang(lang);

    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(this.sentence(null, lang));
    }
    return result;
  }

  paragraph(sentenceCount, lang) {
    if (typeof sentenceCount === 'string') {
      lang = sentenceCount;
      sentenceCount = null;
    }
    const count = sentenceCount || Math.floor(Math.random() * 4) + 3;
    lang = this._normLang(lang);
    return this.sentences(count, lang).join(' ');
  }

  paragraphs(count, lang) {
    if (typeof count === 'string') {
      lang = count;
      count = 3;
    }
    count = count || 3;
    lang = this._normLang(lang);

    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(this.paragraph(null, lang));
    }
    return result;
  }

  count(category, lang) {
    if (category === 'ar' || category === 'en') {
      lang = category;
      category = null;
    }
    lang = this._normLang(lang);

    if (category) {
      return this._getPool(category, lang).length;
    }

    let total = 0;
    const cats = this.getCategories(lang);
    for (let i = 0; i < cats.length; i++) {
      total += this.data[lang][cats[i]].length;
    }
    return total;
  }

  wordStartsWith(letter, category, lang) {
    const opts = this._resolveCatLang(category, lang);
    const pool = opts.category ? this._getPool(opts.category, opts.lang) : this._getAllWords(opts.lang);
    const filtered = pool.filter(function(w) {
      return w.toLowerCase().startsWith(letter.toLowerCase());
    });
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  wordWithLength(length, category, lang) {
    const opts = this._resolveCatLang(category, lang);
    const pool = opts.category ? this._getPool(opts.category, opts.lang) : this._getAllWords(opts.lang);
    const filtered = pool.filter(function(w) {
      return w.length === length;
    });
    if (filtered.length === 0) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  shuffle(count, lang) {
    if (typeof count === 'string') {
      lang = count;
      count = 10;
    }
    count = count || 10;
    lang = this._normLang(lang);

    const all = this._getAllWords(lang);
    const shuffled = all.slice().sort(function() { return Math.random() - 0.5; });
    return shuffled.slice(0, count);
  }

  search(text, category, lang) {
    const opts = this._resolveCatLang(category, lang);
    const lower = text.toLowerCase();

    if (opts.category) {
      return this._getPool(opts.category, opts.lang).filter(function(w) {
        return w.toLowerCase().includes(lower);
      });
    }

    const seen = Object.create(null);
    const results = [];
    const cats = this.getCategories(opts.lang);

    for (let i = 0; i < cats.length; i++) {
      const list = this.data[opts.lang][cats[i]];
      for (let j = 0; j < list.length; j++) {
        const item = list[j];
        if (item.toLowerCase().includes(lower) && !seen[item]) {
          seen[item] = true;
          results.push(item);
        }
      }
    }
    return results;
  }

  stats(lang) {
    lang = this._normLang(lang);
    const cats = this.getCategories(lang);
    const result = {
      totalWords: 0,
      totalCategories: cats.length,
      categories: {},
      largestCategory: { name: '', count: 0 },
      smallestCategory: { name: '', count: Infinity }
    };
    for (let i = 0; i < cats.length; i++) {
      const len = this.data[lang][cats[i]].length;
      result.categories[cats[i]] = len;
      result.totalWords += len;
      if (len > result.largestCategory.count) {
        result.largestCategory = { name: cats[i], count: len };
      }
      if (len < result.smallestCategory.count) {
        result.smallestCategory = { name: cats[i], count: len };
      }
    }
    return result;
  }

  scramble(category, lang) {
    const opts = this._resolveCatLang(category, lang);
    let word;
    do {
      word = this.word(opts.category, opts.lang);
    } while (word.length < 3 || word.includes(' '));

    const chars = Array.from(word);
    let scrambled;
    let attempts = 0;

    do {
      for (let i = chars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = chars[i];
        chars[i] = chars[j];
        chars[j] = temp;
      }
      scrambled = chars.join('');
      attempts++;
    } while (scrambled === word && attempts < 15);

    return {
      original: word,
      scrambled: scrambled
    };
  }

  missing(category, lang) {
    const opts = this._resolveCatLang(category, lang);
    let word;
    do {
      word = this.word(opts.category, opts.lang);
    } while (word.length < 3 || word.includes(' '));

    const chars = Array.from(word);
    const index = Math.floor(Math.random() * (chars.length - 2)) + 1;
    const missingChar = chars[index];
    chars[index] = '_';

    return {
      word: word,
      puzzle: chars.join(''),
      missing: missingChar
    };
  }

  _normLang(lang) {
    if (!lang) return 'en';
    if (!this.data[lang]) throw new Error('Language not found: ' + lang);
    return lang;
  }

  _resolveCatLang(category, lang) {
    if (category === 'ar' || category === 'en') {
      return { category: null, lang: category };
    }
    return { category: category || null, lang: this._normLang(lang) };
  }

  _getAllWords(lang) {
    const cats = this.getCategories(lang);
    let all = [];
    for (let i = 0; i < cats.length; i++) {
      all = all.concat(this.data[lang][cats[i]]);
    }
    return all;
  }

  _getPool(category, lang) {
    lang = this._normLang(lang);
    if (!category) {
      const cats = Object.keys(this.data[lang]);
      category = cats[Math.floor(Math.random() * cats.length)];
    }
    const pool = this.data[lang][category];
    if (!pool) throw new Error('Category not found: ' + category);
    return pool;
  }
}

const instance = new PowerWordGenerator();

module.exports = {
  PowerWordGenerator: PowerWordGenerator,
  PowerRandomWords: PowerWordGenerator,
  word: function(cat, lang) { return instance.word(cat, lang); },
  words: function(count, cat, lang) { return instance.words(count, cat, lang); },
  uniqueWords: function(count, cat, lang) { return instance.uniqueWords(count, cat, lang); },
  sentence: function(count, lang) { return instance.sentence(count, lang); },
  sentences: function(count, lang) { return instance.sentences(count, lang); },
  paragraph: function(count, lang) { return instance.paragraph(count, lang); },
  paragraphs: function(count, lang) { return instance.paragraphs(count, lang); },
  categories: function(lang) { return instance.getCategories(lang); },
  count: function(cat, lang) { return instance.count(cat, lang); },
  shuffle: function(count, lang) { return instance.shuffle(count, lang); },
  search: function(text, cat, lang) { return instance.search(text, cat, lang); },
  stats: function(lang) { return instance.stats(lang); },
  scramble: function(cat, lang) { return instance.scramble(cat, lang); },
  missing: function(cat, lang) { return instance.missing(cat, lang); },
  wordStartsWith: function(letter, cat, lang) { return instance.wordStartsWith(letter, cat, lang); },
  wordWithLength: function(len, cat, lang) { return instance.wordWithLength(len, cat, lang); }
};
