import React, { useState } from "react";
import "./VoteTool.css";
import Draggable from "react-draggable";

function VoteTool() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [isPollCreated, setIsPollCreated] = useState(false);

  const addOption = () => {
    if (newOption.trim()) {
      setOptions([...options, newOption]);
      setVotes([...votes, 0]);
      setNewOption("");
    }
  };

  const createPoll = () => {
    if (question.trim() && options.length > 0) {
      setIsPollCreated(true);
    }
  };

  const submitVote = (index) => {
    const newVotes = [...votes];
    newVotes[index] += 1;
    setVotes(newVotes);
  };

  return (
    <Draggable>
      <div className="vote-tool">
        {!isPollCreated ? (
          <>
            <input
              type="text"
              className="vote-tool__question-input"
              placeholder="Enter your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <div className="vote-tool__add-option">
              <input
                type="text"
                className="vote-tool__option-input"
                placeholder="Add an option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
              />
              <button className="vote-tool__add-btn" onClick={addOption}>
                Add Option
              </button>
            </div>

            <div className="vote-tool__options-preview">
              {options.map((option, index) => (
                <div key={index} className="vote-tool__option-preview">
                  {option}
                </div>
              ))}
            </div>

            <button className="vote-tool__create-btn" onClick={createPoll}>
              Create Poll
            </button>
          </>
        ) : (
          <>
            <h2 className="vote-tool__question">{question}</h2>

            <div className="vote-tool__options">
              {options.map((option, index) => (
                <div key={index} className="vote-tool__option">
                  <button
                    className="vote-tool__vote-btn"
                    onClick={() => submitVote(index)}
                  >
                    {option}
                  </button>
                  <span className="vote-tool__vote-count">
                    {votes[index]} votes
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Draggable>
  );
}

export default VoteTool;
