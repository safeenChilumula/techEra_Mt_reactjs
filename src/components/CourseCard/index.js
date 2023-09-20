import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import DetailCard from '../DetailCard'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseCardDetails: [],
  }

  componentDidMount() {
    this.getCourseCard()
  }

  getCourseCard = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      //   console.log(data.course_details)
      const updateData = {
        id: data.course_details.id,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
        description: data.course_details.description,
      }
      this.setState({
        courseCardDetails: [updateData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderCourseCard = () => {
    const {courseCardDetails} = this.state
    console.log(courseCardDetails)
    return (
      <div className="CourseCardContainer">
        {courseCardDetails.map(each => (
          <DetailCard key={each.id} itemCard={each} />
        ))}
      </div>
    )
  }

  onClickRetry = () => {
    this.getCourseCard()
  }

  renderFailureView = () => (
    <div className="FailureContainer">
      <img
        className="FailureImg"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="FailureHeading">Oops! Something Went Wrong</h1>
      <p className="FailureText">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="FailureButton"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="LoaderContainer" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseCard()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderViews()}
      </>
    )
  }
}
export default CourseCard
