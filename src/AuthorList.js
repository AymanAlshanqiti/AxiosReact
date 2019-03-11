import React, { Component } from "react";
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";

class AuthorList extends Component {
  render() {
    const auther = this.props.authors.map(author => {
      return (
        <div className="col-lg-4 col-md-6 col-12">
          <AuthorCard
            author={author}
            key={`${author.first_name} ${author.last_name}`}
            selectAuthor={this.props.selectAuthor}
          />
        </div>
      );
    });
    return (
      <div className="authors">
        <h3>Authors</h3>
        <SearchBar filterAuthors={this.props.filterAuthors} />
        <div className="row">{auther}</div>
      </div>
    );
  }
}

export default AuthorList;
