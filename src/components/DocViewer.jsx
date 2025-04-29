import React, { useState, useRef } from 'react';
import mammoth from 'mammoth';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './DocViewer.css';

const DocViewer = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDocFile, setIsDocFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);
    
    // Check if file is a Word document
    const isWordDoc = file.name.endsWith('.docx') || file.name.endsWith('.doc');
    setIsDocFile(isWordDoc);
    
    // Clear previous content
    setHtmlContent('');
  };

  const handleViewDocument = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) return;

    try {
      // Read the file as an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Convert the document to HTML
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const newHtmlContent = result.value;
      
      // Store the HTML content in state
      setHtmlContent(newHtmlContent);
      
      // Show the modal
      setShowModal(true);
    } catch (error) {
      console.error('Error converting document:', error);
      alert('Failed to convert document. Please try again with a valid Word file.');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="doc-viewer">
      <h2>Word Document Viewer</h2>
      
      <div className="upload-section">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".doc,.docx"
          className="file-input"
        />
        
        {fileName && (
          <div className="file-info">
            <p>Selected file: {fileName}</p>
            {isDocFile && (
              <button onClick={handleViewDocument} className="view-button">
                View Document
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Bootstrap Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div 
            className="document-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DocViewer;
