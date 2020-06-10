const requireLanguages = require.context('.', false, /\.js$/);
const translations = {};

requireLanguages.keys().forEach((fileName) => {
  if (fileName !== './index.js') {
    const lang = fileName.replace(/\.js$|\.\//g, '');
    translations[lang] = { ...requireLanguages(fileName).default };
  }
});

const requireFeatureTranslations = require.context('../features/', true, /\.i18n\.js$/);
requireFeatureTranslations.keys().forEach((filename) => {
  const featureName = filename.replace(/\.\/(\w+).+/,'$1');
  const featureTranslations = requireFeatureTranslations(filename).default;
  Object.keys(featureTranslations).forEach(lang => {
    translations[lang][featureName] = featureTranslations[lang]
  })
});

export default translations;
