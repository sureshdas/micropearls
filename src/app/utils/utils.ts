export const editorConfig: any = {
  editable: true,
  spellcheck: false,
  height: 'auto',
  minHeight: '0',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter text here.',
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['fontName', 'fontSize', 'color'],
    ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',  "indent", "outdent"],
    ['orderedList', 'unorderedList']
    //   ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
    // ["fontName", "fontSize", "color"],
    //   ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
    // ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
    // ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
    // ["link", "unlink", "image", "video"]
  ]
};
