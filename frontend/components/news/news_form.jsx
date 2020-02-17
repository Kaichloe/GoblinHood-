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
      return this.props.news.map(el => {
        return (
          
            <li>
              {el.title}
              {el.content}
            </li>
    
        )
      })
    }
  }

  render(){
    return (
      <ul>
        {this.displayNews()}
      </ul>
       
      
    )
  }
};

export default NewsForm;
