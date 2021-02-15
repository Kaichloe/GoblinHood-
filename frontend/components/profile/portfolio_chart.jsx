import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

class PortfolioChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: "1D",
      stockPrices: {},
      currentBuyingPower: 0,
      openPrice: 0,
    };

    this.priceChange = this.priceChange.bind(this);
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
      return `$${change}`;
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
    this.setState({
      price: parseFloat(e.activePayload[0].payload.price.toFixed(2)),
    });
    e.isTooltipActive = true;
  }

  customTooltip(e) {
    if (e.label !== undefined) {
      return <div>{e.label}</div>;
    }
  }

  render() {
    let owned_stocks = this.props.ownedStocks;
    let data = this.handlePortfolioValue();
    let last = data.slice(-1)[0];
    let color = "#21ce99";

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
            position={{ y: 0 }}
            offset={-50}
            isAnimationActive={false}
            content={this.customToolTip}
            wrapperStyle={{ top: -10 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );

    return (
      <div className="StockPage">
        <h3 className="stockname">${Number(this.state.price).toLocaleString()}</h3>

        <div className="stock-change-container">
          <div className="stock-change">
            {this.priceChange()}
          </div>

        </div>

        <div className="StockChart">{profileChart}</div>
      </div>
    );
  }
}

export default PortfolioChart;