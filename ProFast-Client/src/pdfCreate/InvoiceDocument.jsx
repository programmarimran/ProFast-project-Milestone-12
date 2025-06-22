// components/invoice/InvoiceDocument.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// স্টাইল
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  section: {
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  line: {
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});

const InvoiceDocument = ({ booking }) => {
  const {
    userName,
    userEmail,
    takingDate,
    serviceStatus,
    serviceName,
    serviceId,
    serviceArea,
    providerName,
    providerEmail,
    price,
    _id,
  } = booking;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>HireNest Invoice</Text>

        <View style={styles.section}>
          <Text>Invoice ID: {_id}</Text>
          <Text>Service ID: {serviceId}</Text>
          <Text>Date: {takingDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Customer Info:</Text>
          <Text>Name: {userName}</Text>
          <Text>Email: {userEmail}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.bold}>Service Details:</Text>
          <Text>Service: {serviceName}</Text>
          <Text>Provider: {providerName}</Text>
          <Text>Email: {providerEmail}</Text>
          <Text>Location: {serviceArea}</Text>
          <Text>Price: ${price}</Text>
          <Text>Status: {serviceStatus}</Text>
        </View>

        <View style={styles.line}></View>
        <Text>Thank you for using HireNest!</Text>
      </Page>
    </Document>
  );
};

export default InvoiceDocument;
