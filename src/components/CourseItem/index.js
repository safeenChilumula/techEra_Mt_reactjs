import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {item} = props
  const {id, name, logoUrl} = item
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="CourseItemList">
        <img className="CourseLogo" src={logoUrl} alt={name} />
        <p className="CourseName">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
