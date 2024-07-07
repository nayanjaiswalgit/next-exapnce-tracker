import formidable from 'formidable';
import fs from 'fs';
import pdf2json from 'pdf2json';

export const config = {
  api: {
    bodyParser: false,
  },
};
export async function POST(req,res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form data', err);
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }

    const { pdf } = files;

    if (!pdf || pdf.type !== 'application/pdf') {
      res.status(400).json({ error: 'Invalid or missing PDF file' });
      return;
    }

    const pdfParser = new pdf2json();
    pdfParser.loadPDF(pdf.path);

    pdfParser.on('pdfParser_dataError', (errData) => {
      console.error('Error while converting PDF to JSON:', errData);
      res.status(500).json({ error: 'Error converting PDF to JSON' });
    });

    pdfParser.on('pdfParser_dataReady', () => {
      const pdfData = pdfParser.getRawTextContent();
      // Here you can process the pdfData object as needed
      res.status(200).json({ pdfData });
    });
  });
}
