const Embed = Quill.import('blots/embed');

class AttachmentBlot extends Embed {
  static create(file) {
    const node = super.create();
    const denotationChar = document.createElement('span');
    denotationChar.className = 'ql-attachment__blot-icon';
    denotationChar.innerHTML = ' Attachment: ';
    node.appendChild(denotationChar);
    node.innerHTML += '  ' + file.name + '  ';
    return node;
  }

  static setDataValues(element, data) {
    const domNode = element;
    Object.keys(data).forEach((key) => {
      domNode.dataset[key] = data[key];
    });
    return domNode;
  }

  static value(domNode) {
    return domNode.dataset;
  }
}

AttachmentBlot.blotName = 'attachment';
AttachmentBlot.tagName = 'span';
AttachmentBlot.className = 'attachment';

export default AttachmentBlot;
