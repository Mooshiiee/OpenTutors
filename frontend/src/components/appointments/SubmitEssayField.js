import React, { useCallback } from "react";
import { TextFieldElement, useController } from "react-hook-form-mui";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';

import { useDropzone } from 'react-dropzone'
import { Box, Divider, Paper, Typography } from "@mui/material";

export default function SubmitEssayField ( {essaySubmitMethod, control} ) {
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video',
        'color', 'background',
        'align', 'code-block', 'code',
        'script', 'clean', 'linebreak'  // Add 'linebreak' here
      ];

    const { field: quillField } = useController({
        name: 'student_work_text',
        control,
        defaultValue: '',
      });

    const { field: fileField } = useController({
        name: 'student_work_file',
        control,
        defaultValue: null,
    })
    
    const onDrop = useCallback((acceptedFiles) => {
        fileField.onChange(acceptedFiles[0])
    }, [fileField])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    if (essaySubmitMethod === 'link') {
        return( 
            <TextFieldElement name='student_work_link' 
                label='Paste the link here!' 
                type={'url'}
            /> 
            )
    } 
    if (essaySubmitMethod === 'paste') {
        return (
             <ReactQuill 
                name='student_work_text' 
                theme='snow' 
                value={quillField.value}
                onChange={quillField.onChange}
                onBlur={quillField.onBlur}
                style={{
                    minHeight: 200,
                    pb: 5,
                    width: '100%',
                }}
                preserveWhitespace={true}
                formats={formats}
            
              /> 
        )
    } 
    if (essaySubmitMethod === 'document') {
        return (
            <Paper 
                elevation={3}
                {...getRootProps()} 
                sx={{p: 10,
                    textAlign: 'center', cursor: 'pointer',  
                    borderColor: isDragActive ? '#c6e2c6' : '#f3f3f3', 
                    alignItems: 'center', borderStyle: 'dashed', 
                    borderRadius: 4, borderWidth: 4, display: 'flex', 
                    flexDirection: 'column', flex: 1,
                    bgcolor: fileField.value ? '#c6e2c6' : '#f3f3f3'
                }}
            >   
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <Typography gutterBottom>Drop the files here...</Typography> :
                    <Typography>
                        Drag 'n' drop your file here, or click to select the file
                    </Typography>
                }
                {fileField.value && <Typography mt={2}>File Selected: {fileField.value.name}</Typography>}
            </Paper> 
        );
    }

}
