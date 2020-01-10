export default class Comments {
  constructor(data) {

    this.id = data[`id`] || ``;
    this.name = data[`name`];
    this.comment = data[`comment`];
    this.date = data[`date`] || null;
  }

  toRAW() {
    return {
      'name': this.name,
      'comment': this.comment,
      'date': this.date ? this.date : null,
    };
  }
}
