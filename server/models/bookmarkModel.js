class Bookmarks {
  constructor() {
    this.bookmarks = [];
  }

  get getBookmarks() {
    return this.bookmarks;
  }

  addBookmark(newBookmark) {
    this.bookmarks = [...this.bookmarks, newBookmark];
  }

  delBookmark(delBookmark) {
    this.bookmarks = this.bookmarks.filter(bookmark => {
      if (bookmark === delBookmark) return false;
      return true;
    });
  }
}

module.exports = new Bookmarks();
