import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class ECA extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      rule: 126,
      ruleMap: Array(8),
      history: [],
      view: [],
      iteration: 1,
      viewIter: 1,
      nRow: 40,
      nCell: 80
    };

    let nRow = this.state.nRow;
    let nCell = this.state.nCell;

    // create initial state 
    const seed = Array(nCell).fill(0);
    seed[Math.floor(nCell / 2)] = 1;

    // add to history
    this.state.history[0] = seed;

    // create view array
    this.state.view[0] = seed;
    for (let i=1; i<nRow; i++) {
      this.state.view.push(Array(nCell).fill(0));
    }

    // create ruleMap
    for (let i=0; i<8; i++) {
      this.state.ruleMap[i] = Math.floor(this.state.rule / 2**i) % 2;
    }

    this.forward = this.forward.bind(this);
    this.rewind = this.rewind.bind(this);
  }

  forward(steps=1) {
    let iteration = this.state.iteration;
    let viewIter = this.state.viewIter;
    let history = this.state.history;
    let view = this.state.view;
    const nRow = this.state.nRow;
    let currState = history[history.length-1];
    let nextState = currState.slice();

    for (let i=0; i<steps; i++) {
      // if viewIter == iteration, calcNext
      // else, update viewIter and view
      if (viewIter == iteration) {
        // calculate the next state 
        for (let i=0; i<currState.length; i++) {
          let hood = [];

          // left 
          if (i === 0) {
            hood[0] = currState[currState.length-1];
          } else {
            hood[0] = currState[i-1];
          }
          // center
          hood[1] = currState[i];
          // right
          if (i === currState.length-1) {
            hood[2] = currState[0];
          } else {
            hood[2] = currState[i+1];
          }

          // calculate nextState[i]
          // hood -> [binary to dec] -> ruleIndex -> [ruleMap] -> nextState[i]
          let ruleIndex = hood[0]; 
          ruleIndex += hood[1]*2;
          ruleIndex += hood[2]*4;
          nextState[i] = this.state.ruleMap[ruleIndex];
        }

        // update local vars
        if (iteration < nRow) {
          view[iteration] = nextState;
        } else {
          view = view.slice(1).concat([nextState]);
        }
        history = history.concat([nextState]);
        currState = history[history.length-1];
        nextState = currState.slice();

        iteration += 1;
        viewIter += 1;
      } else {
        viewIter += 1;
        view = history.slice(viewIter - nRow, viewIter);
      }
    }

    this.setState({
      view: view,
      history: history,
      viewIter: viewIter,
      iteration: iteration
    });
  }

  rewind(steps=1) {
    let viewIter = this.state.viewIter;
    let history = this.state.history;
    let view = this.state.view;
    const nRow = this.state.nRow;

    for (let i=0; i<steps; i++) {
      if (viewIter > nRow) {
        viewIter -= 1;
        view = history.slice(viewIter - nRow, viewIter);
      }
    }

    this.setState({
      view: view,
      viewIter: viewIter
    });
  }

  JumpToStart() {
    let history = this.state.history;
    const nRow = this.state.nRow;
    const viewIter = this.state.viewIter;

    if (viewIter > nRow) {
      this.setState({
        view: history.slice(0, nRow),
        viewIter: nRow
      });
    }
  }

  JumpToEnd() {
    let history = this.state.history;
    const nRow = this.state.nRow;
    const viewIter = this.state.viewIter;

    if (viewIter >= nRow) {
      this.setState({
        view: history.slice(history.length-nRow, history.length),
        viewIter: history.length
      });
    }
  }

  ruleChange(newRule) {
    let ruleMap = this.state.ruleMap;
    
    // update ruleMap
      for (let i=0; i<8; i++) {
        ruleMap[i] = Math.floor(newRule / 2**i) % 2;
      }
    this.setState({
      rule: parseInt(newRule),
      ruleMap: ruleMap
    });
  }

  reset() {
    const history = this.state.history;
    const nRow = this.state.nRow;
    const nCell = this.state.nCell;

    let newHist = history.slice(0, 1);
    let newView = history.slice(0, 1);
    for (let i=1; i<nRow; i++) {
      newView[i] = Array(nCell).fill(0);
    }

    this.setState({
      history: newHist,
      iteration: 1,
      viewIter: 1,
      view: newView
    });
  }

  changeSquare(j) {
    const viewIter = this.state.viewIter;
    const nRows = this.state.nRows;
    let view = this.state.view;
    let history = this.state.history;
    let currState = history[history.length-1];


    // change the jth button in the row at i == buttonsIndex
    let buttonsIndex = Math.min(this.state.viewIter-1, this.state.nRows-1);
    // modify history and view
    currState[j] = 1 ^ currState[j];

    view[buttonsIndex] = currState;
    history[history.length-1] = currState;

    this.setState({
      history: history,
      view: view
    });
  }



  render() {
    return (
      <div className="content-wrapper">
        <div className="grid">
          <Grid
            view={this.state.view}         
            viewIter={this.state.viewIter}
            iteration={this.state.iteration}
            onClick={(j) => this.changeSquare(j)}
          />
        </div>
        <div className="button-wrapper clearfix">
          <div className="formContainer">
            <RuleForm
              onSubmit={(newRule) => this.ruleChange(newRule)}
            />
          </div>
          <Button 
            className="controlButton"
            label="Next"
            onClick={() => this.forward()}
          />
          <Button
            className="controlButton"
            label="Back"
            onClick={() => this.rewind()}
          />
          <Button
            className="controlButton"
            label="Next 10"
            onClick={() => this.forward(10)}
          />
          <Button
            className="controlButton"
            label="Back 10"
            onClick={() => this.rewind(10)}
          />
          <Button
            className="controlButton"
            label="Jump to start"
            onClick={() => this.JumpToStart()}
          />
          <Button
            className="controlButton"
            label="Jump to end"
            onClick={() => this.JumpToEnd()}
          />
          <Button
            className="controlButton"
            label="Reset"
            onClick={() => this.reset()}
          />
        </div>
        <div className="infoContainer">
          <table>
            <tr>
              <td>Rule:</td>
              <td>{this.state.rule}</td>
            </tr>
            <tr>
              <td>Gens:</td>
              <td>{this.state.iteration}</td>
            </tr>
            <tr>
              <td>Index:</td>
              <td>{this.state.viewIter}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

class Grid extends React.Component {
  renderSquares() {
    const rows = this.props.view.length;
    const cols = this.props.view[0].length;
    const viewIter = this.props.viewIter;
    const iteration = this.props.iteration;

    let gridList = [];

    for (let i=0; i<rows; i++) {
      let rowList = []
      let buttonsIndex = Math.min(viewIter-1, rows-1);

      // condition for making a button row
      if (((viewIter == iteration)) && (i == buttonsIndex)) {
        // insert a row of buttons
        for (let j=0; j<cols; j++) {
          rowList.push(
            <ButtonSquare
              key={(i*10 + j).toString()}
              alive={this.props.view[i][j]}
              onClick={() => this.props.onClick(j)}
            />
          );
        }
      } else {
        // make non-clickable square row
        for (let j=0; j<cols; j++) {
          rowList.push(
            <Square
              key={(i*10 + j).toString()}
              alive={this.props.view[i][j]}
            />
          );
        }
      }

      gridList.push(<div className="row">{rowList}</div>);
    }

    return (gridList);
  }

  render() {
    return (this.renderSquares());
  }
}

function Square(props) {
  let color = props.alive? "#ff5638": "white";
  return (
    <div 
      className="square"
      style={{
        "background-color": color, 
        "box-sizing": "border-box"
      }}
    >
    </div>
  );
}

class ButtonSquare extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        className="buttonSquare"
        style={{"background-color": this.props.alive? "#ff5638": "#e0e0e0"}}
        onClick={this.props.onClick}
      >
      </button>
    );
  }
}


function Button(props) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

class RuleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "126"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // pass this.state.value into a function passed as a prop that updates ECA state
    this.props.onSubmit(this.state.value);
    event.preventDefault();
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Rule=  
          <input type="text" value={this.state.value} style={{width: "40px"}} onChange={this.handleChange} />
        </label>
          <input type="submit" value="submit" />
      </form>
    );
  }
}




ReactDOM.render(
  <ECA />,
  document.getElementById('root')
);
	















