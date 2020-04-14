import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { withRouter } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import moment from 'moment';

class ChartForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "5y",
      fiveYearData: {},
      
    };
    this.customToolTip = this.customToolTip.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchPriceData(this.props.symbol, "5y")
      .then((data) => this.setState({ fiveYearData: data }));
  }

  changeDate(range) {
    const symbol = this.props.symbol;
    switch (range) {
      case "1D":
        return this.props.fetchPriceData(symbol, "1d");
      case "1W":
        return this.props.fetchPriceData(symbol, "5dm");
      default:
        break;
    }
  }

  checker() {
    const button = document.getElementById("buttons");
    if ((button.style.color = "black")) {
      console.log(false);
    } else {
      console.log(true);
    }
  }

  // formatTime(time){
  //   time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
  // }

  // parseData(){
  //   let data = [];
  //   const button1 = document.getElementById('button-1')
  //   const button2 = document.getElementById('button-2')
  //   const button3 = document.getElementById('button-3')
  //   const button4 = document.getElementById('button-4')
  //   const button5 = document.getElementById('button-5')
  //   const allButtons = [button1, button2, button3];

  //   for (let i = 0; i < allButtons.length; i++) {
  //     if (allButtons[i].style.color === "#21ce99"){
  //       switch (allButton[i]) {
  //         case button1:

  //           break;
  //         case button3:
  //           this.props.company.forEach(el => {
  //             data.push({ date: `:${el.date}`, price: el.uClose })
  //           })
  //           return data
  //           break;
  //       }

  //     }

  //   }
  // }

  // parseData(){
  //   let data = [];
  //   let el = this.props.priceData;
  //   for (let i = 0; i < el.length; i++) {
  //     data.push({date: el[i].minute, price: el[i].close})
  //   }
  // }

  customToolTip(e) {
    let formatted
    if (this.state.time === "1d") {
      formatted = moment(e.label).format("LT");
    } else if (this.state.time === "1w") {
      formatted = moment(e.label).format("LLL");
    } else {
      formatted = moment(e.label).format("L");
    }
    return <div className="custom-tooltip">{formatted}</div>;
  }

  render() {
    let data = this.props.priceData;
    return (
      <div className="StockPage">
        <h3 className="stockname">{this.props.companyName}</h3>

        <div id="price-change" className="stock-price">
          $<Odometer value={5} />
        </div>

        <div className="StockChart">
          <LineChart width={600} height={300} data={data}>
            <Line
              type="linear"
              dataKey="close"
              stroke="#21CE99"
              connectNulls={true}
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" hide={true} allowDataOverflow={false} />
            <YAxis domain={["dataMin", "dataMax"]} hide={true} />
            <Tooltip
              position={{ y: 1 }}
              content={this.customToolTip}
            />
          </LineChart>
        </div>

        <div className="chart-buttons-container">
          <button
            id="button-1"
            className="chart-buttons"
            onClick={() => this.changeDate("1D")}
          >
            1D
          </button>
          <button
            id="button-2"
            className="chart-buttons"
            onClick={() => this.changeDate("1W")}
          >
            1W
          </button>
          <button
            id="button-3"
            className="chart-buttons"
            onClick={() => this.changeDate("1M")}
          >
            1M
          </button>
          <button
            id="button-3"
            className="chart-buttons"
            onClick={() => this.changeDate("3M")}
          >
            3M
          </button>
          <button
            id="button-4"
            className="chart-buttons"
            onClick={() => this.changeDate("1Y")}
          >
            1Y
          </button>
          <button
            id="button-5"
            className="chart-buttons"
            onClick={() => this.changeDate("5Y")}
          >
            5Y
          </button>
          <button onClick={() => console.log(this.props)}>TEST</button>
          <button onClick={() => console.log(this.state)}>TEST2</button>
          
        </div>

        {/* <form className="Stockbar">
          <h2>Buy {this.props.symbol}</h2>
            <label>Shares</label>
            <input 
              type="number"
              // value={this.state.shares}
              // onChange={this.update('shares')}
            />
            <div>
              <span>Market Price</span>
              <span>{}</span>
            </div>
        </form> */}
      </div>
    );
  }
}

export default withRouter(ChartForm);