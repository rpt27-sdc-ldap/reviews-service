import React from "react";

const mockSuccessAjax = (data) => {
  let nameObject = {};
        for (let i = 0; i < data.length; i++) {
          let htmlReview = data[i].review.split('<br>');
          let htmlJoin = htmlReview.join("\n\n");
          data[i].review = htmlJoin;
          data[i].display = true;

          if (nameObject[data[i].reviewerName] === undefined) {
            nameObject[data[i].reviewerName] = 1;
          } else if (nameObject[data[i].reviewerName] === 1) {
            data.splice(i, 1)
          }
        }


        for (let i = 0; i < data.length; i++) {
          data.sort((a, b) => {
            return b.foundHelpful - a.foundHelpful;
          })
        }
        return data;
};

export default mockSuccessAjax;