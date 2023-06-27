import JoditEditor from "jodit-react";
import './editor.css';
import { useState, useRef} from 'react';


export function EditorDeTexto (){
    const editor = useRef(null)
    const [content, setContent] = useState('')

    const config = {
        readonly: false,
        heigth: 400
    }

    const handleUpdate = (event: any) => {
        const editorContent = event.target.value 
        setContent(editorContent)
    }

    return (
        <div className="Editor">
            <JoditEditor 
                ref={editor}
                value={content}
                config={config}
                onBlur={handleUpdate}
                onChange={(newContent) => {} }
            />

        </div>
    )
}