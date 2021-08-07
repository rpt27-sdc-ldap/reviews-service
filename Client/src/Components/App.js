import React from "react";
import ReactDOM from "react-dom";
import "../../style/main.less";
import $ from 'jquery';
import ReviewBody from './reviewBody';
import SortBy from './sortBy';
import FilterBy from './filterBy';
import Nav from './nav';

//App componenet

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], carouselReviews: [], itemsToShow: 10, Audible: 'Audible', Canada: 'Canada', reviewBodyClass: 'defaultReview', readMoreDisplay: 'readMore', hideMeDisplay: 'hideHideMeButton'};
    this.reviewGetter = this.reviewGetter.bind(this);
    // this.carouselReviewsGetter = this.carouselReviewsGetter.bind(this);
    this.sortReviews = this.sortReviews.bind(this);
    this.showMore = this.showMore.bind(this);
    this.setAudibleClass = this.setAudibleClass.bind(this);
    this.setCanadaClass = this.setCanadaClass.bind(this);
    this.setReviewBodyClassToHidden = this.setReviewBodyClassToHidden.bind(this);
    this.setReviewBodyClassToShowReview = this.setReviewBodyClassToShowReview.bind(this);
  }

  setReviewBodyClassToHidden(id) {
    let newReviews = this.state.reviews.slice(0);
    for (let i = 0; i < newReviews.length; i++) {
      if (newReviews[i].reviewerId === id) {
        newReviews[i].readMoreDisplay = 'readMore';
        newReviews[i].hideMeDisplay = 'hideHideMeButton';
        newReviews[i].reviewBodyClass = 'defaultReview';
      }
    }
    this.setState({reviews: newReviews});
  }

  setReviewBodyClassToShowReview(id) {
    let newReviews = this.state.reviews.slice(0);
    for (let i = 0; i < newReviews.length; i++) {
      if (newReviews[i].reviewerId === id) {
        newReviews[i].readMoreDisplay = 'hideReadMoreButton';
        newReviews[i].hideMeDisplay = 'hideMe';
        newReviews[i].reviewBodyClass = 'reviewBodyText';
      }
    }
    this.setState({reviews: newReviews});
  }

  setAudibleClass () {
    this.setState({Audible: 'Audible', Canada: 'Canada'});
    this.setState({itemsToShow: 10});
    for (let i = 0; i < this.state.reviews.length; i++) {
      if (this.state.reviews[i].location === 'United States') {
        this.state.reviews[i].display = true;
      } else {
        this.state.reviews[i].display = false;
      }
    }
  }

  setCanadaClass () {
    this.setState({Audible: 'noDisplayAudible', Canada: 'displayCanada'});
    this.setState({itemsToShow: 10});
    for (let i = 0; i < this.state.reviews.length; i++) {
      if (this.state.reviews[i].location === 'Canada') {
        this.state.reviews[i].display = true;
      } else {
        this.state.reviews[i].display = false;
      }
    }
  }

  showMore () {
    let itemsToShow = this.state.itemsToShow + 10;
    this.setState({itemsToShow: itemsToShow});
  }

  sortReviews (e) {
    this.setState({itemsToShow: 10});
    if (e.target.value === 'mostHelpful') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        reviews.sort((a, b) => {
          return b.foundHelpful - a.foundHelpful;
        })
      }
      this.setState({'reviews': reviews});
    }
     if (e.target.value === 'mostRecent') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        reviews.sort((a, b) => {
          return Date.parse(b.date) - Date.parse(a.date);
        })
      }
      this.setState({'reviews': reviews});
    }

    if (e.target.value === '5 star only') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].overallStars === 5) {
          reviews[i].display = true;
        } else {
          reviews[i].display = false;
        }
      }
      this.setState({'reviews': reviews});
    }
     if (e.target.value === '4 star only') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].overallStars === 4) {
          reviews[i].display = true;
        } else {
          reviews[i].display = false;
        }
      }
      this.setState({'reviews': reviews});

    }
     if (e.target.value === '3 star only') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].overallStars === 3) {
          reviews[i].display = true;
        } else {
          reviews[i].display = false;
        }
      }
      this.setState({'reviews': reviews});

    }
     if (e.target.value === '2 star only') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].overallStars === 2) {
          reviews[i].display = true;
        } else {
          reviews[i].display = false;
        }
      }
      this.setState({'reviews': reviews});

    }
     if (e.target.value === '1 star only') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        if (reviews[i].overallStars === 1) {
          reviews[i].display = true;
        } else {
          reviews[i].display = false;
        }
      }
      this.setState({'reviews': reviews});

    }
     if (e.target.value === 'All Stars') {
      let reviews = this.state.reviews.slice(0);
      for (let i = 0; i < reviews.length; i++) {
        reviews[i].display = true;
      }
      this.setState({'reviews': reviews});
    }
  }

  reviewGetter() {
    let pathname = document.location.pathname;
    let bookId = (new URLSearchParams(document.location.search)).get('bookId');
    fetch(`http://${window.location.host}/reviews/${bookId}`)
      .then((response) => response.json())
      .then(data => {
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
        this.setState({ reviews: data });

      })
      .catch((err) => {
        if (err) { this.setState({ reviews: [] }) }
      })

  }


  componentDidMount() {
    this.reviewGetter();
  }
  render() {
    return (
      <div className={"reviewsShell"}>
        <Nav state={this.state} setCanadaClass={this.setCanadaClass} setAudibleClass={this.setAudibleClass}/>
        <div className="filters">
          <SortBy sortReviews={this.sortReviews}/>
          <FilterBy sortReviews={this.sortReviews}/>
        </div>
        <div className="reviewBodyContainer">
          <ReviewBody className="reviewBody" readMoreDisplay={this.state.readMoreDisplay} hideMeDisplay={this.state.hideMeDisplay} readMore={this.setReviewBodyClassToShowReview} hideMe={this.setReviewBodyClassToHidden} reviewBodyClass={this.state.reviewBodyClass} itemsToShow={this.state.itemsToShow} reviews={this.state.reviews} />
        </div>
        <button className="showMore" onClick={(() => this.showMore())}>
          Show More
        </button>
      </div>
    );
  }
}

export default App;
