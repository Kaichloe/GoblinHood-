import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "1D",
      oneYearData: {},
      oneMonthData: {},
      threeMonthData: {},
      fiveYearData: {},
      oneDayData: {},
      fiveDayData: {},
      stockPrices: {},
      currentBuyingPower: 0,
      // price: 0,
      openPrice: 0,
      // defaultPrice: 0,
    };

    this.priceChange = this.priceChange.bind(this);
    this.percentChange = this.percentChange.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.customToolTip = this.customToolTip.bind(this);
  }

  componentDidMount() {
    let currentBuyingPower = this.props.balance;
    let initBuyingPower = parseFloat(
      currentBuyingPower + this.props.initStockValue
    ).toFixed(2);
    let owned_stocks = Object.keys(this.props.ownedStocks);

    this.setState({ defaultPrice: initBuyingPower });
    this.setState({ price: initBuyingPower });
    this.setState({ currentBuyingPower: currentBuyingPower });

    if (owned_stocks) {
      this.props
        .fetchBigPriceData(owned_stocks)
        .then((data) => this.setState({ stockPrices: data.bigPriceData }))
        .then(() => this.setState({ time: "1D" }));
    }
  }

  handlePortfolioValue() {
    let Chartdata = {};
    let ownedStocks = this.props.ownedStocks;

    Object.entries(this.state.stockPrices).map((stockPriceArr) => {
      let ticker = stockPriceArr[0];
      let stockPrices = stockPriceArr[1].chart;
      let nullReplacement;
      stockPrices = stockPrices.map((price) => {
        if (price.close !== null) {
          nullReplacement = price.close;
          return price;
        } else {
          price.close = nullReplacement;
          return price;
        }
      });
      let stockFiltered = stockPrices.filter((data) => data !== undefined);
      stockFiltered.map((stock) => {
        let formattedDate = `${stock.label} ${stock.date}`;
        let totalPrice = stock.close * ownedStocks[ticker];
        Chartdata[formattedDate] = {
          date: stock.date,
          price:
            Chartdata[formattedDate] === undefined
              ? totalPrice + this.state.currentBuyingPower
              : parseFloat(
                  (Chartdata[formattedDate]["price"] += totalPrice.toFixed(2))
                ),
          formattedDate,
        };
      });
    });

    let allData = Object.values(Chartdata);
    return allData.map((data, i) => Object.assign(data, { i }));
  }

  priceChange() {
    let change = Number((this.state.price - this.state.defaultPrice).toFixed(2).toLocaleString());

    if (change > 0) {
      return `+$${change}`;
    } else {
      return `-$${change}`;
    }
  }

  percentChange() {
    let percent = (
      ((this.state.price - this.state.defaultPrice) / this.state.defaultPrice) *
      100
    ).toFixed(2);

    if (percent > 0) {
      return `[+${percent}%]`;
    } else {
      return `[-${percent}%]`;
    }
  }

  customToolTip(e) {
    return <div className="graph-tooltip">{e.formattedDate}</div>;
  }

  handleLeave() {
    let defaultPrice = this.state.defaultPrice;
    this.setState({ price: defaultPrice });
  }

  handleMove(e) {
    // if (
    //   e.activePayload !== undefined &&
    //   e.activePayload !== null &&
    //   e.activePayload[0].payload.close !== null
    // ) {
    //   this.setState({ price: e.activePayload[0].payload.price.toFixed(2) });
    // }
    this.setState({
      price: parseFloat(e.activePayload[0].payload.price.toFixed(2)),
    });
    e.isTooltipActive = true;
    console.log(e);
  }

  customTooltip(e) {
    if (e.label !== undefined) {
      return <div>{e.label}</div>;
    }
  }

  render() {
    let ticker = "AAPL";
    let owned_stocks = this.props.ownedStocks;
    let data = this.handlePortfolioValue();
    let last = data.slice(-1)[0];
    let color = "#21ce99";
    // let color;
    // if (
    //   data !== undefined &&
    //   parseFloat(this.props.balance + this.props.initStockValue).toFixed(2) <
    //     last.price
    // ) {
    //   color = "#ff0000";
    // } else {
    //   color = "#21ce99";
    // }

    const profileChart = (
      <ResponsiveContainer>
        <LineChart
          margin={{ top: 40, right: 30, left: 30, bottom: 50 }}
          data={data}
          onMouseMove={this.handleMove}
          onMouseLeave={this.handleLeave}
        >
          <Line
            type="linear"
            dataKey="price"
            stroke={color}
            connectNulls={true}
            strokeWidth={2}
            dot={false}
          />
          <XAxis
            dataKey="formattedDate"
            hide={true}
            allowDataOverflow={false}
          />
          <YAxis domain={["dataMin", "dataMax"]} hide={true} />
          <Tooltip
            // contentStyle={{ border: "0", backgroundColor: "transparent" }}
            // // active={true}
            // position={{ y: 1 }}
            // formatter={(value, name, props) => {
            //   return [""];
            // }}

            position={{ y: 0 }}
            offset={-50}
            isAnimationActive={false}
            content={this.customToolTip}
            wrapperStyle={{ top: -10 }}
            // isAnimationActive={false}
            // cursor={{ stroke: "Gainsboro", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );

    return (
      <div className="StockPage">
        <h3 className="stockname">${Number(this.state.price).toLocaleString()}</h3>

        {/* <div id="price" className="stock-price">
          ${this.state.price}
        </div> */}
        <div className="stock-change-container">
          <div className="stock-change">
            {/* ${(this.state.price - this.state.openPrice).toFixed(2)} */}
            {this.priceChange()}
          </div>
          <div className="stock-change-percent">{this.percentChange()}</div>
        </div>

        <div className="StockChart">{profileChart}</div>

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
          {/* <button onClick={() => console.log(this.state)}>test</button>
          <button
            onClick={() => console.log(Object.entries(this.state.stockPrices))}
          ></button>
          <button onClick={() => console.log(owned_stocks[ticker])}></button>
          <button onClick={() => console.log(last)}></button> */}
        </div>
      </div>
    );
  }
}

export default PortfolioChart;