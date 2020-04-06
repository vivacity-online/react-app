import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function BoardEditor(props){
    return (
        <Editor
            apiKey="k2iv2h8b33xrpdfeaivdvhkwrc71s88ckwh4e6isju3o7w50"
            initialValue={props.placeholder || ""}
            value={props.value || ""}
            plugins={"bbcode advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable"}
            toolbar={'casechange checklist code formatpainter pageembed permanentpen table'}
            onEditorChange={props.onEditorChange || null}
        />
    )
}

export default BoardEditor;