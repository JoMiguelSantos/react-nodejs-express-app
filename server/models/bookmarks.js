class Bookmarks {
  constructor() {
    this.bookmarks = [];
  }

  get bookmarks() {
    return this.bookmarks;
  }

  addBookmark(newBookmark) {
    this.bookmarks = [...this.bookmarks, newBookmark];
  }
}

module.exports = Bookmarks;
// then I should instanciate a new Bookmarks in the DB file possibly
// a use that throughout the server session
