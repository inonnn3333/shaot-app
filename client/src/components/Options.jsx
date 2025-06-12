import React, {useState} from 'react'
import HtmlToPdf from './HtmlToPdf.jsx';
import html2pdf from 'html2pdf.js';


const Options = () => {
    // const [isOpen, setIsOpen] = useState(false);
    const handleDownloadPDF = () => {
            const element = document.getElementById('pdf-content');
            
            if (!element) {
                console.error("לא נמצא אלמנט עם id='pdf-content'");
                return;
            }
    
            html2pdf().from(element)
            .set({
                filename: 'דו״ח_שעות.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
            }).save();
        };

    return (
        <div className='options-container'>
            <div className='options-container-btns'>
                <button onClick={handleDownloadPDF}>
                    <img src="images/pdf-icon.png" alt="pdf-icon" />
                </button>
            </div>
            {/* {isOpen && 
                <div className='options-container-btns'>
                    <button onClick={handleDownloadPDF}>
                        <img src="images/pdf-icon.png" alt="pdf-icon" />
                    </button>
                </div>
            }
            <div className='option-container-open' onClick={() => setIsOpen(!isOpen)}>
                <button>
                    <img src="images/plus-icon.png" alt="plus-icon" />
                </button>
            </div> */}
            
            <HtmlToPdf />
        </div>
    )
}

export default Options;
