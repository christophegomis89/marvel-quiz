import React, { useState, useEffect } from "react";
import { BsTrophy } from "react-icons/bs";
import Loader from "../Loader";
import Modal from "../Modal";

const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const {
    levelNames,
    score,
    maxQuestions,
    levelQuiz,
    percent,
    loadLevelQuestions,
  } = props;

  const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;

  const hash = "hash = f9f7cb83f4a704b9e45f028b3e1b7b7f;";
  useEffect(() => {
    setAsked(ref.current);
  }, [ref]);

  const showModal = (id) => {
    setOpenModal(true);
  };
  const hideModal = () => {
    setOpenModal(false);
  };
  const averageGrade = maxQuestions / 2;

  const decision =
    score >= averageGrade ? (
      <>
        <div className="stepsBtnContainer">
          {levelQuiz < levelNames.length ? (
            <>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestions(levelQuiz)}
              >
                Niveau suivant
              </button>
            </>
          ) : (
            <>
              <p className="successMsg">
                <BsTrophy />
                Bravo vous êtes un expert!
              </p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestions(0)}
              >
                Accueil
              </button>
            </>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite:{percent}%</div>
          <div className="progressPercent">
            Notes:{score}/{maxQuestions}{" "}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué!</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">
            Notes: {score}/{maxQuestions}
          </div>
        </div>
      </>
    );

  const questionAnswer =
    score >= averageGrade ? (
      asked.map((question) => {
        return (
          <tr key={question.id}>
            <td>{question.question}</td>
            <td>{question.answer}</td>

            <td>
              <button
                onClick={() => showModal(question.heroId)}
                className="btnInfo"
              >
                Infos
              </button>
            </td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="3">
          <Loader
            loadingMsg={
              "Les réponses ne sont chargé que si vous avez la moyenne"
            }
            styling={{ textAlign: "center", color: "red" }}
          />
        </td>
      </tr>
    );

  return (
    <>
      {decision}
      <hr />
      <p>Les réponses aux questions posées!</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponses</th>
              <th>Infos</th>
            </tr>
          </thead>
          <tbody>{questionAnswer}</tbody>
        </table>
        <Modal showModal={openModal} hideModal={hideModal}>
          <div className="modalHeader">
            <h2>Titre</h2>
          </div>
          <div className="modalBody">
            <h4>Titre 2</h4>
          </div>
          <div className="modalFooter">
            <button className="modalBtn">X</button>
          </div>
        </Modal>
      </div>
    </>
  );
});
export default React.memo(QuizOver);
