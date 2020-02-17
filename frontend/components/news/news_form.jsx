import React from 'react';

class NewsForm extends React.Component{
  constructor(props){
    super(props)

  };
  
  componentDidMount(){
    this.props.fetchNews()
  }

  render(){
    debugger
    let articles; 
    if (this.props.news){
      debugger
      articles = this.props.news.map(el => <li key={}>{el.title}</li>)
    } else {
      articles = [];
    }
    
    return (
      <div>
        {
          articles 
        }
      </div>
    )
  }
};

export default NewsForm;
