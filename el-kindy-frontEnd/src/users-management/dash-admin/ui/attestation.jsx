import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import logoImage from "../../../../public/assets/img/logo.png";
import { getQuizzesAndScoresByUserId } from "../../../quizes-management/services/apiQuiz";
import axios from "axios";

const getCurrentDate = () => {
  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("fr-FR", options);
};
const Attestation = ({}) => {
  const currentDate = getCurrentDate();

  const [quizzesWithScores, setQuizzesWithScores] = useState([]);
  const { userId } = useParams();
  const [fullName, setFullName] = useState("");
  const [quizDetails, setQuizDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/quizs/${userId}/attestation`
      );
      const data = await response.json();
      setQuizDetails(data);
    };

    fetchData();
  }, []);
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      justifyContent: "center",
      padding: 30,
    },
    section: {
      padding: 30,
      flexGrow: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    titleContainer: {
      flexDirection: "row",
      alignItems: "center", // Aligner les éléments verticalement
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center", // Centrer le texte
    },
    logo: {
      width: 50,
      height: 50,
      marginLeft: 20, // Espace à gauche du logo
      marginRight: 20, // Espace à droite du logo
    },
    text: {
      fontSize: 16,
      marginBottom: 10,
      lineHeight: 1.5,
      textAlign: "justify",
    },
    listItem: {
      marginBottom: 10,
    },
    button: {
      padding: 10,
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
      textDecoration: "none",
      display: "inline-block",
      textAlign: "center",
    },
    bottomInfoContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    rightAlignedText: {
      textAlign: "right",
    },
    leftAlignedText: {
      textAlign: "left",
    },
    space: {
      width: 450,
      display: "inline-block",
    },
    boldText: {
      fontWeight: "bold",
    },
    Image: {
      width: 200,
      height: 200,
      alignSelf: "center",
      marginBottom: 20,
    },
  });

  const levelsAndScores =
    quizDetails && quizDetails.quizDetails && quizDetails.quizDetails.length > 0
      ? quizDetails.quizDetails
          .map(
            (quiz, index) =>
              `Level: ${quiz.level} - Score: ${quiz.score}` +
              `,` +
              (index !== quizDetails.quizDetails.length - 1 ? "\n" : "")
          )
          .join("") +
        "\n" +
        "\n" // Ajouter une ligne vide à la fin
      : "Aucun détail de quiz disponible";

  //***/************ */ */
  const pdfContent = (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image style={styles.logo} src={logoImage} alt="Logo" />
          <Text style={styles.title}>
            Certificate of Musical Level Achievement
          </Text>
          <Image style={styles.logo} src={logoImage} alt="Logo" />
        </View>
      </View>
      <br />
      <br />
      <br />
      <br />
      <Text style={styles.text}>
        The El Kindy Music Conservatory, represented by [Director's Name],
        hereby certifies that{" "}
        <Text style={styles.boldText}> {quizDetails.fullName} </Text> has
        successfully traversed a remarkable path through various musical levels,
        demonstrating unwavering commitment and exceptional talent in their
        musical learning journey.
      </Text>
      <br />
      <br />
      <br />
      <Text style={styles.text}>
        We certify that
        {/* {user.fullname}  */}
        has successfully completed the following musical levels with
        distinction, accompanied by their respective scores:
      </Text>
      <br />
      <br />

      {/* <Text style={styles.text}>{listItems}</Text> */}

      <Text>{levelsAndScores}</Text>
      <br />
      <br />

      <Text style={styles.text}>
        In recognition of their outstanding achievements and commitment to
        musical excellence, we present them with this certificate along with our
        warmest congratulations.
      </Text>
      <br />
      <br />
      <Text>
        <br />
        <br />
        Fait à City olympique,Tunisia, <Text>{currentDate}</Text>
      </Text>
      <br />
      <br />
    </View>
  );

  return (
    <div className="container-attestation">
      <div className="pdf-content">
        {/* <h2>Contenu PDF :</h2> */}
        {pdfContent}
      </div>
      <div className="buttonWrapper-attestation">
        <PDFDownloadLink
          document={
            <Document>
              <Page size="A3" style={styles.page}>
                {pdfContent}
              </Page>
            </Document>
          }
          fileName="attestation.pdf"
        >
          {({ blob, url, loading, error }) => (
            <button className="button-attestation">
              {loading ? "Chargement du PDF..." : "Télécharger en PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default Attestation;
