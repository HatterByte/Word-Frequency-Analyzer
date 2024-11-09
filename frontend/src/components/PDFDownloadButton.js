import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFDownloadButton = ({ elementId }) => {
    const handleDownloadPDF = async () => {
        const reportElement = document.getElementById(elementId);
        const canvas = await html2canvas(reportElement, {
            scale: 3,
            useCORS: true,

        });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > pageHeight) {
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, pageHeight - 20);
        } else {
            pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        }
        pdf.save('word-frequency-report.pdf');
    };

    return (
        <button onClick={handleDownloadPDF}>Download Report as PDF</button>
    );
};

export default PDFDownloadButton;
