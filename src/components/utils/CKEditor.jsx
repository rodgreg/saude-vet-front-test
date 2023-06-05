import { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import './CKEditor-style.css';
//import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CKEditorA extends Component {

    render() {
        return (

            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <div className="document-editor__editable">

                        <CKEditor
                            editor={DecoupledEditor}
                            data={this.props.content ? this.props.content : "<p>Faça aqui seu registro clínico!</p>"}
                            config={editor => console.log('confg')}
                            onReady={editor => {
                                window.editor = editor;
                                const toolbarContainer = document.querySelector('.document-editor__toolbar');
                                toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                            }}
                            onChange={(event, editor) => {
                                // console.log( 'Blur.', editor );
                                this.props.onChange(event, editor);
                            }}
                            onBlur={(event, editor) => {
                                // console.log('Blur.', editor);
                                // this.props.onBlur(event, editor);
                            }}
                            onFocus={(event, editor) => {
                                // console.log('Focus.', editor);
                                // this.props.onFocus(event,editor)
                            }}
                        />
                    </div>
                </div>
            </div>

        );
    }
}

export default CKEditorA;