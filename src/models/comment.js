export default class Comment {
  constructor(commentData) {
    this.id = commentData[`id`];
    this.text = commentData[`comment`];
    this.emoji = commentData[`emotion`] + `.png`;
    this.author = commentData[`author`];
    this.date = commentData[`date`];

  }

  toRAW() {
    this.emoji = this.emoji.split(`.`)[0];
    return {
      "comment": this.text,
      "date": this.date,
      "emotion": this.emoji
    };
  }


  static parseComment(commentData) {
    return new Comment(commentData);
  }

  static parseComments(comments) {
    return comments.map((comment) => Comment.parseComment(comment));
  }


  static clone(data) {
    return new Comment(data.toRAW());
  }

}
