// components/invoice/DownloadInvoiceButton.jsx
import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./InvoiceDocument";
import { FaFilePdf } from "react-icons/fa6";
// import InvoiceDocument from "./InvoiceDocument";

const DownloadInvoiceButton = ({ booking }) => {
  return (
    <PDFDownloadLink
      document={<InvoiceDocument booking={booking} />}
      fileName={`invoice_${booking._id}.pdf`}
    >
      {({ loading }) =>
        loading ? (
          <button className="btn btn-sm btn-disabled">Loading PDF...</button>
        ) : (
          <button ><FaFilePdf size={30} /></button>
        )
      }
    </PDFDownloadLink>
  );
};

export default DownloadInvoiceButton;
