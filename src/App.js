import React,{Component} from 'react';
import PlayApp from './PlayApp/PlayApp'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sort: "",
      genre: "",
      error: null,
      apps: []
    }
  }
  setGenre(genre){
    this.setState({
      genre
    })
  }
  setSort(sort){
    this.setState({
      sort
    })
  }
  handleSubmit(e){
    e.preventDefault();
    console.log("searching")
    const url = "http://localhost:8000/apps";
    const params = []
    if (this.state.sort){
      params.push(`sort=${this.state.sort}`);
    }
    if (this.state.genre){
      params.push(`genre=${this.state.genre}`);
    }
    const query = params.join("&");
    const fetchUrl = `${url}?${query}`;
    console.log(fetchUrl);
     fetch(fetchUrl)
    .then(res=>{
      if (!res.ok){
        throw new Error(res.statusText)
      }
      return res.json();
    })
    .then(data=>{
      console.log(data);
      this.setState({
        apps: data
      })
    })
    .catch(err=>
      this.setState({error:'something went wrong'}))
  }
  render(){
    const results  = this.state.apps.map((app, i)=> {
     return <PlayApp {...app} key={i}/>
    });
    return (
      <main className='App'>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label htmlFor="genre">Genre:</label>
          <select id="genre" name="genre" onChange={e=>this.setGenre(e.target.value)}>
            <option>Select a genre</option>
            <option value="Action">Action</option>
            <option value="Adventure">Adventure</option>
          </select>
          <label htmlFor="sort">Sort By:</label>
          <select id="sort" name="sort" onChange={e=>this.setSort(e.target.value)}>
          <option value="">None</option>
          <option value="Rating">Rating</option>
          <option value="App">App</option>
          </select>
          <button type="submit">Search</button>
          <div className="error">{this.state.error}</div>
        </form>
        {results}
      </main>
    );
  }
}

export default App;