import MentionBlot from './blot';
import Mention from './mention';
import './styles/mention.scss';

Quill.register(MentionBlot);
Quill.register('modules/mention', Mention);

