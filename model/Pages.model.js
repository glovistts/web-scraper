module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        page_link: String,
        page_title: String,
        page_html: String,
        page_domain:String,
      }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const pages = mongoose.model("pages", schema);
    return pages;
  };