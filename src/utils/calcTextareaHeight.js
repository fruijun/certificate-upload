let hiddenTextarea;

const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  background:red;
`;
//  'line-height',
const CONTEXT_STYLE = [
  'letter-spacing',

  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'height',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);

  const boxSizing = style.getPropertyValue('box-sizing');
  const paddingSize = parseFloat(
    (parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))).toFixed(1)
  );

  const borderSize = parseFloat(
    (parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))).toFixed(1)
  );

  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';');
// console.log('contentStyle',contextStyle,'||',paddingSize,'||',borderSize,'||',boxSizing)
  return { contextStyle, paddingSize, borderSize, boxSizing };
}

export default function calcTextareaHeight(
  targetElement,
  value,
  minRows = 1,
  maxRows = null
) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.id = 'hiddenTextarea';
    document.body.appendChild(hiddenTextarea);
  }

  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetElement);

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`);
  // hiddenTextarea.setAttribute('style', `${contextStyle};`);
  // console.log('targetElement.value',value)
  hiddenTextarea.value = value || targetElement.placeholder || '';
  const l = document.getElementById('hiddenTextarea');

  let height = hiddenTextarea.scrollHeight;
  // console.log('hiddenTextarea.scrollHeight',hiddenTextarea.scrollHeight,hiddenTextarea.scrollTop,hiddenTextarea.clientHeight)
  const styleh = window.getComputedStyle(hiddenTextarea);
  // console.log('styleh',styleh)
  const result = {};

  if (boxSizing === 'border-box') {
    // console.log('========================')
    // console.log('height:',height,'borderSize:',borderSize,'paddingSize',paddingSize)
    height = height + borderSize + paddingSize;
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize;
  }

  // hiddenTextarea.value = '';
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

  if (minRows !== null) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.min(minHeight, height);
    result.minHeight = `${ parseFloat(minHeight /37.5) }rem`;
  }
  if (maxRows !== null) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.max(maxHeight, height);
  }
  // console.log('final height',height)
  result.height = `${ parseFloat(height / 37.5 )}rem`;
  // console.log('rem height',result.height)
  hiddenTextarea.parentNode && hiddenTextarea.parentNode.removeChild(hiddenTextarea);
  hiddenTextarea = null;
  return result;
};