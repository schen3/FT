import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Document, Page } from 'react-pdf';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

/**
 * RefObject type interface
 */
interface RefObject<T> {
    readonly current: T | null;
}

/**
 * UploadFile interface
 */
interface IUploadFile {
    /**
     * Function passes the Item selected
     * @param value
     */
    handleFile(any): void;
}

const fileUploadStatus = {
    UPLOADING: 'UPLOADING',
    START: 'PROCESSING',
    COMPLETED: 'COMPLETED'
}

/**
 * UploadFile Functional component implementation
 */
const UploadFile: FC<IUploadFile> = ({ handleFile }) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const hiddenFileInput: RefObject<any> = React.useRef(null);
    const [status, setStatus] = useState('UPLOADING');
    const dropRef: RefObject<any> = React.createRef();
    const [fileName, setFileName] = useState();
    const [fileSize, setFileSize] = useState('');

    // Drag&Drop methods
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        debugger;
    };
    const handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            const fileUploaded = e.dataTransfer.files[0];
            console.log('from handleDragIn', fileUploaded)
            // onUpload(fileUploaded, true);
        }
    };
    const handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            console.log('from handleDrop')
            const fileUploaded = e.dataTransfer.files[0];
            onUpload(fileUploaded, false);
        }
    };

    // Event handling
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };
    const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        onUpload(fileUploaded, false);
    };


    const onUpload = (fileUploaded, isDragging: boolean) => {
        console.log('fileUploaded', fileUploaded);
        setStatus('START')
        setIsDragging(isDragging);

        //SetFileDetail
        const formatFileSize = `${(fileUploaded.size / 1048576).toFixed(2)} MB`;
        const fileName = fileUploaded.name.trim();
        setFileName(fileName);
        setFileSize(formatFileSize);
        const fileExtension = fileName.split(".").pop().toLowerCase();
        // Making call
        setStatus('START');
        setTimeout(() => {
            if (fileExtension === 'txt') {
                TxtToJson(fileUploaded)
            } else if (fileExtension === 'pdf') {
                PdfToJson(fileUploaded)
            }

        }, 1000);

    }

    const onDownload = (params: string) => {
        console.log('downloading')
    }

    const PdfToJson = (uploadFile) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e) => {
            const data = reader.result;
            const content = JSON.stringify(data);
            console.log('Upload txt Json', JSON.parse(content))
        };
        reader.onerror = () => {
            console.log('Error')
        };
        reader.readAsBinaryString(uploadFile);
        setStatus('COMPLETED');
        //reserved fn
    }

    const TxtToJson = (uploadFile) => {
        const reader: FileReader = new FileReader();
        reader.onload = (e) => {
            const data = reader.result;
            const content = JSON.stringify(data);
            console.log('Upload txt Json', JSON.parse(content))
        };
        reader.onerror = () => {
            console.log('Error')
        };
        reader.readAsBinaryString(uploadFile);
        setStatus('COMPLETED');
    }

    // Set and remove eventListeners during mount and unmount
    useEffect(() => {
        const div: HTMLDivElement = dropRef.current;
        div.addEventListener('dragenter', handleDragIn);
        div.addEventListener('dragleave', handleDragOut);
        div.addEventListener('dragover', handleDrag);
        div.addEventListener('drop', handleDrop);
        return function cleanup() {
            div.removeEventListener('dragenter', handleDragIn);
            div.removeEventListener('dragleave', handleDragOut);
            div.removeEventListener('dragover', handleDrag);
            div.removeEventListener('drop', handleDrop);
        };
    });
    return (
        <div ref={dropRef} >
            {status === 'START' &&
                <div style={styles.center}>
                    <Text> 1. We are upLoading you  {fileName} ({fileSize})</Text><br />
                    <div style={styles.center}>
                        <CircularProgress />
                    </div>
                </div>
            }
            {status === 'COMPLETED' &&
                <div style={styles.center}>
                    <Text>Successful! </Text><br />
                    <Text>FileName.XLSM</Text>
                    <button
                        data-testid={'uploadTestBtn'}
                        style={styles.btn}
                        onClick={() => onDownload('fileName')}
                    >
                        Download
                    </button>
                </div>
            }
            {status === 'UPLOADING' &&
                <div
                    data-testid="container"
                    style={isDragging ? styles.draggedContainer : styles.container}
                >
                    <div style={styles.uploadButtonContainer}>
                        {/* <UploadFileIcon /> */}
                    </div>
                    <p style={styles.text}>Drag and drop files here</p>
                    <button
                        data-testid={'uploadTestBtn'}
                        style={styles.selectFileButton}
                        onClick={handleClick}
                    >
                        Select File
                    </button>
                    <input
                        data-testid="fileInput"
                        type="file"
                        ref={hiddenFileInput}
                        onChange={handleChange}
                        accept=".txt, .pdf"
                        style={{ display: 'none' }}
                    />
                </div>}
        </div>
    );
};

export default UploadFile;



const styles = StyleSheet.create({
    draggedContainer: {
        width: '40%',
        height: '240px',
        border: 'dashed 1px #0055cb',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: .5,
        marginLeft: '30%',
    },
    container: {
        width: 544,
        height: 240,
        border: 'dashed 1px #d7dadf',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '30%',
    },
    uploadButtonContainer: {
        width: 60,
        height: 60,
        marginLeft: '43%'
    },
    text: {
        marginLeft: '34%',
        width: '191px',
        height: '18px',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontWeight: '500',
        color: '#99abbe',
    },
    selectFileButton: {
        marginLeft: '40%',
        cursor: 'pointer',
        color: '#0071e9',
        backgroundColor: 'white',
        border: 'solid 1px #0071ef',
        height: '45px',
        width: '100px',
        textTransform: 'capitalize',
        fontFamily: 'Roboto, Arial',
        fontSize: '15px'
    },
    uploadButtons: {
        display: 'flex',
        justifyContent: 'center',
    },
    center: {
        textAlign: 'center',
        color: '#0071e9',
        textTransform: 'capitalize',
        fontFamily: 'Roboto, Arial',
        fontSize: 20,
        padding: 5,
        paddingTop: 30
    },
    btn: {
        cursor: 'pointer',
        color: '#0071e9',
        backgroundColor: 'white',
        border: 'solid 1px #0071ef',
        height: '45px',
        width: '100px',
        textTransform: 'capitalize',
        fontSize: '15px',
        margin: 20
    }
});
