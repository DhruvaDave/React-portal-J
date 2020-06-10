import React, { Component } from 'react';
import BattleCard from '../BattleCard';
import './style.css';

export default class ResultData extends Component {
  render() {
    const { warList } = this.props;
    console.log(warList);
    return (
      <div className="result-container">
        {warList.map((warData) => <BattleCard warData={warData} />)}
      </div>
    );
  }
}
