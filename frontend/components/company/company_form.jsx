import React from 'react';

class CompanyForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      
    }
  }

  componentDidMount(){
    this.props.fetchCompanyBasics(this.props.symbol).then(res=> this.setState(res))
    this.props.fetchCompanyKeyStats(this.props.symbol).then(res => this.setState(res))
  }

  render (){

    // let about = [];
    // this.props.basics.forEach()
    return (
      <div className="company-info">
        <div className="company-about-header">About</div>
        <div className="company-about">
          <p>{this.props.stats.description}</p>
        </div>

        <div className="company-stats">
          <div className="info-row1">
            <div>
              <div className="subrow-title">CEO</div> <br />
              <p>{this.props.stats.CEO}</p>
            </div>
            <div>
              <div className="subrow-title">Employees</div> <br />
              {this.props.stats.employees}
            </div>
            <div>
              <div className="subrow-title">Headquarters</div> <br />
              <span>
                {this.props.stats.city}, {this.props.stats.state}
              </span>
            </div>
            <div>
              <div className="subrow-title">Market Cap</div> <br />
              {this.props.stats.marketCap}
            </div>
          </div>

          <div className="info-row2">
            <div>
              <div className="subrow-title">Price to Earning Ratio</div> 
              {this.props.stats.peRatio}
            </div>
            <div>
              <div className="subrow-title">Average Volume</div> 
              {this.props.stats.avg10Volume}
            </div>
            <div>
              <div className="subrow-title">52 Week High</div> 
              {this.props.stats.week52high}
            </div>
            <div>
              <div className="subrow-title">52 Week Low</div> 
              <p>{this.props.stats.week52low}</p>
            </div>
          </div>
        </div>
        <button onClick={() => console.log(this.props.stats)}></button>
      </div>
    );
  }
}

export default CompanyForm;