import AttachmentBlot from './blot';
import AttachmentToolbar from './toolbar';
import './styles/attachment.scss';

Quill.register(AttachmentBlot);
Quill.register('modules/attachment-toolbar', AttachmentToolbar);
