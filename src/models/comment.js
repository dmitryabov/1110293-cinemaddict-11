export default class Comment {
  constructor(commentData) {
    this.id = commentData[`id`];
    this.text = commentData[`comment`];
    this.emoji = commentData[`emotion`] + `.png`;
    this.author = commentData[`author`];
    this.date = commentData[`date`];

  }


  static parseComment(commentData) {
    return new Comment(commentData);
  }

  static parseComments(comments) {
    return comments.map((comment) => Comment.parseComment(comment));
  }


  static toRaw(comment) {
    if (comment.id) {
      return {
        'id': comment.id,
        'author': comment.author,
        'comment': comment.text,
        'date': comment.date,
        'emotion': comment.emoji
      };
    } else {
      return {
        'comment': comment.text,
        'date': comment.date,
        'emotion': comment.emoji
      };
    }
  }

}
