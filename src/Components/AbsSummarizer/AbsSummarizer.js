import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import './AbsSummarizer.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Form } from "react-bootstrap";
import CircularProgress from '@mui/material/CircularProgress';
import {MdCloudUpload} from "react-icons/md"
import {BsFillArrowRightCircleFill} from "react-icons/bs"
import axios from 'axios'

const AbsSummarizer = () => {

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
        var textarea = document.getElementById('CheckIt');
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

    const handleSubmitAbs = (event) => {
        setLoading(true)
        event.preventDefault();
        if(file == null) {
            const body = { text };
            axios
              .post('http://localhost:8080/summarize_abs/', body)
              .then((res) => {
                const data = res.data.results
                let summ = data.summary
                console.log(summ)
              //   divelement.hidden = false
                setSumm(summ)
      
                setLoading(false)
              })
              .catch((error) => {
              //   divelement.hidden = false
                setSumm(error.message)
                setLoading(false)
              })
        } else {
            axios
            .post('http://localhost:8080/summarize_abs_file', file)
            .then((res) => {
                console.log('API called')
                const data = res.data.results
                let summ = data.summary
                console.log(summ)
              //   divelement.hidden = false
                setSumm(summ)
      
                setLoading(false)
            })
            .catch((error) => {
            //   divelement.hidden = false
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
    <div className='main-form'>
        <div className='input_section'>
            <h1>Abstractive Summarizer</h1>
            <div className='form'>
                <Form id="_form" onSubmit={handleSubmitAbs}>
                    <div className='input_text'>
                        <textarea
                            id='CheckIt'
                            className='_textarea'
                            required
                            type='text'
                            placeholder="Insert your text here!"
                            value={text}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>

                    <div className='eval'>
                        <div className="file-inputs">
                            <Button type="button" id='import_btn1' onClick={handleImport}><MdCloudUpload onClick={handleImport} style={{marginRight:'4%'}}/> {fileName ?? "Or upload a .txt file"} </Button>
                            <input type="file" ref={hiddenFileInput} onChange={handleChangeFile} style={{ display: 'none' }} />
                        </div>
                        {/* <Button type="submit" id='file_btn'>Or upload a <b>.txt</b> file</Button> */}
                        <Button type="submit" id='eval_btn'>Summarize</Button>

                        {/* <Result isLoading={isLoading} score={score}/> */}
                    </div>
                </Form>
            </div>
        </div>

        <div className='result_section'>
            <Result isLoading={isLoading} summ={summ}/>
        </div>
        
        
        
    </div>
  )
}

export default AbsSummarizer