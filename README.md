# power-word-generator

مكتبة لتوليد كلمات عشوائية بالعربي والانجليزي مع اكثر من 3500 كلمة مقسمة على 15 فئة

A random words generator for Arabic and English with 3500+ words across 15 categories

Author: Power Development

## التثبيت - Installation

```bash
npm install power-word-generator
```

## الاستخدام - Usage

```javascript
const power = require('power-word-generator')

// كلمة عشوائية
power.word()
power.word('ar')

// كلمة من فئة معينة
power.word('animals')
power.word('animals', 'ar')

// عدة كلمات
power.words(5)
power.words(5, 'ar')
power.words(3, 'colors', 'ar')

// كلمات بدون تكرار
power.uniqueWords(5)
power.uniqueWords(5, 'ar')

// العاب البوتات
power.scramble('ar')
// { original: "طائرة", scrambled: "ةرائط" }

power.missing('ar')
// { word: "تفاح", puzzle: "تـ_ـاح", missing: "ف" }

// جملة عشوائية
power.sentence()
power.sentence('ar')

// عدة جمل
power.sentences(3)
power.sentences(3, 'ar')

// فقرة
power.paragraph()
power.paragraph('ar')

// عدة فقرات
power.paragraphs(2)
power.paragraphs(2, 'ar')

// بحث عن كلمة
power.search('sun')
power.search('شمس', 'ar')

// كلمة تبدا بحرف معين
power.wordStartsWith('a')
power.wordStartsWith('س', 'ar')

// كلمة بعدد حروف محدد
power.wordWithLength(5)
power.wordWithLength(4, 'ar')

// خلط كلمات من كل الفئات
power.shuffle(10)
power.shuffle(10, 'ar')

// الفئات المتاحة
power.categories()
power.categories('ar')

// عدد الكلمات
power.count()
power.count('ar')
power.count('animals')

// احصائيات
power.stats()
power.stats('ar')
```

## الفئات المتاحة - Available Categories

adjectives صفات
nouns اسماء
verbs افعال
animals حيوانات
colors الوان
emotions مشاعر
food طعام
nature طبيعة
technology تكنولوجيا
space فضاء
music موسيقى
sports رياضة
mythology اساطير
professions مهن
abstract مفاهيم

## الكلاس - Class Usage

```javascript
const { PowerWordGenerator } = require('power-word-generator')

const generator = new PowerWordGenerator()
console.log(generator.word('ar'))
```

## الترخيص - License

MIT © Power Development
