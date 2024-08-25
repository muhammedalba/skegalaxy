

class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter() {
    // 1- filter product
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "limit", "fields", "sort", "keywords"];
    excludesFields.forEach((el) => delete queryStringObj[el]);

    // Apple filteration using {gte,lte,lt,gt}
    let queryStr = JSON.stringify(queryStringObj);
    // gte =>${gte}
    queryStr = queryStr.replace(/\b(gte|lte|lt|gt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    
    return this;
  }

  sort() {
    // 3- sorting
    // sort(price => 1=>9 || -price => 9=>1)
    if (this.queryString.sort) {
      // price,-sold =>[price -sold ]
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // fields=-title,-_id,-price, || -price -title _id
      const fields = this.queryString.fields.split(",").join(" ");
      // delet title _id price
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(keywords) {
    // 5- search
    if (this.queryString.keywords) {
      let query = {};
      if(keywords === 'products'){
           query.$or = [
        { title: { $regex: this.queryString.keywords, $options: "i" } },
        { description: { $regex: this.queryString.keywords, $options: "i" } },
      ];
     
      }
      if(keywords === 'users'){
             query.$or = [
          { firstname: { $regex: this.queryString.keywords, $options: "i" } },
          { lastname: { $regex: this.queryString.keywords, $options: "i" } },
        ];
      
      }
      if(keywords !== 'users' && keywords !== 'products'){
        query={name:{$regex:this.queryString.keywords, $options: "i"}}
      }
       
   
      this.mongooseQuery = this.mongooseQuery.find(query);
    
    }
    return this;
  }

  paginate(countDocuments) {
    // 2- pagination
    const page = +this.queryString.page * 1 || 1;
    const limit = +this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const endIndex = page * limit; // end index of pagination 1 * 10

    // paginate result
    const pogination = {};
    pogination.currentPage = page;
    pogination.limit = limit;
    pogination.numperOfPages = Math.ceil( countDocuments / limit);
    // next page
    if (endIndex < countDocuments) {
      pogination.nextPage = page + 1;
    }

    if (skip > 0) {
      pogination.prevPage = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.poginationResult = pogination;
 
  
    return this;
  }
}
module.exports = ApiFeatures;
