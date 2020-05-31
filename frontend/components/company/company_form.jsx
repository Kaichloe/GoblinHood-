import React from 'react';

class CompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      basics: {},
      keyStats: {},
    };
  }

  componentDidMount() {
    this.props
      .fetchCompanyBasics(this.props.symbol)
      .then((res) => this.setState(res));
    this.props
      .fetchCompanyKeyStats(this.props.symbol)
      .then((res) => this.setState(res));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.symbol !== this.props.match.params.symbol) {
      this.props
        .fetchCompanyBasics(this.props.match.params.symbol)
        .then((res) => this.setState(res));
      this.props
        .fetchCompanyKeyStats(this.props.match.params.symbol)
        .then((res) => this.setState(res));
    }
  }

  formatNumber(num) {
    const _suffix = ["K", "M", "B", "T"];
    if (num > 1000) {
      let i = 0;
      while (num > 1000) {
        num /= 1000;
        i += 1;
      }
      return `${num.toFixed(2)}${_suffix[i - 1]}`;
    } else {
      return num;
    }
  }

  render() {
    let employees = this.state.basics.employees;
    return (
      <div className="company-info">
        <div className="company-about-header">
          <p className="about-title">About</p>
        </div>
        <div className="company-about">
          <p>{this.props.stats.description}</p>
        </div>

        <div className="company-stats">
          <div className="info-col1">
            <div>
              <div className="subrow-title">CEO</div>
               <span className="inner-stat">
              {this.state.basics.CEO}
               </span>
            </div>
            <br/>
            <div>
              <div className="subrow-title">P/E Ratio</div>
               <span className="inner-stat">
              {this.state.keyStats.peRatio}
               </span>
            </div>
          </div>
          <div className="info-col2">
            <div>
              <div className="subrow-title">Employees</div>
              <span className="inner-stat">
                {this.formatNumber(employees)}
              </span>
            </div>
            <br/>
            <div>
              <div className="subrow-title">Average Volume</div>
               <span className="inner-stat">
              {this.formatNumber(this.state.keyStats.avg10Volume)}
              </span>
            </div>
          </div>
          <div className="info-col3">
            <div>
              <div className="subrow-title">Headquarters</div>
              <span className="inner-stat">
                {this.state.basics.city}, {this.state.basics.state}
              </span>
            </div>
            <br/>
            <div>
              <div className="subrow-title">52 Week High</div>$
               <span className="inner-stat">
              {this.state.keyStats.week52high}
              </span>
            </div>
          </div>

          <div className="info-col4">
          <div>
            <div className="subrow-title">Market Cap</div>
             <span className="inner-stat">
            {this.formatNumber(this.state.keyStats.marketcap)}
            </span>
          </div>
          <br/>
            <div>
              <div className="subrow-title">52 Week Low</div>
               <span className="inner-stat">
              ${this.state.keyStats.week52low}
               </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyForm;