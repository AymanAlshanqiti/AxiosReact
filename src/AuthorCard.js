import React, { Component } from "react";

class AuthorCard extends Component {
  render() {
    const author = this.props.author;
    return (
      <div onClick={() => this.props.selectAuthor(author)} className="card">
        <div className="image">
          <img
            className="card-img-top img-fluid"
            src={author.imageUrl}
            alt={author.first_name + " " + author.last_name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            <span>{author.first_name + " " + author.last_name}</span>
          </h5>
          <small className="card-text">{author.books.length} books</small>
        </div>
      </div>
    );
  }
}

export default AuthorCard;
