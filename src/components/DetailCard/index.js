import './index.css'

const DetailCard = props => {
  const {itemCard} = props
  const {name, description, imageUrl} = itemCard
  return (
    <div className="DetailCardContainer">
      <img className="CourseImage" src={imageUrl} alt={name} />
      <div className="CourseDetails">
        <h1 className="CourseName">{name}</h1>
        <p className="CourseDescription">{description}</p>
      </div>
    </div>
  )
}
export default DetailCard
