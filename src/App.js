import React, { Component } from "react";
import SideBar from "./SideBar";
import AuthorList from "./AuthorList";
import AuthorDetail from "./AuthorDetail";
import axios from "axios";
import Loading from "./Loading";

class App extends Component {
  state = {
    authors: [],
    currentAuthor: null,
    filterAuthors: [],
    loading: true
  };

  getAuthorsFromAPI = async () => {
    try {
      const authorsResponse = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/`
      );
      const authors = authorsResponse.data;
      this.setState({
        authors: authors,
        filterAuthors: authors,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  getView = () => {
    if (this.state.currentAuthor) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else {
      return (
        <AuthorList
          authors={this.state.filterAuthors}
          selectAuthor={this.selectAuthor}
          filterAuthors={this.filterAuthors}
        />
      );
    }
  };

  selectAuthor = async author => {
    this.setState({ loading: true });
    try {
      const authorResponse = await axios.get(
        `https://the-index-api.herokuapp.com/api/authors/${author.id}/`
      );
      const currectAuthor = authorResponse.data;
      this.setState({
        currentAuthor: currectAuthor,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  unselectAuthor = () => {
    this.setState({ currentAuthor: null });
  };

  filterAuthors = query => {
    this.setState({
      filterAuthors: this.state.authors.filter(author => {
        const authorName = `${author.first_name} ${
          author.last_name
        }`.toLowerCase();
        return authorName.includes(query.toLowerCase());
      })
    });
  };

  componentDidMount() {
    this.getAuthorsFromAPI();
  }

  render() {
    if (this.state.loading)
      return (
        <div className="my-4">
          <Loading />
        </div>
      );
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <SideBar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">{this.getView()}</div>
        </div>
      </div>
    );
  }
}

export default App;
