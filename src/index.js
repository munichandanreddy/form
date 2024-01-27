import React, { useState } from 'react';


const RuleForm = ({ onAddRule, onDeleteRule }) => {
  const [rule, setRule] = useState({
    key: '',
    output: {
      value: '',
      operator: '',
      score: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRule((prevRule) => ({
      ...prevRule,
      [name]: value
    }));
  };

  const handleOutputChange = (e) => {
    const { name, value } = e.target;
    setRule((prevRule) => ({
      ...prevRule,
      output: {
        ...prevRule.output,
        [name]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddRule(rule);
    setRule({
      key: '',
      output: {
        value: '',
        operator: '',
        score: ''
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="key" className="form-label">
          Rule Type
        </label>
        <select
          className="form-select"
          id="key"
          name="key"
          value={rule.key}
          onChange={handleInputChange}
        >
          <option value="age">Age</option>
          <option value="credit_score">Credit Score</option>
          <option value="account_balance">Account Balance</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="operator" className="form-label">
          Operator
        </label>
        <select
          className="form-select"
          id="operator"
          name="operator"
          value={rule.output.operator}
          onChange={handleOutputChange}
        >
          <option value=">">{'>'}</option>
          <option value="<">{'<'}</option>
          <option value=">=">{'>='}</option>
          <option value="<=">{'<='}</option>
          <option value="=">{'='}</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="value" className="form-label">
          Value
        </label>
        <input
          type="text"
          className="form-control"
          id="value"
          name="value"
          value={rule.output.value}
          onChange={handleOutputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="score" className="form-label">
          Score
        </label>
        <input
          type="text"
          className="form-control"
          id="score"
          name="score"
          value={rule.output.score}
          onChange={handleOutputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Rule
      </button>
      <button type="button" className="btn btn-danger ms-2" onClick={onDeleteRule}>
        Delete Rule
      </button>
    </form>
  );
};

const App = () => {
  const [rules, setRules] = useState([]);
  const [combinator, setCombinator] = useState('and');

  const handleAddRule = (rule) => {
    setRules((prevRules) => [...prevRules, rule]);
  };

  const handleDeleteRule = () => {
    setRules((prevRules) => prevRules.slice(0, -1));
  };

  const handleSubmit = () => {
    const output = {
      rules: rules.map(({ key, output }) => ({
        key,
        output
      })),
      combinator
    };

    // Display the output in the console for demonstration purposes
    console.log(output);
  };

  return (
    <div className="container mt-5">
      <h1>Expression Engine UI</h1>
      <div className="mb-3">
        <label htmlFor="combinator" className="form-label">
          Combinator
        </label>
        <select
          className="form-select"
          id="combinator"
          value={combinator}
          onChange={(e) => setCombinator(e.target.value)}
        >
          <option value="and">AND</option>
          <option value="or">OR</option>
        </select>
      </div>
      <RuleForm onAddRule={handleAddRule} onDeleteRule={handleDeleteRule} />
      <button type="button" className="btn btn-success mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default App;
