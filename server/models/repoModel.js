class Repos {
  constructor() {
    this.repos = [];
  }

  bookmarkedRepos(bookmarks) {
    return this.repos.filter(repo => {
      if (bookmarks.includes(repo.id)) return true;
      return false;
    });
  }
}

module.exports = new Repos();
