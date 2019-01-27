import '../src/modules/emoji/index';
import '../src/modules/mention/index';
import '../src/modules/attachment/index';

const mockMentionNames = [
  {id: 'alex.peck', value: 'Alexander Peck'},
  {id: 'joy.lin', value: 'Joy Lin'},
  {id: 'sylvia.williamson', value: 'Sylvia Williamson'},
  {id: 'dustin.wise', value: 'Dustin Wise'},
  {id: 'vickie.barnes', value: 'Vickie Barnes'},
  {id: 'carl.curtis', value: 'Carl Curtis'},
  {id: 'sabrina.romero', value: 'Sabrina Romero'}
];

const toolbarContainers = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ 'header': 1 }, { 'header': 2 }],
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],
  [{ 'indent': '-1' }, { 'indent': '+1' }],
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', false, 'large', 'huge'] }],
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  [{ 'font': [] }],
  [{ 'color': [] }, { 'background': [] }],
  [{ 'align': [] }],
  ['clean'],
  ['link', 'image', 'video'],
  ['emoji', 'attachment'],
];

const editorConfig = {
  id: 'editor-app',
  modules: {
    toolbar: {
      container: toolbarContainers
    },
    mention: {
      mountId: 'mention-app',
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      source: function (searchTerm, renderList) {
        const maxItems = 10;
        const values = mockMentionNames;

        if (searchTerm.length === 0) {
          renderList(values.slice(0, maxItems), searchTerm);
        } else {
          const matches = [];
          for (let i = 0; i < values.length; i++) {
            if (values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) matches.push(values[i]);
          }
          renderList(matches.slice(0, maxItems), searchTerm);
        }
      },
    },
    "emoji-toolbar": {
      mountId: 'emoji-app'
    },
    "attachment-toolbar": {},
    "emoji-shortname": true
  },
};

export default editorConfig;
