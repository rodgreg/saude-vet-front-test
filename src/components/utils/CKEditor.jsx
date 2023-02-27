import { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class CKEditorA extends Component {
	
    render() {
        return (
            <div id='ckeditor'>
                <div id='ckeditor_toolbar'></div>
                <div id='ckeditor_editable-component' style={{display:'flex', backgroundColor:'var(--bg-input)', minHeight:300, maxHeight:300, overflowY:'scroll' }}>
                    <CKEditor
                        editor={ DecoupledEditor }
                        data={this.props.content}
                        config={ editor => console.log('confg')}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                            window.editor = editor;
                            // Add these two lines to properly position the toolbar
                            const toolbarContainer = document.querySelector('#ckeditor_toolbar');
                            toolbarContainer.appendChild( editor.ui.view.toolbar.element );
                        } }
                        onChange={( event, editor ) => {
                            //console.log( 'Blur.', editor );
                            this.props.onChange(event, editor);
                        } }
                        onBlur={ ( event, editor ) => {
                            //console.log( 'Blur.', editor );
                            this.props.onBlur(event, editor);
                        } }
                        onFocus={ ( event, editor ) => {
                            //console.log( 'Focus.', editor );
                            this.props.onFocus(event,editor)
                        } }
                    />
                </div>
            </div>
        );
    }
}

export default CKEditorA;