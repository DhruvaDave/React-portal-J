import React from "react";
import "./style.css";

export default function BattleCard({ warData }) {
  const { name, attacker_king, defender_king } = warData;
  return (
    <div className="card-container">
      <p className="card-title">{name}</p>
      <div className="fighter-name-container">
        <div className="fighter-description">
          <h3>Attacker</h3>
          <p className="attacker-name">{attacker_king}</p>
        </div>
        <div className="fighter-description">
          <h3>Defender</h3>
          <p className="defender-name">{defender_king}</p>
        </div>
      </div>
    </div>
  );
}
