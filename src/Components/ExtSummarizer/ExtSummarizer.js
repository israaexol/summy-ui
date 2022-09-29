import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import './ExtSummarizer.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';
import {MdCloudUpload} from "react-icons/md"
import axios from 'axios'
import {BsFillArrowRightCircleFill} from "react-icons/bs"

const ExtSummarizer = () => {

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    const [summ, setSumm] = useState(null)
    const [isLoading, setLoading] = useState(null)
    const hiddenFileInput = React.useRef(null);


    const handleChange = txt => {
        console.log('here')
        setText(txt)
        console.log(text)
      };

    const handleImport = event => {
        var textarea = document.getElementById('CheckItExt');
        textarea.required = false;
        textarea.disabled = true;
        hiddenFileInput.current.click();

    };
    
    const handleChangeFile = event => {
        const fileUploaded = event.target.files[0];
        if (fileUploaded) {
            let dataFile = new FormData();
            dataFile.append('file', fileUploaded);
            setFile(dataFile)
            setFileName(fileUploaded.name)
        }
    };

    const handleSubmitExt = (event) => {
        setLoading(true)
        event.preventDefault();
        if(file == null) {
            const body = { text };
            axios
              .post('http://localhost:8080/summarize_ext/', body)
              .then((res) => {
                const data = res.data.results
                let summ = data.summary
                console.log(summ)
                setSumm(summ)
      
                setLoading(false)
              })
              .catch((error) => {
                setSumm(error.message)
                setLoading(false)
              })
        } else {
            axios
            .post('http://localhost:8080/summarize_ext_file', file)
            .then((res) => {
                const data = res.data.results
                let summ = data.summary
                console.log(summ)
                setSumm(summ)
      
                setLoading(false)
            })
            .catch((error) => {
                setSumm(error.message)
                setLoading(false)
            })
        }
        
        }

    function Summary({ summ }) {
        return (
            <div className='result'>
                <p>{summ}</p>
            </div>
        );
        }

    function Result({isLoading, summ}) {
        if (isLoading == null ) {
            return <></>
        }
        else if (isLoading == true) {
            return <CircularProgress id='loading'/>
        }
        else {
            return (
                <>
                    <BsFillArrowRightCircleFill id="arrow"/>
                    <Summary summ={summ}/>
                </>
            )
        }
    }

  return (
    <div className='main-form-ext'>
        <div className='input_section_ext'>
            <h1>Extractive Summarizer</h1>
            <div className='form-ext'>
                <Form id="_form-ext" onSubmit={handleSubmitExt}>
                    <div className='input_text_ext'>
                        <textarea
                            id='CheckItExt'
                            className='_textarea_ext'
                            required
                            type='text'
                            placeholder="Insert your text here!"
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>

                    <div className='eval_ext'>
                        <div className="file-inputs_ext">
                            <Button type="button" id='import_btn2' onClick={handleImport}><MdCloudUpload style={{marginRight:'4%'}}/> {fileName ?? "Or upload a .txt file"} </Button>
                            <input type="file" ref={hiddenFileInput} onChange={handleChangeFile} style={{ display: 'none' }} />
                        </div>
                        {/* <Button type="submit" id='file_btn'>Or upload a <b>.txt</b> file</Button> */}
                        <Button type="submit" id='eval_btn_ext'>Summarize</Button>

                        {/* <Result isLoading={isLoading} score={score}/> */}
                    </div>
                </Form>
            </div>
        </div>
        <div className='result_section_ext'>
            <Result isLoading={isLoading} summ={summ}/>
        </div>
    </div>
  )
}

export default ExtSummarizer