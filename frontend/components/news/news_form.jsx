import React from 'react';

class NewsForm extends React.Component{
  constructor(props){
    super(props)

  };
  
  componentDidMount(){
    this.props.fetchNews()
  }

  displayNews(){
    if (this.props.news === []){
      return []
    } else {
      return this.props.news.map((el, i) => {
       
        return (
          <div className="news-box" key={`el+${i}`} >
            <a className="news-link" href={el.url}></a>
            <div className="news-text">   
              <span className="news-source">{el.source.name}</span>
              <span className="news-title">{el.title}</span>
            </div>
            <img className="news-img" src={el.urlToImage}/>
          </div>
        )
      })
    }
  }

  render(){
    return (
      <div className="news-inner-container">
        <h1 className='news-title-main'>Recent News</h1>
        {this.displayNews()}
      </div>
    )
  }
};

export default NewsForm;
