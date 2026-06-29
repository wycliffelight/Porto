const context = require.context('../images', false, /\.(png|jpe?g|svg)$/);

const images = context.keys().reduce((acc, item) => {
  const key = item.replace('./', '');
  acc[key] = context(item);
  return acc;
}, {});

export default images;